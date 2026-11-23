# Prompt: roteiro de dica de inglês

Cole isto numa IA, troque o TEMA e **revise o resultado** (veja o fim do arquivo).

---

Crie um roteiro em JSON para um vídeo vertical de 25 a 35 segundos de **dica de inglês para brasileiros**, explicado em português do Brasil.

TEMA: [ex.: erro comum com "make" e "do", ou inglês de reunião de trabalho]

Formato (responda só com o JSON):

```json
{
  "id": "slug-curto-001",
  "niche": "ingles",
  "title": "título interno",
  "scenes": [
    {"type": "hook", "tag": "Inglês do dia", "title": "Pergunta ou erro com *destaque*", "subtitle": "opcional", "narration": "texto falado"},
    {"type": "wrongRight", "wrong": "frase errada", "right": "frase certa", "note": "explicação curta com *destaque*", "narration": "texto falado"},
    {"type": "phrase", "pt": "frase em português", "en": "frase em inglês", "pronunciation": "pronúncia aproximada em português", "narration": "texto falado"},
    {"type": "example", "label": "Exemplo", "en": "Frase com *palavra* destacada.", "pt": "tradução", "narration": "texto falado"},
    {"type": "outro", "title": "Segue pra mais *inglês* todo dia", "narration": "Segue pra aprender mais inglês todo dia."}
  ]
}
```

Regras:
- Foque em erros reais e frequentes de brasileiros (tradução literal, falsos cognatos, preposições) ou em frases úteis do dia a dia/trabalho.
- Inglês natural e usado de verdade. Se houver variação (britânico/americano) ou registro (formal/informal), diga na `note`.
- `wrong`/`right`/`en` com até ~35 caracteres. `note` com uma frase só.
- Narração curta, 60 a 90 palavras no total.
- `*texto*` destaca em cor.

---

## Antes de renderizar (revisão humana, obrigatória)

1. **Confira cada frase em inglês** num dicionário (Cambridge, Oxford, Linguee) ou com alguém fluente. IA erra nuance e inventa "erros comuns" que não são erros.
2. A `pronunciation` é aproximada: ajuste do seu jeito ou remova o campo.
3. Frases em inglês dentro de narração em português saem com sotaque ruim na voz brasileira. Se incomodar, ponha `"voice": "en-US-AriaNeural"` na cena `phrase` (ou grave você mesmo).
