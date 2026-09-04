document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.hamburger');
  var menu = document.querySelector('.mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      btn.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        btn.classList.remove('open');
        menu.classList.remove('open');
      });
    });
  }

  var pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    requestAnimationFrame(function () {
      pageHero.classList.add('is-ready');
    });
  }

  var selectors = [
    '.section-head',
    '.skill-card',
    '.project-card',
    '.job-card',
    '.tl-item',
    '.contact-box',
    '.info-card',
    '.about-quote',
    '.about-facts .fact',
    '.project-filter',
    '.card-grid-2 > .skill-card',
    'section .wrap > img'
  ];

  var targets = document.querySelectorAll(selectors.join(','));
  var staggerParents = new WeakMap();

  targets.forEach(function (el) {
    if (el.classList.contains('reveal')) return;
    el.classList.add('reveal');

    var parent = el.parentElement;
    if (parent) {
      var index = staggerParents.get(parent) || 0;
      var delay = Math.min(index, 5);
      if (delay > 0) el.classList.add('reveal-delay-' + delay);
      staggerParents.set(parent, index + 1);
    }
  });

  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
});
