const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.classList.toggle('hidden');
  iconOpen.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.add('hidden');
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
  });
});

const setScrolledState = () => {
  navbar.classList.toggle('shadow-lg', window.scrollY > 8);
  navbar.classList.toggle('shadow-black/30', window.scrollY > 8);
};

document.addEventListener('scroll', setScrolledState, { passive: true });
setScrolledState();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const hero = document.querySelector('.hero');
  const halftone = document.querySelector('.halftone');

  if (hero && halftone) {
    const maxOffset = 14;
    hero.addEventListener('mousemove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      halftone.style.setProperty('--dot-x', `${x * maxOffset}px`);
      halftone.style.setProperty('--dot-y', `${y * maxOffset}px`);
    });
    hero.addEventListener('mouseleave', () => {
      halftone.style.setProperty('--dot-x', '0px');
      halftone.style.setProperty('--dot-y', '0px');
    });
  }

  const tileMaxOffset = 6;
  document.querySelectorAll('.tile').forEach((tile) => {
    tile.addEventListener('mousemove', (event) => {
      const rect = tile.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      tile.style.setProperty('--dot-x', `${x * tileMaxOffset}px`);
      tile.style.setProperty('--dot-y', `${y * tileMaxOffset}px`);
    });
    tile.addEventListener('mouseleave', () => {
      tile.style.setProperty('--dot-x', '0px');
      tile.style.setProperty('--dot-y', '0px');
    });
  });
}

document.querySelectorAll('.tag-copy').forEach((button) => {
  const originalText = button.textContent;
  let resetTimer;

  button.addEventListener('click', () => {
    navigator.clipboard.writeText(button.dataset.code);

    clearTimeout(resetTimer);
    button.textContent = 'Copied!';
    button.classList.add('tag-copy--copied');

    resetTimer = setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('tag-copy--copied');
    }, 1500);
  });
});
