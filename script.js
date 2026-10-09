(function () {
  document.documentElement.classList.add('js');
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  // Header shadow on scroll
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 10); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  function closeMenu() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // Portfolio "View Details" toggles
  document.querySelectorAll('.project .toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      panel.hidden = open;
      btn.setAttribute('aria-expanded', String(!open));
      btn.textContent = open ? 'View Details' : 'Hide Details';
    });
  });

  // Fade-in on scroll
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Active nav link
  var map = {
    home: 'home', about: 'about', experience: 'about',
    services: 'services', 'social-media': 'services', 'lead-generation': 'services', industries: 'services',
    'how-it-works': 'services', onboarding: 'services', results: 'portfolio', portfolio: 'portfolio',
    testimonials: 'portfolio', pricing: 'pricing', tools: 'pricing', faq: 'pricing', insights: 'pricing', contact: 'contact'
  };
  var links = {};
  nav.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  var sections = document.querySelectorAll('main section[id]');
  function setActive() {
    var y = window.scrollY + window.innerHeight * 0.35, current = 'home';
    sections.forEach(function (s) { if (s.offsetTop <= y) current = s.id; });
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = 'contact';
    var key = map[current] || 'home';
    Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === key); });
  }
  setActive();
  window.addEventListener('scroll', setActive, { passive: true });
})();
