// Respect users who've asked for less motion.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth reveal for the sections/projects — one quiet entrance, not a repeat effect per scroll.
const items = document.querySelectorAll('.section, .project');

if (prefersReducedMotion) {
  items.forEach(item => item.classList.add('show'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  items.forEach(item => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}

// Navbar gains a hairline + slightly darker fill once the page has scrolled past the hero,
// so it reads as "docked" instead of floating over content.
const navbar = document.querySelector('.navbar');

if (navbar) {
  const setScrolledState = () => {
    navbar.style.borderBottomColor = window.scrollY > 40
      ? 'rgba(255,255,255,.08)'
      : 'transparent';
  };
  setScrolledState();
  window.addEventListener('scroll', setScrolledState, { passive: true });
}