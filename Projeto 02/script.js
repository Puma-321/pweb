/* ============================================================
   JM VIAGENS — script.js
   ============================================================ */

/* ---------- Header scroll ---------- */
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ---------- Hamburger / menu mobile ---------- */
const hamburger = document.querySelector('.hamburger');
const navLinks  = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
  // Fecha ao clicar em link
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Link ativo no menu ---------- */
(function markActiveLink() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ---------- Hero: remover parallax / animar bg ---------- */
const hero = document.querySelector('.hero');
if (hero) {
  window.addEventListener('load', () => hero.classList.add('loaded'));

  // Parallax suave no bg
  const heroBg = hero.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `scale(1) translateY(${y * 0.25}px)`;
      }
    });
  }
}

/* ---------- Page banner animate ---------- */
const pageBanner = document.querySelector('.page-banner');
if (pageBanner) {
  window.addEventListener('load', () => pageBanner.classList.add('loaded'));
}

/* ---------- Reveal on scroll (IntersectionObserver) ---------- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(el => observer.observe(el));
}

/* ---------- Formulário de contato ---------- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Simula envio
    setTimeout(() => {
      form.style.display = 'none';
      const success = document.getElementById('formSuccess');
      if (success) success.style.display = 'block';
    }, 1400);
  });
}

/* ---------- Smooth scroll para âncoras internas ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---------- Contador de números (sobre) ---------- */
function animateCounter(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
  }, 16);
}

const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.count), 1200);
        cObs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObs.observe(c));
}
