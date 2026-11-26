---
name: roteiro
description: Escreve ou revisa um roteiro JSON de vídeo curto em content/<nicho>/ seguindo o formato do projeto e os padrões da última pesquisa de nicho. Use quando pedirem um roteiro novo, um vídeo sobre um tema, uma série, ou para melhorar o gancho/ritmo de um roteiro existente.
---

# roteiro

Fontes, nesta ordem:
1. `README.md` (formato do roteiro e tipos de cena) e `src/niches/meta.ts` (campos obrigatórios).
2. `prompts/<nicho>.md` (regras do nicho: tamanho, código, revisão humana).
3. A pesquisa mais recente em `pesquisa/` (o que está funcionando).
4. `historico/videos.csv` (o que já foi feito e como performou; não repita tema).

## Regras que vêm da pesquisa

- **Gancho = fato concreto**, não pergunta genérica: consequência real ("o cliente foi cobrado duas vezes"), número, empresa ou incidente conhecido. A primeira frase já entrega o assunto. Texto do `hook` curto, com `*destaque*`.
- **Ancore o conceito num caso real**: empresa, incidente público ou algo que o autor viveu. Se não houver caso real, deixe isso explícito no campo `revisar` para o autor trocar.
- **Ritmo**: cenas de 3 a 6 segundos de fala. Divida código longo em duas cenas `code`.
- **Duração**: conceito, 35 a 55 s; achado rápido (repo, comando, ferramenta), 20 a 30 s.
- **Fechamento curto** no `outro`. Sem despedida e sem "fala galera".
- Se o tema fizer parte de uma série, use o nome e o número da série no `hook.tag`.

## Saída

- Arquivo novo: `content/<nicho>/NNN-slug.json`, com `NNN` seguindo o maior número existente no nicho, e `id` no padrão `slug-NNN`.
- Preencha `revisar` com o que o autor precisa conferir (código roda? exemplo pessoal?).
- Adicione uma linha em `historico/videos.csv` com `status` = `roteiro pronto`.
- Código tem que estar correto. Se houver ressalva técnica importante, ela vai na narração.
- Não renderize nem altere roteiros existentes sem pedido. Para gerar o vídeo: `npm run make -- <roteiro>`.
