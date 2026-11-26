#!/usr/bin/env python3
"""
Ranqueia vídeos curtos pelo múltiplo sobre a mediana do próprio canal.

  python3 .claude/skills/pesquisa-nicho/ranquear.py yt ByteByteGo Fireship lucasmontano
  python3 .claude/skills/pesquisa-nicho/ranquear.py tiktok bytebytego filipedeschamps --top 30

Usa yt-dlp só para metadados (sem baixar vídeo, sem login).
YouTube: lê a aba /shorts do canal (@handle). TikTok: lê o perfil (@handle);
alguns perfis bloqueiam e são pulados com aviso.
"""
import argparse
import statistics
import subprocess
import sys

URL = {
    "yt": "https://www.youtube.com/@{h}/shorts",
    "tiktok": "https://www.tiktok.com/@{h}",
}
VIDEO = {
    "yt": "https://www.youtube.com/shorts/{id}",
    "tiktok": "https://www.tiktok.com/@{h}/video/{id}",
}


def listar(plataforma: str, handle: str, n: int) -> list[tuple[str, int, str, str]]:
    cmd = [
        "yt-dlp", "--flat-playlist", "--skip-download", "--socket-timeout", "20",
        "--playlist-end", str(n),
        "--print", "%(id)s\t%(view_count)s\t%(duration)s\t%(title).80s",
        URL[plataforma].format(h=handle),
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    out = []
    for linha in r.stdout.splitlines():
        partes = linha.split("\t")
        if len(partes) == 4 and partes[1].isdigit():
            out.append((partes[0], int(partes[1]), partes[2], partes[3]))
    if not out:
        print(f"aviso: {handle}: nenhum vídeo lido ({r.stderr.strip().splitlines()[-1:] or 'sem erro'})", file=sys.stderr)
    return out


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("plataforma", choices=URL)
    p.add_argument("handles", nargs="+")
    p.add_argument("--n", type=int, default=40, help="vídeos recentes por canal (base da mediana)")
    p.add_argument("--top", type=int, default=20)
    a = p.parse_args()

    linhas = []
    for h in a.handles:
        vids = listar(a.plataforma, h, a.n)
        if not vids:
            continue
        med = statistics.median(v for _, v, _, _ in vids)
        print(f"{h}: {len(vids)} vídeos, mediana {int(med):,}", file=sys.stderr)
        for vid, views, dur, titulo in vids:
            linhas.append((views / max(med, 1), views, dur, h, VIDEO[a.plataforma].format(h=h, id=vid), titulo))

    linhas.sort(reverse=True)
    print("multiplo\tviews\tduracao_s\tcanal\turl\ttitulo")
    for m, v, d, h, url, t in linhas[: a.top]:
        print(f"{m:.1f}x\t{v}\t{d}\t{h}\t{url}\t{t}")


if __name__ == "__main__":
    main()
