# Changelog

Todas as mudanças relevantes do portfólio. Formato baseado em
[Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [0.3.0] — 2026-08-05

### Adicionado
- Folha `@media print` e `tools/gerar-pdf.sh`, que gera
  `portfolio-bruna-aquino.pdf` (14 páginas). No PDF as **três plataformas**
  de métricas aparecem, não só a aba aberta.

### Corrigido
- **Padding vertical zerado** em todas as seções com `class="wrap"`
  (atuação, conteúdos, marcas, processo). O `.wrap` usava o shorthand
  `padding: 0 32px`, que redefine os quatro lados e vencia
  `section{padding:120px 0}` por especificidade. O título "Conteúdos em
  destaque" começava a 10px da borda da seção anterior. Bug herdado do
  arquivo de referência.
- **Capitulares montando na palavra seguinte.** O swash da Pinyon Script
  transborda a caixa da letra, então o "F" de *Frentes* invadia "rentes".
  Como o transbordo é do desenho e não da métrica, não aparecia como
  sobreposição ao medir. Resolvido com `display:inline-block` e margem
  proporcional ao corpo.
- **Hero cortava a composição.** A capa é 4:3 e ocupava a largura toda numa
  caixa 2,20:1 — só 61% da altura aparecia, cortando a Bruna na canela.
  Movida para a coluna direita (57%): **100% da altura** agora aparece.
- **"Sobre mim" com a Bruna sobre o esfumaçado.** Reposicionada para
  `object-position: 68%` e a área sólida da máscara estendida de 52% para 70%.
- Foto do contato esticava numa tira estreita por não ter proporção
  definida; agora é 4:5 com `object-fit`.
- Título das linhas de serviço centralizado na vertical e parágrafo limitado
  a 620px, para não encostar na borda.

### Alterado
- **Frentes de atuação** deixa de ser grade 2×2 de cards e vira lista
  editorial (`número │ título │ descrição`). Na grade, todos os cards
  herdavam a altura do mais alto e os textos curtos sobravam buraco branco.
- **Nichos** vira duas colunas com luz radial e trama mascarada, em vez de
  bloco de cor chapado.
- **Marcas** vira duas colunas com a nota junto do título — o vazio dos
  slots passa a ler como intenção, não como página inacabada.
- **Processo** assume a `atuacao.jpg` (recorte sobre preto sólido) como
  painel escuro com `mix-blend-mode: lighten`, em vez de deixar o preto
  brigando com o creme.
- Títulos de card e de etapa saem da Italiana para **DM Sans 600**: uma
  display serif de traço fino perde legibilidade em 21–28px. A Italiana
  fica nas aberturas de seção, onde funciona.
- Seções encolheram: nichos 560→407px, marcas 398→351px, processo
  1111→794px, contato 1375→774px.

## [0.2.0] — 2026-08-04

### Alterado
- **Tipografia definida:** Italiana (títulos), Pinyon Script (capitulares),
  DM Sans (corpo), JetBrains Mono (labels). Todas self-hosted.
  As capitulares usam `color: inherit` — mesma cor do título, não terracota.
- Hatton e Symphony (fontes comerciais pretendidas) foram descartadas:
  a Hatton é paga (Pangram Pangram) e existem quatro "Symphony" de
  fundições diferentes, sem como identificar a certa.
- **Hero** com `capa.jpg` como imagem de fundo, no enquadramento original.
- **"Sobre mim"** com foto na coluna esquerda e borda dissolvida por
  `mask-image` — transparência real, não gradiente creme por cima.
- Adotada a direção editorial da versão de referência (seções numeradas,
  marquee, cards de serviço, seção de marcas) com as **fotos reais do
  acervo**: naquela versão o hero era um retângulo preto e uma das
  polaroids do "Sobre mim" era uma folha em branco.

### Adicionado
- Contato com e-mail e clique-para-copiar — a versão de referência não
  tinha **nenhum** caminho de contato.
- Meta OG/Twitter e JSON-LD `Person`.
- `assets/video/` com estrutura pronta para os vídeos nos mockups
  (autoplay mudo em loop ao entrar na tela, `poster` na imagem atual).

### Corrigido
- `.reveal` só esconde conteúdo com JS ativo (`html.js`) — sem JS a página
  continua legível.
- `width`/`height` e `loading="lazy"` em todas as imagens; hero com
  `fetchpriority="high"`.
- `scroll-margin-top: 80px` — âncoras não param sob o header fixo.
- Contrastes de texto secundário sobre fundo escuro ajustados para AA.
- Removidos CSS e JS órfãos de abas que não tinham markup correspondente.

### Removido
- Fontes Fraunces, Manrope, Poppins e Mrs Saint Delafield (fora de uso).
- `sobre-full.png`, que era um recorte com fundo branco aparecendo como
  card solto fora da paleta.

## [0.1.0] — 2026-08-04

### Adicionado
- Versão inicial do portfólio, recriada a partir do PDF original de
  12 páginas: capa, sobre, frentes de atuação, nichos, conteúdos,
  processo criativo, métricas e contato.
