(() => {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const body = document.body;
  const toggle = $('#darkModeToggle');
  const hamburger = $('#hamburger');
  const navMenu = $('#navMenu');

  // Modo oscuro (respeta preferencia del SO la 1ª vez)
  const stored = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = stored ? stored === 'enabled' : prefersDark;
  if (initialDark) body.classList.add('dark');
  toggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';

  toggle?.addEventListener('click', () => {
    const isDark = body.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    toggle.textContent = isDark ? '☀️' : '🌙';
  });

  // Menú hamburguesa
  hamburger?.addEventListener('click', () => {
    const expanded = navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', expanded);
    if (expanded) navMenu.querySelector('a')?.focus();
  });

  // Header sombra al scrollear
  const header = $('.header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 4);
  onScroll();
  document.addEventListener('scroll', onScroll, { passive: true });

  // Scroll suave con offset del header
  $$('.nav-links a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = $(a.getAttribute('href'));
      if (!target) return;
      const offset = header.getBoundingClientRect().height + 6;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Observer para timeline
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  $$('.timeline-item').forEach(el => io.observe(el));
})();