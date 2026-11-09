const EMAIL = 'ch.boyeldieu@gmail.com';
const TYPED_LINES = ['shipping rails in production', 'building with AI, every day', 'turning needs into software'];
const isMotionReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function copyEmail() {
  navigator.clipboard.writeText(EMAIL)
    .then(() => showToast('email copied'))
    .catch(() => showToast(EMAIL));
}

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

function trackSpotlight() {
  document.addEventListener('pointermove', (event) => {
    const card = event.target.closest('.card');
    if (!card) return;
    const box = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${event.clientX - box.left}px`);
    card.style.setProperty('--my', `${event.clientY - box.top}px`);
  }, { passive: true });
}

function typeLines(element, lines) {
  if (isMotionReduced) return;
  let lineIndex = 0;
  let charIndex = lines[0].length;
  let isDeleting = true;

  const tick = () => {
    const line = lines[lineIndex];
    charIndex += isDeleting ? -1 : 1;
    element.textContent = line.slice(0, charIndex);
    let delay = isDeleting ? 26 : 55;
    if (!isDeleting && charIndex === line.length) {
      isDeleting = true;
      delay = 1700;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      delay = 350;
    }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 1700);
}

function openUrl(url) {
  window.open(url, '_blank', 'noopener');
}

const RESUME_URLS = {
  fr: 'images/cv/cv-stasboyeldieu.pdf',
  en: 'images/cv/resume-stasboyeldieu.pdf',
};

function preferredResumeUrl() {
  return navigator.language.toLowerCase().startsWith('fr') ? RESUME_URLS.fr : RESUME_URLS.en;
}

function setupResumeLinks() {
  document.querySelectorAll('[data-resume]').forEach((link) => {
    link.href = preferredResumeUrl();
  });
}

const ACTIONS = [
  { label: 'go to experience', run: () => { location.hash = '#experience'; } },
  { label: 'go to stack', run: () => { location.hash = '#stack'; } },
  { label: 'go to about', run: () => { location.hash = '#about'; } },
  { label: 'go to contact', run: () => { location.hash = '#contact'; } },
  { label: 'copy email', run: copyEmail },
  { label: 'open resume', run: () => openUrl(preferredResumeUrl()) },
  { label: 'open resume · french', run: () => openUrl(RESUME_URLS.fr) },
  { label: 'open resume · english', run: () => openUrl(RESUME_URLS.en) },
  { label: 'open github', run: () => openUrl('https://github.com/charleshsb') },
  { label: 'open linkedin', run: () => openUrl('https://www.linkedin.com/in/charleshenry-stasboyeldieu/') },
];

function setupPalette() {
  const dialog = document.querySelector('#palette');
  const input = dialog.querySelector('input');
  const list = dialog.querySelector('ul');
  let visibleActions = ACTIONS;
  let activeIndex = 0;

  const runAction = (action) => {
    dialog.close();
    action.run();
  };

  const render = () => {
    list.replaceChildren(...visibleActions.map((action, index) => {
      const item = document.createElement('li');
      item.textContent = action.label;
      item.className = index === activeIndex ? 'active' : '';
      item.addEventListener('click', () => runAction(action));
      return item;
    }));
  };

  const filter = () => {
    const query = input.value.trim().toLowerCase();
    visibleActions = ACTIONS.filter((action) => action.label.includes(query));
    activeIndex = 0;
    render();
  };

  const move = (step) => {
    if (!visibleActions.length) return;
    activeIndex = (activeIndex + step + visibleActions.length) % visibleActions.length;
    render();
  };

  const open = () => {
    input.value = '';
    filter();
    dialog.showModal();
    input.focus();
  };

  input.addEventListener('input', filter);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') { event.preventDefault(); move(1); }
    if (event.key === 'ArrowUp') { event.preventDefault(); move(-1); }
    if (event.key === 'Enter' && visibleActions[activeIndex]) runAction(visibleActions[activeIndex]);
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      open();
    }
  });
  document.querySelectorAll('[data-open-palette]').forEach((button) => button.addEventListener('click', open));
}

function setupCompare() {
  const compare = document.querySelector('.compare');
  const range = compare.querySelector('input');
  let hasInteracted = false;

  const setPosition = (value) => {
    compare.style.setProperty('--pos', `${value}%`);
    range.value = value;
  };

  range.addEventListener('input', () => {
    hasInteracted = true;
    setPosition(range.value);
  });
  if (isMotionReduced) return;

  // the card opens on the finance photo and slides to the middle once it is on screen
  setPosition(100);
  const sweep = () => {
    const start = performance.now();
    const step = (now) => {
      if (hasInteracted) return;
      const progress = Math.min(1, (now - start) / 1600);
      setPosition(100 - 50 * (1 - (1 - progress) ** 3));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    sweep();
  }, { threshold: 0.6 });
  observer.observe(compare);
}

document.querySelectorAll('[data-copy-email]').forEach((button) => button.addEventListener('click', copyEmail));
revealOnScroll();
trackSpotlight();
typeLines(document.querySelector('#typed'), TYPED_LINES);
setupPalette();
setupCompare();
setupResumeLinks();
