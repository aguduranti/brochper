(() => {
  'use strict';

  /* ─── CURSOR ─── */
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');

  if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mx = -100, my = -100;
    let cx = -100, cy = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursorDot.style.left = mx + 'px';
      cursorDot.style.top  = my + 'px';
    });

    const raf = () => {
      cx += (mx - cx) * .12;
      cy += (my - cy) * .12;
      cursor.style.left = cx + 'px';
      cursor.style.top  = cy + 'px';
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
  }

  /* ─── LOADER ─── */
  const loader     = document.getElementById('loader');
  const loaderFill = document.getElementById('loaderFill');

  if (loader && loaderFill) {
    // Fake progress
    let progress = 0;
    const tick = setInterval(() => {
      progress = Math.min(progress + Math.random() * 18, 90);
      loaderFill.style.width = progress + '%';
    }, 80);

    window.addEventListener('load', () => {
      clearInterval(tick);
      loaderFill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('out');
        document.body.style.overflow = '';
      }, 400);
    });

    // Fallback
    setTimeout(() => loader.classList.add('out'), 3000);
    document.body.style.overflow = 'hidden';
  }

  /* ─── DARK MODE ─── */
  const themeBtn  = document.getElementById('themeBtn');
  const stored    = localStorage.getItem('brochper-theme');
  const prefersDk = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (stored === 'dark' || (!stored && prefersDk)) {
    document.body.classList.add('dark');
  }

  themeBtn?.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('brochper-theme', isDark ? 'dark' : 'light');
  });

  /* ─── HEADER ─── */
  const header = document.getElementById('header');
  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── BURGER ─── */
  const burger    = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');

  burger?.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    mobileNav?.classList.toggle('open', open);
    mobileNav?.setAttribute('aria-hidden', !open);
  });

  // Close mobile nav on link click
  document.querySelectorAll('.mnav-link').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      burger?.setAttribute('aria-expanded', 'false');
      mobileNav?.classList.remove('open');
      mobileNav?.setAttribute('aria-hidden', 'true');
    });
  });

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (header?.getBoundingClientRect().height ?? 72) + 8;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─── INTERSECTION OBSERVER: REVEAL ─── */
  const revealTargets = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .reveal-line'
  );

  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => revealObs.observe(el));

  /* ─── MARQUEE PAUSE ON HOVER ─── */
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.parentElement?.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.parentElement?.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  /* ─── HERO PARALLAX ─── */
  const heroBg = document.querySelector('.hero-bg-text');
  if (heroBg && window.matchMedia('(min-width: 860px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBg.style.transform = `translate(-50%, calc(-50% + ${y * .15}px))`;
    }, { passive: true });
  }

  /* ─── CARD TILT ─── */
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left) / r.width  - .5;
      const y  = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `translateX(6px) rotateY(${x * 5}deg) rotateX(${-y * 3}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── CONTACT CARD RIPPLE ─── */
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', e => {
      const r   = card.getBoundingClientRect();
      const dot = document.createElement('span');
      dot.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(241,90,36,.15);
        width:10px; height:10px;
        left:${e.clientX - r.left - 5}px;
        top:${e.clientY - r.top - 5}px;
        transform:scale(0); pointer-events:none;
        animation: ripple .5s ease-out forwards;
      `;
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(dot);
      setTimeout(() => dot.remove(), 600);
    });
  });

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: scale(30); opacity: 0; } }`;
  document.head.appendChild(style);

})();
