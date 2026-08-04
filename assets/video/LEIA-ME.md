# Vídeos do portfólio

Coloque os arquivos aqui e referencie no `index.html` trocando a `<img>`
do mockup por um `<video>` (veja o exemplo abaixo).

## Nomes esperados
| Arquivo | Onde aparece |
|---|---|
| `destaque-storytelling.mp4` | Conteúdos em destaque — Storytelling |
| `destaque-clips.mp4` | Conteúdos em destaque — Clips |
| `destaque-tiktokshop.mp4` | Conteúdos em destaque — TikTok Shop |

## Como referenciar
```html
<div class="phone-screen">
  <span class="tag">Storytelling</span>
  <video src="assets/video/destaque-storytelling.mp4"
         poster="assets/img/destaque-storytelling.jpg"
         muted loop playsinline preload="none"></video>
  <span class="play-badge">▶</span>
</div>
```
O `poster` é a imagem que já está no site — ela aparece enquanto o vídeo
não carrega, então nada quebra se o arquivo faltar.

## Antes de subir
Vídeo pesado trava o carregamento da página. Comprima para web:

```
ffmpeg -i original.mp4 -vf "scale=-2:1280" -c:v libx264 -crf 28 \
       -preset slow -movflags +faststart -an saida.mp4
```

- `-an` remove o áudio (os vídeos tocam mudos em loop no mockup)
- `-crf 28` e altura 1280 costumam deixar 15s em torno de 1–2 MB
- `-movflags +faststart` faz o vídeo começar antes do download terminar

Alvo: **até ~2 MB por vídeo**. Acima disso, prefira YouTube/Vimeo.
