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
import sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    sys.exit("Instale a dependência primeiro:  pip install edge-tts")

DEFAULT_VOICE = "pt-BR-AntonioNeural"


async def synth(text: str, voice: str, rate: str, out: Path) -> None:
    tmp = out.with_suffix(".tmp.mp3")
    await edge_tts.Communicate(text, voice, rate=rate).save(str(tmp))
    tmp.rename(out)  # só aparece com o nome final quando terminou de gravar


async def main() -> None:
    parser = argparse.ArgumentParser(description="Gera narração por cena com edge-tts")
    parser.add_argument("script", help="caminho do roteiro .json")
    parser.add_argument("--voice", default=DEFAULT_VOICE)
    parser.add_argument("--rate", default="+0%", help='velocidade, ex.: "+10%%"')
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
        if out.exists() and not args.force:
            print(f"cena {i + 1}: já existe, pulando (use --force para regerar)")
            continue
        voice = scene.get("voice") or script.get("voice") or args.voice
        print(f"cena {i + 1}: {voice}")
        await synth(text, voice, args.rate, out)

    print(f"Pronto: {out_dir}")


if __name__ == "__main__":
    asyncio.run(main())
