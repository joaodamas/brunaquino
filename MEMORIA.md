# Memória do projeto — Portfólio UGC Bruna Aquino (2026)

## O que foi pedido
Recriar o portfólio em PDF da Bruna Aquino como um site HTML interativo,
mantendo a montagem/paleta original, mas com a capa trocada pela nova
foto enviada, com uma transição esfumaçada para o lado direito onde
entram o nome e as informações.

## Fonte de conteúdo
Todo o texto, dados de métricas e imagens vieram do PDF original
(`bruna_aquino.pdf`, 12 páginas) enviado na conversa. As fotos usadas em
cada seção foram extraídas diretamente das imagens embutidas nesse PDF
(mockups de celular, fotos de produto, fotos pessoais). A foto da capa é
a nova foto enviada por você no chat (sentada na poltrona, cortina ao
fundo).

## Paleta de cores (extraída por amostragem de pixel do PDF)
- Creme (fundo claro): `#F1F1EF`
- Terracota (destaque/seções escuras): `#9E3C23`
- Grafite (texto): `#3D3D3D`
- Bege dos "pills"/tags: `#E4DDD5`
- Cartão escuro das métricas: `#0B0E15`

## Tipografia
- **Mrs Saint Delafield** (script/cursiva) — usada só na letra maiúscula
  de destaque dos títulos (ex.: o "B" de "Bruna", o "S" de "Sobre mim"),
  reproduzindo o efeito de capitular do PDF original.
- **Poppins** (300 a 800) — usada no restante dos títulos e em todo o
  corpo de texto.
- Ambas as fontes estão hospedadas localmente em `assets/fonts/` (não
  dependem de internet nem de CDN do Google Fonts).

## Estrutura de arquivos
```
index.html              → todo o conteúdo/seções do site
assets/css/style.css    → estilo, paleta, responsividade, animações
assets/js/main.js       → interatividade (menu, scroll reveal, tabs,
                           flip cards, contadores animados, copiar e-mail)
assets/fonts/           → fontes .woff2 usadas (self-hosted)
assets/img/             → fotos usadas em cada seção
```

### Origem de cada imagem em `assets/img/`
| Arquivo | Uso | Origem |
|---|---|---|
| `capa.jpg` | Capa | Foto nova enviada por você no chat |
| `sobre-1.jpg`, `sobre-2.jpg`, `sobre-full.png` | Sobre mim | Extraídas da página 2 do PDF |
| `atuacao.jpg` | Frentes de atuação | Página 3 do PDF |
| `destaque-storytelling.jpg`, `destaque-clips.jpg`, `destaque-tiktokshop.jpg` | Conteúdos em destaque | Página 5 do PDF |
| `diverso-unboxing.jpg`, `diverso-grwm.jpg`, `diverso-acessorio.jpg`, `diverso-produto.jpg` | Conteúdos diversos (aba 1) | Página 6 do PDF |
| `diverso-cuidados.jpg`, `diverso-depoimento.jpg`, `diverso-visitas.jpg`, `diverso-unboxing2.jpg` | Conteúdos diversos (aba 2) | Página 7 do PDF |
| `contato.jpg` | Vamos trabalhar juntos | Página 12 do PDF |

## Dados de métricas usados (extraídos do texto/gráficos do PDF)
- **TikTok:** total/novos espectadores, visualizações, curtidas,
  comentários, compartilhamentos, recompensas, gênero e idade da audiência.
- **Instagram:** visualizações (30 dias), visualizadores, % seguidores
  vs. não seguidores, gênero, faixas etárias, principais cidades.
- **YouTube:** visualizações, "gostei", comentários, compartilhamentos,
  visualizações recentes, gênero e idade da audiência.

Todos esses números estão marcados no HTML com o comentário/observação
do próprio PDF: *"Métricas completas são apresentadas conforme o escopo
do projeto."*

## Interatividade implementada
- Barra de progresso de rolagem e menu fixo que muda ao rolar.
- Menu mobile em tela cheia (hambúrguer).
- Animações de entrada ("reveal") por seção ao rolar a página.
- Leve parallax na foto da capa ao mover o mouse (desktop).
- Cards de "Frentes de atuação" viram (flip) ao clicar, revelando mais texto.
- Botão "+" em "Nichos que atendo" expande nichos extras.
- Abas em "Conteúdos diversos" (Unboxing & rotina / Cuidados & social).
- Abas de plataforma em "Métricas" (TikTok / Instagram / YouTube), com
  números e barras animados quando a seção entra na tela.
- Acordeão nas 4 etapas do "Processo criativo".
- Clique para copiar o e-mail de contato.

## Pendências / pontos para você decidir
1. **Redes sociais:** os ícones de Instagram, TikTok e YouTube no rodapé
   estão como link placeholder (`href="#"`) — falta colocar o link real
   de cada perfil. Procure por `<!-- ... social-icon -->` em `index.html`
   na seção `id="contato"`.
2. **E-mail de contato:** usei `brunaquino.mkt@gmail.com`. Se quiser outro
   e-mail (ou WhatsApp), é só avisar.
3. As fotos/mockups de celular são as mesmas do PDF original — se você
   tiver versões em resolução maior ou quiser trocar alguma, é só enviar.

## Como visualizar localmente
Abra `index.html` direto no navegador, ou rode um servidor simples na
pasta do projeto:
```
python3 -m http.server 8000
```
e acesse `http://localhost:8000`.
