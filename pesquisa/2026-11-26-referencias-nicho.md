# Pesquisa de referências: programação (PT + EN), 2026-11-26

40 vídeos curtos (20 YouTube Shorts, 20 TikTok), escolhidos pelo **múltiplo sobre a mediana do próprio canal** (views do vídeo / mediana dos ~40 últimos curtos da conta). Isso separa "o vídeo que funcionou" de "o canal que é grande".

Como foi feito: `yt-dlp` (metadados, sem login), skill `/watch` em modo local (5 quadros por vídeo + legenda do YouTube ou WhisperX local no TikTok, primeiros 60 s). Vídeos apagados depois da extração. Limitações: transcrições automáticas têm erros; no TikTok só o primeiro minuto foi analisado; três vídeos do Coding with Lewis/NeetCode vieram com legenda automática dublada, então usei título + quadros.

## Os vídeos

### YouTube Shorts

| Múltiplo | Views | Canal | Duração | Gancho (início da fala) |
| --- | --- | --- | --- | --- |
| 73x | 3,0M | Coding with Lewis (EN) | 74s | "This is the AI model iceberg" |
| 49x | 377K | Código Fonte TV (PT) | 104s | "As notas vermelhas estão explodindo em uma das melhores universidades de tecnologia do mundo" |
| 44x | 1,8M | Coding with Lewis (EN) | 100s | "There's a name for people who paste AI responses at you" |
| 37x | 286K | Código Fonte TV (PT) | 142s | "Ok, vamos falar disso. Ao que tudo indica, os devs poderão ser MEI" |
| 33x | 1,1M | Filipe Deschamps (PT) | 53s | "Como você programaria isso? Eu tô programando um site..." |
| 19x | 2,1M | Low Level (EN) | 56s | "The reason I like C so much for learning..." |
| 10x | 335K | Filipe Deschamps (PT) | 51s | "Como você programaria isso? #2" |
| 6,4x | 8,7M | Fireship (EN) | 54s | "I always thought computers were better at math... until I tried to add 0.1 to 0.2" |
| 6,3x | 2,4M | ByteByteGo (EN) | 59s | "Ever wonder how Discord manages to store a trillion messages?" |
| 5,5x | 225K | Coding with Lewis (EN) | 82s | "11 lines of code once broke the entire internet" |
| 5,2x | 2,0M | ByteByteGo (EN) | 58s | "Let's dive into how companies ship code to production" |
| 4,9x | 161K | Filipe Deschamps (PT) | 180s | "Um cara chamado Trey Harris..." (e-mail que não passava de 800 km) |
| 4,7x | 100K | NeetCode (EN) | 43s | "At Google I was a copy-paste programmer" |
| 4,5x | 1,7M | ByteByteGo (EN) | 52s | "Netflix tech stack built on AWS is a masterpiece" |
| 3,9x | 5,2M | Fireship (EN) | 53s | "1990: HTML is invented. 94: CSS invented to fix HTML..." |
| 3,7x | 114K | Lucas Montano (PT) | 60s | "Algoritmo em 1 minuto: binary search" |
| 3,4x | 1,3M | ByteByteGo (EN) | 47s | "Three reasons why Redis is lightning fast. The last one is a bit unintuitive" |
| 3,4x | 1,3M | ByteByteGo (EN) | 58s | "Let's dive into optimizing API performance" |
| 6,5x | 198K | Lucas Montano (PT) | 47s | História: contratou estagiário que fez "hello world" em Java |
| 26x | 17K | Dev em Dobro (PT) | 7s | Só texto na tela + legenda pra ler na descrição |

### TikTok

| Múltiplo | Views | Conta | Duração | Gancho |
| --- | --- | --- | --- | --- |
| 148x | 266K | filipedeschamps (PT) | 154s | "Para tudo o que você está fazendo agora e atualiza manualmente o seu WhatsApp" |
| 132x | 6,2M | bytebytego (EN) | 59s | "Ever wonder how Discord manages to store a trillion messages?" |
| 70x | 127K | filipedeschamps (PT) | 176s | "Não rode o npm install de maneira alguma nos próximos dias" |
| 67x | 121K | filipedeschamps (PT) | 179s | História do e-mail que não passava de 800 km |
| 58x | 105K | filipedeschamps (PT) | 176s | "O Mark Zuckerberg acabou de congelar as contratações..." |
| 42x | 15K | kantancoding (EN) | 58s | "Go follows a model of concurrency called fork-join" (sem rosto: código + diagrama) |
| 34x | 59K | cursoemvideo (PT) | 114s | "Como seria se eu estivesse começando a programar hoje?" |
| 28x | 907K | thecodingsloth (EN) | 21s | "I am creaming everywhere because of this repo" (sem rosto: tela + mascote) |
| 23x | 746K | thecodingsloth (EN) | 30s | "Did you know there's a website that lets you take MIT classes for free?" |
| 20x | 36K | codigofontetv (PT) | 104s | Mesmo vídeo das notas vermelhas em Berkeley |
| 19x | 12K | devemdobro (PT) | 12s | Texto "Como se VICIAR em aprender programação" + "leia a legenda" |
| 15x | 251K | theprimeagen (EN) | 64s | "I am done with this. Nobody is reading anything" |
| 14x | 453K | thecodingsloth (EN) | 21s | "Let me bless your eyeballs with this GitHub repo" (public-apis) |
| 12x | 22K | codigofontetv (PT) | 47s | Pacote inventado por IA com 30 milhões de downloads |
| 11x | 20K | codigofontetv (PT) | 112s | "Você sabia que a linguagem número um no mundo não reflete o Brasil?" |
| 10x | 18K | codigofontetv (PT) | 120s | Notícia de IA e segurança |
| 9,6x | 88K | tiffintech (EN) | 67s | "Why does your voice sound normal in your head but awful recorded?" |
| 7,1x | 122K | theprimeagen (EN) | 27s | "Remember when everyone laughed at vibe coders?" |
| 5,7x | 6K | rocketseat (PT) | 37s | "Seu .git está exposto?" (comando que retorna 200 = problema) |
| 27x | 248K | tiffintech (EN) | 95s | Comparação de relatórios de tecnologia (publi) |

## O que se repete nos vencedores

1. **Gancho = fato concreto e surpreendente, não pergunta genérica.** Número + consequência ("1 trilhão de mensagens", "11 linhas quebraram a internet", "0.1 + 0.2 não dá 0.3"), empresa conhecida (Discord, Netflix, NPM, WhatsApp) ou ordem urgente ("Para tudo", "Não rode npm install"). A primeira frase já entrega o assunto.
2. **Caso real > conceito abstrato.** Os vídeos de conceito que mais rendem embrulham o conceito numa história ou numa empresa (Discord → banco de dados; left-pad → dependências; Trey Harris → latência). Conceito puro ("fork-join em Go") funciona em conta pequena, mas não estoura.
3. **Série com nome.** "Como você programaria isso? #1, #2, #3" (Filipe) e "Algoritmo em 1 minuto" (Lucas) criam expectativa e são fáceis de repetir.
4. **Sem rosto funciona** quando o visual muda o tempo todo: diagrama que se monta (ByteByteGo, kantancoding), papel e caneta + código (Filipe #1/#2), memes rápidos (Fireship), gravação de tela + mascote (thecodingsloth). O que não funciona é tela parada.
5. **Legenda palavra a palavra, grande, com destaque de cor**, praticamente em todos. Texto de gancho grande no primeiro quadro.
6. **Duração.** Conceito/explicação: 45 a 60 s. Achado rápido (repo, site, dica): 20 a 30 s. Notícia/história em PT no TikTok aguenta 2 a 3 min, mas é formato de criador com rosto e autoridade.
7. **Fechamento curto:** "segue pra mais", "compartilha com quem...", ou nada. Ninguém se despede.
8. **Notícias e segurança explodem em PT**, mas dependem de velocidade (postar no dia) e de checagem. Pode ser uma linha separada do canal, não a base.

## O que isso muda no nosso formato

- Nosso visual (cena de código com destaque, bullets, legenda) já está no estilo dos faceless que funcionam. O ponto fraco é o **gancho**: trocar "Já vi job travado acontecer direto..." por consequência concreta, por exemplo "O cliente foi cobrado duas vezes. E o culpado foi a fila."
- **Ancorar cada tema num caso real** (empresa, incidente público, bug que você viveu).
- **Criar uma série** (ex.: "Bug de produção #1", "Isso cai em entrevista #1").
- **Mais mudança visual**: cenas de 3 a 6 s; quebrar cenas longas de código em 2.
- Alvo de 35 a 55 s para conceito; testar alguns vídeos de 20 a 30 s com "achado" (repo, ferramenta, comando).

## Horários (ponto de partida)

Não há estudo sério só do Brasil. Estudos globais (Buffer 7M posts TikTok, Buffer 1,8M YouTube, Metricool, SocialPilot) dizem que constância pesa mais que horário e que os dados da própria conta mandam. Ponto de partida, horário de Brasília:

- **Seg a sex:** 07:30, 12:30, 19:30
- **Sáb e dom:** 11:00, 15:00, 20:00

Para a conta em inglês, o público dos EUA está 2 a 5 h atrás: as mesmas faixas locais caem às 09:30, 14:30 e 21:30 de Brasília. Reavaliar depois de 2 semanas com os painéis do TikTok Studio e YouTube Studio.

Fontes: buffer.com/library/best-time-to-post-on-tiktok, buffer.com/resources/best-time-to-post-on-youtube, metricool.com/best-time-post-tiktok, socialpilot.co/insights/best-time-to-post-on-youtube.
