# Histórico

Registro do que foi feito e do que funcionou. O objetivo é comparar os nichos com dados e decidir onde focar.

## `videos.csv`

Uma linha por vídeo (abre direto no Excel/Google Sheets). Atualize depois de postar:

| Coluna | O que colocar |
| --- | --- |
| `id` | o mesmo `id` do roteiro em `content/` |
| `status` | roteiro pronto → revisado → renderizado → postado |
| `postado_em`, `plataformas`, `link` | data, onde foi (TikTok, Shorts) e a URL do post |
| `views_7d` | visualizações 7 dias depois de postar (compare sempre no mesmo prazo) |
| `retencao` | % médio assistido, que o TikTok e o YouTube mostram no painel |
| `seguidores_ganhos` | seguidores novos atribuídos ao vídeo |
| `notas` | o que você mudou, o que achou, hipóteses |

Para decidir o nicho, olhe a tendência de views e retenção ao longo de 15 a 20 vídeos por conta, e não um vídeo isolado.

## `agenda.csv`

Calendário de postagens: uma linha por post (`data` AAAA-MM-DD, `hora` HH:MM de Brasília, `plataforma` tiktok/youtube, `id` do roteiro, `status` como em `videos.csv`). Um cron do repositório second-brain lê este arquivo todo dia de manhã e manda no Telegram os posts do dia, avisando quais vídeos ainda não estão renderizados. O repositório é público: não coloque nada sensível aqui.

## O que fica fora do Git

Os arquivos `.mp4` (a pasta `out/` está no `.gitignore`). Guarde-os no Drive ou deixe só nas plataformas e registre o link na tabela.

## Prompts

Ficam em `prompts/`. Quando mudar um prompt, o histórico do Git guarda a versão anterior. Se um prompt novo render melhor, anote em `notas`.
