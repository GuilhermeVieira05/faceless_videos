---
name: analise-posts
description: Analisa o desempenho dos nossos vídeos já postados (TikTok Studio, YouTube Studio), atualiza historico/videos.csv e compara com a pesquisa de nicho para decidir o que repetir e o que parar. Use quando colarem métricas, pedirem para analisar nossos vídeos, entender o público ou ajustar horários.
---

# analise-posts

## Entrada

Métricas que o autor cola ou exporta do TikTok Studio e do YouTube Studio: views, tempo médio assistido, % que assistiu até o fim, seguidores ganhos, origem do tráfego, horário de postagem, perfil do público (idade, país, horário ativo). Não invente número que não foi fornecido.

## Passos

1. Atualize `historico/videos.csv` (colunas descritas em `historico/README.md`). Compare views sempre no mesmo prazo (`views_7d`).
2. Ranqueie nossos vídeos pelo múltiplo sobre a **mediana da nossa própria conta**, separado por plataforma e por idioma.
3. Para os 3 melhores e os 3 piores, compare gancho, duração, tema e horário. Se precisar ver o vídeo, use `/watch` em modo local com o arquivo de `out/` (gratuito).
4. Retenção: onde as pessoas saem? Saída nos 3 primeiros segundos = gancho; saída no meio = ritmo ou cena longa.
5. Horários: com 2 semanas de dados, compare desempenho por faixa e pelo "horário ativo" do público no painel; proponha ajuste nos horários da última pesquisa.

## Saída

- Resumo curto: o que repetir, o que parar, o que testar na próxima semana (no máximo 3 testes, um de cada vez).
- Se surgir um padrão novo e consistente (3 ou mais vídeos), anote em `notas` no CSV e proponha mudança nas regras da skill `roteiro`.

Poucos vídeos (menos de 10 por conta) = tendência fraca. Diga isso em vez de tirar conclusão forte.
