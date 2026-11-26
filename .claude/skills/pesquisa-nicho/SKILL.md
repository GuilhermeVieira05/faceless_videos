---
name: pesquisa-nicho
description: Pesquisa vídeos curtos de referência no TikTok e no YouTube Shorts para um nicho do canal, ranqueia pelo múltiplo sobre a mediana do próprio canal, assiste aos melhores com /watch e grava um relatório em pesquisa/. Use quando pedirem para pesquisar o nicho, ver o que está funcionando, achar referências, analisar concorrentes ou atualizar a pesquisa.
---

# pesquisa-nicho

Objetivo: descobrir **o que faz vídeos curtos do nicho performarem**, com evidência, e traduzir em mudanças no nosso formato (`content/<nicho>/*.json`).

Leia antes a última pesquisa em `pesquisa/` para não repetir trabalho e para comparar.

## 1. Escolher canais

Comece pelos canais da última pesquisa e acrescente novos. Misture:
- mesmo nicho e idioma (PT e EN);
- sem rosto (mais próximos do nosso formato);
- 1 ou 2 grandes, só para formato.

## 2. Ranquear (sem baixar nada)

```bash
python3 .claude/skills/pesquisa-nicho/ranquear.py yt ByteByteGo Fireship FilipeDeschamps > /tmp/yt.tsv
python3 .claude/skills/pesquisa-nicho/ranquear.py tiktok bytebytego thecodingsloth filipedeschamps > /tmp/tt.tsv
```

Ranqueie pelo **múltiplo sobre a mediana do canal**, nunca por views brutas: um canal grande com muitas views teve um dia normal; um canal pequeno com 20x achou algo. Escolha ~20 por plataforma, metade PT e metade EN, priorizando múltiplo alto e formatos que dá para fazer sem rosto.

## 3. Assistir

Use a skill `/watch`. O motor configurado é o Gemini (chave grátis do AI Studio). **Nunca gaste dinheiro**: se o Gemini falhar (503, cota), use o modo local, que é gratuito:

```bash
python3 <dir-da-skill-watch>/scripts/watch.py "<url>" --engine local --detail efficient \
  --max-frames 5 --resolution 384 --start 0 --end 60 --out-dir <pasta-temporária>
```

- YouTube: a legenda automática basta (`--no-whisper`).
- TikTok: quase nunca tem legenda; use `--whisper whisperx` com `WATCH_WHISPERX_LANGUAGE=pt` ou `en`.
- **Apague o vídeo baixado logo depois** (`find <pasta> -name '*.mp4' -delete`). Guarde só quadros e transcrição, fora do repositório.
- Para economizar contexto, junte os 5 quadros de cada vídeo numa folha só e leia a folha:
  `ffmpeg -pattern_type glob -i "<frames>/*.jpg" -vf "scale=240:-2,tile=5x1:padding=4" -frames:v 1 folha.jpg`

Para cada vídeo anote: gancho (fala e texto na tela nos 3 primeiros segundos), estrutura de cenas, estilo visual (rosto ou não, legenda, ritmo de corte), duração, fechamento.

## 4. Relatório

Grave `pesquisa/AAAA-MM-DD-<tema>.md` no mesmo formato da última pesquisa:
1. tabelas por plataforma (múltiplo, views, canal, duração, gancho);
2. padrões que se repetem nos vencedores;
3. o que muda no nosso formato (gancho, caso real, série, duração, ritmo);
4. o que mudou em relação à pesquisa anterior.

Transcrições automáticas têm erros: cite o sentido, não invente citações. Diga quais vídeos ficaram com evidência parcial.

Não altere roteiros em `content/` nesta skill; as recomendações viram roteiros pela skill `roteiro`.
