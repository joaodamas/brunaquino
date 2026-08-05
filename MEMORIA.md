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
assets/fonts/           → Italiana, Pinyon Script, DM Sans, JetBrains Mono (.woff2)
assets/img/             → fotos de cada seção
```

## Direção visual
Versão atual = design editorial (numeração de seções, marquee, dropcaps em
itálico, cards de serviço em grid com filete) + as fotos reais do acervo.

| Papel | Fonte | Token CSS |
|---|---|---|
| Títulos e aberturas de tema | **Italiana** | `--font-display` |
| Iniciais / capitulares | **Pinyon Script** | `--font-initial` |
| Corpo e navegação | **DM Sans** | `--font-body` |
| Eyebrows, tags, marquee | **JetBrains Mono** | `--font-mono` |

Todas do Google Fonts, gratuitas para uso comercial e servidas do próprio
domínio (`assets/fonts/`), subsets latin e latin-ext. Sem CDN — nada sai
para fora no carregamento.

Duas armadilhas destas fontes, já tratadas no CSS:

- **Italiana tem um único peso (400) e não tem itálico.** Todo lugar que
  usava `font-weight:500/600` ou `font-style:italic` no `--font-display`
  foi ajustado para 400/normal. Se voltar a pedir peso ou itálico, o
  navegador sintetiza e o resultado fica borrado numa serifada fina como
  essa — os tamanhos foram compensados para manter a hierarquia.
- **Italiana só tem o subset latin.** Confirmado que cobre todos os
  acentos do português (à á â ã ç é ê í ó ô õ ú), então nenhum caractere
  cai para fonte de fallback no meio da palavra.

As iniciais ficam na **mesma cor do restante do título** (`color:inherit`),
não no terracota — decisão de 4/8/2026.

Hatton e Symphony (as fontes comerciais da marca) foram descartadas: são
pagas, a Symphony tinha quatro homônimas de fundições diferentes e não
conseguimos identificar qual era a certa.

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

## Seções com foto de fundo
Duas seções usam foto de fundo em vez de imagem ao lado. Nas duas o padrão
é o mesmo: `<img>` absoluta com `object-fit:cover` no enquadramento
original (sem zoom), um `.*-veil` de gradiente por cima abrindo a coluna de
texto, e o texto num terceiro nível de `z-index`.

| Seção | Foto | Texto fica | Véu |
|---|---|---|---|
| Hero | `capa.jpg` | à esquerda | dissolve da esquerda para a direita |
| Sobre mim | `sobre-fundo.jpg` | à direita | dissolve da direita para a esquerda |

No mobile os dois véus viram verticais (escurecem topo e base) para o texto
continuar legível sobre a foto.

## Origem das imagens (`assets/img/`)
| Arquivo | Uso | Origem |
|---|---|---|
| `capa.jpg` | Fundo do hero | Foto nova enviada no chat |
| `sobre-fundo.jpg` | Fundo do "Sobre mim" | Foto enviada no chat |
| `sobre-1.jpg`, `sobre-2.jpg` | **não usadas hoje** | Página 2 do PDF |
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

## Gerar o PDF
```
./tools/gerar-pdf.sh
```
Gera `portfolio-bruna-aquino.pdf` (fora do git, regenerável). O script não
imprime o `index.html` direto de propósito: o site depende de JS para
revelar as seções, animar os contadores e preencher as barras, então uma
impressão crua sairia com metade do conteúdo invisível, os números em 0 e
as barras vazias. Ele cria uma cópia temporária com um script que congela
tudo no estado final, imprime pelo Chrome headless e apaga a cópia.

A folha `@media print` no fim do `style.css` faz três coisas que o papel
exige e a tela não:
- converte hero e "Sobre mim" de foto absoluta para fluxo normal — sem
  isso o conteúdo é recortado, porque no papel não existe scroll;
- força `print-color-adjust: exact`, senão os blocos terracota e escuro
  saem brancos;
- mostra **as três plataformas** de métricas, não só a aba aberta — num
  material enviado para marca isso conta.

## Pendências
1. **Links das redes sociais** — Instagram, TikTok e YouTube estão como
   `href="#"`. Procure por `<!-- TODO:` em `index.html`, seção `id="contato"`.
2. **Vídeos** — decidido: arquivos locais no repo. A estrutura já está
   pronta (CSS do `<video>` no mockup, autoplay mudo em loop ao entrar na
   tela, pausa ao sair, botão de som opcional). Falta subir os arquivos em
   `assets/video/` — veja `assets/video/LEIA-ME.md` para os nomes
   esperados, o snippet de markup e o comando de compressão.
3. **Marcas parceiras** — a seção existe com 4 slots "Sua marca aqui";
   falta subir os logos reais.
4. **E-mail** — está `brunaquino.mkt@gmail.com`. Trocar se for outro
   (ou acrescentar WhatsApp).
5. **Métricas** — vale marcar o período de cada número (ex.: "TikTok,
   últimos 28 dias") para dar contexto a quem avalia.
