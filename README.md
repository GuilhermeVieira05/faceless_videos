# Faceless Videos

Vídeos verticais (1080x1920, 30 fps) feitos com Remotion a partir de roteiros em JSON. Um projeto, vários nichos: hoje **programacao** e **ingles**.

## Começando

```bash
npm install
npm run studio          # abre o Remotion Studio no navegador (escolha "programacao" ou "ingles")
npm run render -- content/programacao/001-typescript-any.json
```

O vídeo sai em `out/<nicho>/<id>.mp4`. Outros comandos:

```bash
npm run render -- --all                          # todos os roteiros de content/
npm run render -- <roteiro> --preview            # um PNG por cena (conferir o visual rápido)
npm run render -- <roteiro> --still=120          # PNG de um frame
npm run typecheck
```

Se o Remotion não achar um navegador, aponte o Chrome: `REMOTION_BROWSER="/caminho/do/chrome" npm run render -- ...`

## Fluxo de produção (por vídeo)

1. Gere o roteiro com IA usando o prompt de `prompts/<nicho>.md` e salve em `content/<nicho>/NNN-nome.json`.
2. **Revise** (código roda? inglês está certo? troque um exemplo por algo seu). Essa etapa é o que deixa o canal com cara de autor e não de conteúdo em massa.
3. Narração (opcional): `pip install edge-tts` e `python3 scripts/tts.py <roteiro>`. Sem áudio, o vídeo usa duração estimada e legendas; com áudio, cada cena ajusta a duração ao mp3.
4. `npm run render -- <roteiro>` e poste. Dá para agendar no TikTok e no YouTube Shorts.

Roteiros de uma mesma semana podem ser feitos em lote numa noite só.

## Estrutura

```
content/<nicho>/*.json     roteiros (um vídeo por arquivo)
prompts/                   prompts para gerar roteiros com IA
public/fonts, public/audio fontes empacotadas e narração gerada
scripts/render.ts          CLI de render
scripts/tts.py             narração por cena
src/core/                  núcleo compartilhado: fundo, legendas, tempo, cenas hook/bullets/outro
src/niches/<nicho>/        tema + cenas específicas de cada nicho
src/niches/meta.ts         tipos de cena e campos obrigatórios (usado na validação)
```

## Formato do roteiro

```json
{
  "id": "ts-any-001",
  "niche": "programacao",
  "title": "título interno",
  "handle": "@seu_canal",
  "scenes": [
    {"type": "hook", "title": "Texto com *destaque*", "narration": "o que será falado"}
  ]
}
```

Campos comuns a toda cena: `type`, `narration` (vira áudio e legenda), `duration` (segundos), `captions` (liga/desliga a legenda), `voice`.

| Nicho | Cenas |
| --- | --- |
| ambos | `hook` (tag, title, subtitle), `bullets` (title, points), `outro` (title, subtitle) |
| programacao | `code` (code, filename, label, tone, highlight, title) |
| ingles | `phrase` (pt, en, pronunciation, note), `wrongRight` (wrong, right, note), `example` (en, pt, label) |

Erros de roteiro (tipo de cena inexistente, campo faltando) aparecem em português antes de o render começar.

## Criar um novo nicho

1. Copie `src/niches/ingles` para `src/niches/<novo>` e ajuste `theme.ts` (cores, alinhamento, `@handle`).
2. Reaproveite as cenas do núcleo (`hook`, `bullets`, `outro`) e crie só as que forem específicas.
3. Registre os tipos de cena e campos obrigatórios em `src/niches/meta.ts`.
4. Adicione o nicho na lista de `src/Root.tsx` e crie `content/<novo>/` com um roteiro de exemplo.

## Notas

- O `@handle` que aparece no encerramento fica em `theme.ts` de cada nicho (ou no campo `handle` do roteiro).
- As zonas seguras (`src/core/layout.ts`) evitam que a interface do TikTok/Shorts cubra texto.
- Licença do Remotion: grátis para indivíduos e equipes de até 3 pessoas, inclusive uso comercial. Confira os termos em remotion.dev.
- `edge-tts` é uma biblioteca não oficial; para o longo prazo considere uma voz licenciada ou a sua própria.
