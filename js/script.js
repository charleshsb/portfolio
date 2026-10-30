const banner = document.querySelector('.banner');
const timeline = document.querySelector('.cards-project');

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    io.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  io.observe(el);
});

const update = () => {
  // parallax only while the hero is on screen
  if (window.scrollY < window.innerHeight) {
    banner.style.setProperty('--py', window.scrollY * 0.25);
  }
  const rect = timeline.getBoundingClientRect();
  const progress = (window.innerHeight * 0.6 - rect.top) / rect.height;
  timeline.style.setProperty('--progress', Math.min(1, Math.max(0, progress)));
};

window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
update();
