# Memória do projeto — Portfólio UGC Bruna Aquino (2026)

## O que é
Site estático de portfólio da Bruna Aquino (UGC Creator), recriado a partir
do PDF original de 12 páginas. Sem build, sem dependências: abre direto no
navegador ou em qualquer hospedagem estática.

## Como visualizar localmente
```
python3 -m http.server 8000
```
e acesse `http://localhost:8000`.

## Estrutura
```
index.html              → todo o conteúdo/seções
assets/css/style.css    → paleta, tipografia, layout, responsividade
assets/js/main.js       → marquee, reveal, nichos, abas de métricas, copiar e-mail
assets/fonts/           → Fraunces, Manrope e JetBrains Mono (self-hosted, .woff2)
assets/img/             → fotos de cada seção
```

## Direção visual
Versão atual = design editorial (numeração de seções, marquee, dropcaps em
itálico, cards de serviço em grid com filete) + as fotos reais do acervo.

| Papel | Fonte | Token CSS |
|---|---|---|
| Títulos e aberturas de tema | **Hatton** | `--font-display` |
| Iniciais / capitulares | **Symphony** | `--font-initial` |
| Corpo e navegação | **Manrope** | `--font-body` |
| Eyebrows, tags, marquee | **JetBrains Mono** | `--font-mono` |

Hatton e Symphony são comerciais e **ainda não estão no repo**. Os
`@font-face` já existem no topo do `style.css` apontando para
`assets/fonts/Hatton.woff2` e `assets/fonts/Symphony.woff2` (com `.otf`
como alternativa). Enquanto os arquivos não chegarem, o navegador cai no
fallback **Fraunces** sem quebrar nada — basta soltar os arquivos com
esses nomes na pasta que o site passa a usá-los, sem tocar no CSS.

Manrope, JetBrains Mono e o fallback Fraunces são servidos do próprio
domínio (`assets/fonts/`), subsets latin e latin-ext. Sem CDN do Google
Fonts — nada sai para fora no carregamento.

### Paleta
| Token | Cor | Uso |
|---|---|---|
| `--cream` | `#F3EEE3` | fundo claro |
| `--paper` | `#FBF8F1` | cards |
| `--ink` | `#221E1B` | texto e faixa do marquee |
| `--ink-soft` | `#5B534B` | texto secundário |
| `--rust` | `#A63F24` | destaque, seção de nichos |
| `--rust-deep` | `#7E2E19` | seção de contato |
| `--line` | `#DED4C1` | filetes e grid |
| `--dark` | `#1C1815` | seção de métricas |

## Hero
A `capa.jpg` é **imagem de fundo** da seção inteira (não polaroid ao lado).
O recorte usa `object-position` + `transform: scale/translateX` para jogar a
cena para a direita, e `.hero-veil` faz o dissolve esfumaçado que abre a
coluna de texto à esquerda. No mobile o véu vira vertical.

## Origem das imagens (`assets/img/`)
| Arquivo | Uso | Origem |
|---|---|---|
| `capa.jpg` | Fundo do hero | Foto nova enviada no chat |
| `sobre-2.jpg`, `sobre-1.jpg` | Sobre mim (polaroids) | Página 2 do PDF |
| `atuacao.jpg` | Processo criativo | Página 3 do PDF |
| `destaque-*.jpg` | Conteúdos em destaque | Página 5 do PDF |
| `diverso-*.jpg` | Conteúdos diversos | Páginas 6 e 7 do PDF |
| `contato.jpg` | Vamos trabalhar juntos | Página 12 do PDF |

## Interatividade
- Barra de progresso de rolagem, header fixo que ganha filete ao rolar e
  link de navegação ativo conforme a seção.
- Marquee ("carrossel de texto") entre o hero e o "Sobre mim".
- Reveal por seção ao rolar; as etapas do processo acendem ao entrar na tela.
- Nichos clicáveis (liga/desliga) com contador; o "+ seu nicho aqui?" leva
  ao contato.
- Abas de plataforma em Métricas (TikTok / Instagram / YouTube) com
  contadores e barras animados.
- Clique para copiar o e-mail (com fallback para `mailto:`).
- Parallax leve na foto do hero e ponto de cursor — só em desktop com mouse,
  e ambos desligados em `prefers-reduced-motion`.

## Decisões de robustez já aplicadas
- `.reveal` só esconde conteúdo quando o JS está ativo (`html.js`); sem JS a
  página continua legível.
- Todas as imagens com `width`/`height` (evita salto de layout) e `loading="lazy"`
  exceto a do hero, que é `fetchpriority="high"`.
- `scroll-margin-top: 80px` nas seções — âncoras não param embaixo do header.
- Meta OG/Twitter + JSON-LD (`Person`) para link compartilhado e busca.
- Contrastes de texto secundário sobre fundo escuro ajustados para AA.

## Pendências
1. **Fontes Hatton e Symphony** — subir os `.woff2` (ou `.otf`) em
   `assets/fonts/`. Sem eles o site roda no fallback Fraunces.
2. **Links das redes sociais** — Instagram, TikTok e YouTube estão como
   `href="#"`. Procure por `<!-- TODO:` em `index.html`, seção `id="contato"`.
3. **Vídeos** — decidido: arquivos locais no repo. A estrutura já está
   pronta (CSS do `<video>` no mockup, autoplay mudo em loop ao entrar na
   tela, pausa ao sair, botão de som opcional). Falta subir os arquivos em
   `assets/video/` — veja `assets/video/LEIA-ME.md` para os nomes
   esperados, o snippet de markup e o comando de compressão.
4. **Marcas parceiras** — a seção existe com 4 slots "Sua marca aqui";
   falta subir os logos reais.
5. **E-mail** — está `brunaquino.mkt@gmail.com`. Trocar se for outro
   (ou acrescentar WhatsApp).
6. **Métricas** — vale marcar o período de cada número (ex.: "TikTok,
   últimos 28 dias") para dar contexto a quem avalia.
