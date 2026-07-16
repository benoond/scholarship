// Luminary — static site JS
// Mobile nav toggle
(function () {
  const btn = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-mobile-nav]');
  if (!btn || !nav) return;
  const openIcon = btn.querySelector('.icon-open');
  const closeIcon = btn.querySelector('.icon-close');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
    if (openIcon && closeIcon) {
      openIcon.style.display = open ? 'none' : '';
      closeIcon.style.display = open ? '' : 'none';
    }
  });
})();
// Highlight active nav link based on current page
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav] a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
})();
// Carousel
(function () {
  const el = document.querySelector('[data-carousel]');
  if (!el) return;
  const track = el.querySelector('.carousel-track');
  const slides = el.querySelectorAll('.carousel-slide');
  const dotsWrap = el.querySelector('.carousel-dots');
  let index = 0;
  let timer;
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => go(i, true));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('button');
  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }
  function go(i, userTriggered) {
    index = (i + slides.length) % slides.length;
    render();
    if (userTriggered) restart();
  }
  function next() { go(index + 1); }
  function start() { timer = setInterval(next, 4500); }
  function restart() { clearInterval(timer); start(); }
  render();
  start();
  // Pause on hover
  el.addEventListener('mouseenter', () => clearInterval(timer));
  el.addEventListener('mouseleave', start);
})();
// Simple form submit feedback
document.querySelectorAll('[data-form]').forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Sent ✓';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = original; btn.disabled = false; form.reset(); }, 1800);
  });
});
