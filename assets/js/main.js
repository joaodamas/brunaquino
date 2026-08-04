/* Bruna Aquino — Portfólio UGC 2026 */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- barra de progresso + estado do header + nav ativa ---------- */
  const progress = document.getElementById('progress');
  const header = document.getElementById('siteHeader');
  const navSections = ['sobre', 'atuacao', 'nichos', 'conteudos', 'marcas', 'metricas'];
  const navLinks = document.querySelectorAll('[data-nav]');

  function onScroll() {
    const h = document.documentElement;
    const scrollable = h.scrollHeight - h.clientHeight;
    progress.style.width = (scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0) + '%';
    header.classList.toggle('scrolled', h.scrollTop > 10);

    let current = null;
    navSections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.2) current = id;
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- reveal ao rolar ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- destaque das etapas do processo ---------- */
  const stepIo = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.5 });
  document.querySelectorAll('.step').forEach(s => stepIo.observe(s));

  /* ---------- carrossel de texto (marquee) ---------- */
  const marqueeWords = ['UGC CREATOR', 'SÃO PAULO', 'CONTEÚDO ESTRATÉGICO', 'COMPORTAMENTO DO CONSUMIDOR'];
  const track = document.getElementById('marqueeTrack');
  if (track) {
    // duas voltas identicas: a animacao translada -50% e o loop fica continuo
    track.innerHTML = marqueeWords.concat(marqueeWords).map(w => '<span>' + w + '</span>').join('');
  }

  /* ---------- nichos ---------- */
  const nicheStatus = document.getElementById('nicheStatus');
  const nichePills = document.querySelectorAll('.niche-pill:not(.plus)');
  function updateStatus() {
    const active = document.querySelectorAll('.niche-pill.on:not(.plus)').length;
    nicheStatus.textContent = active + (active === 1 ? ' nicho ativo' : ' nichos ativos') + ' — clique para explorar';
  }
  nichePills.forEach(p => p.addEventListener('click', () => { p.classList.toggle('on'); updateStatus(); }));
  const moreNiche = document.getElementById('moreNiche');
  if (moreNiche) {
    moreNiche.addEventListener('click', () => {
      document.getElementById('contato').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- métricas: abas, contadores e barras ---------- */
  const mtabs = document.querySelectorAll('.mtab');
  const mpanels = document.querySelectorAll('.metric-panel');

  function animatePanel(panel) {
    if (!panel) return;
    panel.querySelectorAll('.val').forEach(val => {
      const target = parseFloat(val.dataset.count);
      const isInt = val.dataset.int === '1';
      const suffix = val.dataset.suffix || '';
      const render = v => (isInt ? Math.round(v).toLocaleString('pt-BR') : v.toFixed(1).replace('.', ',')) + suffix;

      if (reduceMotion) { val.textContent = render(target); return; }

      const dur = 1200;
      let start = null;
      function step(ts) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        val.textContent = render(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
    panel.querySelectorAll('.bar-fill').forEach(bar => {
      requestAnimationFrame(() => { bar.style.width = bar.dataset.w + '%'; });
    });
  }

  mtabs.forEach(btn => {
    btn.addEventListener('click', () => {
      mtabs.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      mpanels.forEach(p => {
        const show = p.dataset.mpanel === btn.dataset.mtab;
        p.classList.toggle('show', show);
        p.hidden = !show;
        if (show) animatePanel(p);
      });
    });
  });

  const metricsSection = document.getElementById('metricas');
  if (metricsSection) {
    const metricsIo = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        animatePanel(document.querySelector('.metric-panel.show'));
        metricsIo.disconnect();
      });
    }, { threshold: 0.3 });
    metricsIo.observe(metricsSection);
  }

  /* ---------- copiar e-mail ---------- */
  const emailCopy = document.getElementById('emailCopy');
  if (emailCopy) {
    const icon = emailCopy.querySelector('.copy-icon');
    const original = icon.textContent;
    emailCopy.addEventListener('click', e => {
      if (!navigator.clipboard) return; // sem clipboard, o mailto do href assume
      e.preventDefault();
      navigator.clipboard.writeText(emailCopy.dataset.email).then(() => {
        emailCopy.classList.add('copied');
        icon.textContent = 'copiado ✓';
        setTimeout(() => { emailCopy.classList.remove('copied'); icon.textContent = original; }, 2200);
      }).catch(() => { window.location.href = 'mailto:' + emailCopy.dataset.email; });
    });
  }

  /* ---------- parallax da foto do hero (ponteiro fino) ---------- */
  const parallax = document.getElementById('parallaxPhoto');
  if (parallax && !reduceMotion && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let queued = false, mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth - 0.5) * 10;
      my = (e.clientY / window.innerHeight - 0.5) * 10;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { parallax.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; queued = false; });
    }, { passive: true });
  }

  /* ---------- menu mobile ---------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const mobilePanel = document.getElementById('mobilePanel');
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobilePanel.classList.toggle('open');
    burgerBtn.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  });
  mobilePanel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobilePanel.classList.remove('open');
      burgerBtn.classList.remove('open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- ponto do cursor (somente desktop com mouse) ---------- */
  const dot = document.getElementById('cursorDot');
  if (dot && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    let queued = false, cx = 0, cy = 0;
    document.addEventListener('mousemove', e => {
      cx = e.clientX; cy = e.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { dot.style.left = cx + 'px'; dot.style.top = cy + 'px'; queued = false; });
    }, { passive: true });
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => { dot.style.transform = 'translate(-50%,-50%) scale(2.4)'; dot.style.opacity = '0.5'; });
      el.addEventListener('mouseleave', () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; dot.style.opacity = ''; });
    });
  } else if (dot) {
    dot.remove();
  }
})();
