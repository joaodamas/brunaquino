document.addEventListener('DOMContentLoaded', () => {

  /* ---------- header scroll state + progress bar ---------- */
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('scrollProgress');

  function onScroll(){
    const y = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle('scrolled', y > 40);

    const h = document.documentElement;
    const scrollable = h.scrollHeight - h.clientHeight;
    const pct = scrollable > 0 ? (y / scrollable) * 100 : 0;
    progress.style.width = pct + '%';
  }
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  /* ---------- mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMobile.classList.toggle('open');
    header.classList.toggle('menu-open');
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navMobile.classList.remove('open');
      header.classList.remove('menu-open');
    });
  });

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- cover parallax on mouse move (desktop only) ---------- */
  const coverPhoto = document.getElementById('coverPhoto');
  if (coverPhoto && window.matchMedia('(min-width: 981px)').matches){
    document.querySelector('.cover').addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      coverPhoto.style.transform = `translate(${nx * -14}px, ${ny * -10}px) scale(1.04)`;
    });
  }

  /* ---------- flip cards (frentes de atuação) ---------- */
  document.querySelectorAll('.flip-card').forEach(card => {
    card.removeAttribute('data-open');
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });
  });

  /* ---------- nichos "+" expand ---------- */
  const nichoMore = document.getElementById('nichoMore');
  if (nichoMore){
    nichoMore.addEventListener('click', () => {
      const wrap = nichoMore.closest('.nichos-pills');
      const open = wrap.classList.toggle('open');
      nichoMore.setAttribute('aria-expanded', open);
    });
    nichoMore.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); nichoMore.click(); }
    });
  }

  /* ---------- diversos tabs ---------- */
  const diversosTabs = document.getElementById('diversosTabs');
  if (diversosTabs){
    diversosTabs.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        diversosTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.dataset.tab;
        document.querySelectorAll('[data-panel]').forEach(panel => {
          const show = panel.id === target;
          panel.hidden = !show;
          panel.style.display = show ? '' : 'none';
          panel.classList.toggle('active', show);
        });
      });
    });
  }

  /* ---------- processo criativo — accordion steps ---------- */
  const steps = document.querySelectorAll('.step');
  steps.forEach((step, i) => {
    if (i === 0) step.classList.add('open');
    step.addEventListener('click', () => {
      const wasOpen = step.classList.contains('open');
      steps.forEach(s => s.classList.remove('open'));
      if (!wasOpen) step.classList.add('open');
    });
  });

  /* ---------- métricas: platform tabs ---------- */
  const metricsTabs = document.querySelectorAll('.metrics-tab');
  const metricsPanels = document.querySelectorAll('[data-platform-panel]');
  metricsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      metricsTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const platform = tab.dataset.platform;
      metricsPanels.forEach(panel => {
        const show = panel.dataset.platformPanel === platform;
        panel.hidden = !show;
        panel.style.display = show ? '' : 'none';
        panel.classList.toggle('active', show);
        if (show) animatePanel(panel);
      });
    });
  });

  /* ---------- count-up + bar fill animation, triggered on view ---------- */
  function formatNumber(n, decimals){
    const opts = { minimumFractionDigits: decimals, maximumFractionDigits: decimals };
    return n.toLocaleString('pt-BR', opts);
  }

  function animatePanel(panel){
    if (panel.dataset.animated) return;
    panel.dataset.animated = 'true';

    panel.querySelectorAll('.stat-value').forEach(el => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const decimals = el.dataset.count.includes('.') ? 1 : 0;
      const duration = 1200;
      const start = performance.now();

      function tick(now){
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = target * eased;
        el.textContent = formatNumber(value, decimals) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });

    panel.querySelectorAll('.bar-fill').forEach(bar => {
      const pct = bar.dataset.pct;
      requestAnimationFrame(() => { bar.style.width = pct + '%'; });
    });
  }

  const metricsSection = document.getElementById('metricas');
  if (metricsSection){
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          const activePanel = metricsSection.querySelector('.metrics-panel.active');
          if (activePanel) animatePanel(activePanel);
          metricsObserver.disconnect();
        }
      });
    }, { threshold: 0.25 });
    metricsObserver.observe(metricsSection);
  }

  /* ---------- copy email to clipboard ---------- */
  const emailCopy = document.getElementById('emailCopy');
  if (emailCopy){
    emailCopy.addEventListener('click', (e) => {
      const email = emailCopy.dataset.email;
      if (navigator.clipboard){
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
          emailCopy.classList.add('copied');
          setTimeout(() => emailCopy.classList.remove('copied'), 2200);
        }).catch(() => { window.location.href = 'mailto:' + email; });
      }
    });
  }

});
