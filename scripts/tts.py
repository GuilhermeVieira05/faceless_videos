#!/usr/bin/env python3
"""
Gera a narração (um mp3 por cena) de um roteiro JSON usando o edge-tts.

  pip install edge-tts
  python3 scripts/tts.py content/programacao/001-typescript-any.json
  python3 scripts/tts.py content/ingles/001-i-agree.json --voice pt-BR-FranciscaNeural --force

Os arquivos vão para public/audio/<id-do-roteiro>/scene-<n>.mp3. O Remotion detecta
esses arquivos sozinho e ajusta a duração de cada cena ao áudio.

Voz: "voice" na cena > "voice" no roteiro > --voice > pt-BR-AntonioNeural.
Para frases em inglês, ponha "voice": "en-US-AriaNeural" na cena.

Obs.: o edge-tts usa as vozes do Edge por uma biblioteca não oficial. Serve bem para testar;
se o canal crescer, vale trocar por uma voz paga/licenciada ou pela sua própria voz.
"""
import argparse
import asyncio
import json
import re
import sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    sys.exit("Instale a dependência primeiro:  pip install edge-tts")

HERE = Path(__file__).resolve().parent


def load_json(name: str) -> dict:
    f = HERE / name
    return json.loads(f.read_text(encoding="utf-8")) if f.exists() else {}


CONFIG = load_json("voz.json")
DEFAULT_VOICE = CONFIG.get("voice", "pt-BR-AntonioNeural")
DEFAULT_RATE = CONFIG.get("rate", "+0%")
PRONUNCIA = {k: v for k, v in load_json("pronuncia.json").items() if not k.startswith("_")}


def aplicar_pronuncia(text: str) -> str:
    """Troca palavras só no texto falado, usando scripts/pronuncia.json."""
    for palavra, fala in PRONUNCIA.items():
        text = re.sub(rf"(?<![\w-]){re.escape(palavra)}(?![\w-])", fala, text, flags=re.IGNORECASE)
    return text


async def synth(text: str, voice: str, rate: str, out: Path) -> None:
    tmp = out.with_suffix(".tmp.mp3")
    await edge_tts.Communicate(text, voice, rate=rate).save(str(tmp))
    tmp.rename(out)  # só aparece com o nome final quando terminou de gravar


async def main() -> None:
    parser = argparse.ArgumentParser(description="Gera narração por cena com edge-tts")
    parser.add_argument("script", help="caminho do roteiro .json")
    parser.add_argument("--voice", default=DEFAULT_VOICE)
    parser.add_argument("--rate", default=DEFAULT_RATE, help='velocidade, ex.: "+10%%"')
    parser.add_argument("--force", action="store_true", help="regera mesmo se o mp3 já existir")
    args = parser.parse_args()

    script = json.loads(Path(args.script).read_text(encoding="utf-8"))
    out_dir = Path(__file__).resolve().parent.parent / "public" / "audio" / script["id"]
    out_dir.mkdir(parents=True, exist_ok=True)

    for i, scene in enumerate(script["scenes"]):
        text = scene.get("narration")
        if not text:
            continue
        out = out_dir / f"scene-{i}.mp3"
        voice = scene.get("voice") or script.get("voice") or args.voice
        spoken = aplicar_pronuncia(text)
        stamp = out.with_suffix(".txt")
        signature = f"{voice}|{args.rate}|{spoken}"
        unchanged = stamp.exists() and stamp.read_text(encoding="utf-8") == signature
        if out.exists() and unchanged and not args.force:
            print(f"cena {i + 1}: sem mudanças, pulando (use --force para regerar)")
            continue
        print(f"cena {i + 1}: {voice}")
        await synth(spoken, voice, args.rate, out)
        stamp.write_text(signature, encoding="utf-8")

    print(f"Pronto: {out_dir}")


if __name__ == "__main__":
    asyncio.run(main())
