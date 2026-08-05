#!/usr/bin/env bash
# Gera o PDF do portfolio a partir do index.html.
#
# Por que nao imprimir o index.html direto: o site depende de JS para revelar
# as secoes, animar os contadores e preencher as barras. Numa impressao os
# contadores ficariam em 0, as barras em 0% e as imagens lazy fora da tela nem
# carregariam. Este script gera uma copia temporaria com um script que congela
# tudo no estado final, imprime, e apaga a copia.
#
# Uso:  ./tools/gerar-pdf.sh  [saida.pdf]
set -euo pipefail
cd "$(dirname "$0")/.."

SAIDA="${1:-portfolio-bruna-aquino.pdf}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORTA=8123
PERFIL="$(mktemp -d)"

[ -x "$CHROME" ] || { echo "Chrome nao encontrado em $CHROME"; exit 1; }

python3 - <<'PY'
s = open("index.html", encoding="utf-8").read()
congela = """
<script>
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal, .step').forEach(e => e.classList.add('in'));
  document.querySelectorAll('img[loading="lazy"]').forEach(i => i.loading = 'eager');
  document.querySelectorAll('.metric-panel').forEach(p => { p.hidden = false; p.classList.add('show'); });
  document.querySelectorAll('.bar-fill').forEach(b => b.style.width = b.dataset.w + '%');
  document.querySelectorAll('.val').forEach(v => {
    const alvo = parseFloat(v.dataset.count), inteiro = v.dataset.int === '1';
    v.textContent = (inteiro ? Math.round(alvo).toLocaleString('pt-BR')
                             : alvo.toFixed(1).replace('.', ',')) + (v.dataset.suffix || '');
  });
});
</script>
</body>"""
open("_print.html", "w", encoding="utf-8").write(s.replace("</body>", congela))
PY

python3 -m http.server "$PORTA" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVIDOR=$!
trap 'kill $SERVIDOR 2>/dev/null; rm -f _print.html; rm -rf "$PERFIL"' EXIT
sleep 1

"$CHROME" --headless=new --disable-gpu --no-first-run --no-default-browser-check \
  --disable-extensions --disable-sync --disable-background-networking \
  --user-data-dir="$PERFIL" --virtual-time-budget=15000 \
  --run-all-compositor-stages-before-draw --no-pdf-header-footer \
  --print-to-pdf="$SAIDA" "http://127.0.0.1:$PORTA/_print.html" >/dev/null 2>&1 || true

# o Chrome headless costuma nao encerrar sozinho: espera o arquivo parar de crescer
for _ in $(seq 1 20); do
  [ -s "$SAIDA" ] && { a=$(stat -f%z "$SAIDA"); sleep 2; b=$(stat -f%z "$SAIDA"); [ "$a" = "$b" ] && break; }
  sleep 2
done
pkill -f "$PERFIL" 2>/dev/null || true

PAGINAS=$(python3 -c "import re,sys; print(len(re.findall(rb'/Type\s*/Page[^s]', open('$SAIDA','rb').read())))")
echo "$SAIDA — $PAGINAS paginas, $(du -h "$SAIDA" | cut -f1)"
