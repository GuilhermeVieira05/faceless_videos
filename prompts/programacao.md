# Prompt: roteiro de dica de programação

Cole isto numa IA, troque o TEMA e, se quiser, o exemplo pessoal. Depois **revise o resultado** (veja o fim do arquivo).

---

Crie um roteiro em JSON para um vídeo vertical de 30 a 40 segundos de **dica de programação em português do Brasil**.

TEMA: [ex.: diferença entre `==` e `===`]
EXEMPLO REAL (opcional, algo que eu vivi): [ex.: um bug que apareceu por causa disso no trabalho]

Formato (responda só com o JSON):

```json
{
  "id": "slug-curto-001",
  "niche": "programacao",
  "title": "título interno",
  "scenes": [
    {"type": "hook", "tag": "TypeScript", "title": "Frase de abertura com *destaque*", "subtitle": "opcional", "narration": "texto falado"},
    {"type": "code", "label": "Errado", "tone": "bad", "filename": "arquivo.ts", "code": "linhas\\nde código", "highlight": [1], "narration": "texto falado"},
    {"type": "code", "label": "Certo", "tone": "good", "filename": "arquivo.ts", "code": "...", "highlight": [2], "narration": "texto falado"},
    {"type": "bullets", "title": "Título", "points": ["ponto 1", "ponto 2", "ponto 3"], "narration": "texto falado"},
    {"type": "outro", "title": "Segue pra mais dicas de *X*", "narration": "Segue pra mais dicas de X."}
  ]
}
```

Regras:
- 4 a 6 cenas. O `hook` tem que prender nos primeiros 2 segundos (pergunta, erro comum ou promessa concreta).
- Narração falada e natural, frases curtas. Total de 80 a 110 palavras.
- Código: no máximo 7 linhas por cena e até ~34 caracteres por linha. `highlight` usa números de linha começando em 1.
- `*texto*` destaca em cor. Use `\n` para quebra de linha dentro de `code`.
- Só conteúdo tecnicamente correto. Se houver ressalva importante (ex.: "só vale se as chamadas forem independentes"), inclua na narração.
- Sem enrolação e sem "fala galera".

---

## Antes de renderizar (revisão humana, 5 a 10 minutos)

1. Rode o código e confirme que o exemplo faz o que o roteiro diz.
2. Troque pelo menos um exemplo ou uma frase por algo seu (experiência real, projeto, erro que você já cometeu).
3. Leia a narração em voz alta: se soar robótica, reescreva.
