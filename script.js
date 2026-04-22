// Smooth scroll — handles both #hash and /#hash links when on the home page
document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');

    // For /#hash links, only intercept when already on the home page
    if (href.startsWith('/#') && window.location.pathname !== '/') return;

    const hash = href.startsWith('/#') ? href.slice(1) : href;
    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      target.scrollIntoView();
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    // Update the URL hash without triggering a jump
    history.pushState(null, '', href.startsWith('/#') ? href : `${window.location.pathname}${href}`);
    target.focus({ preventScroll: true });
  });
});

// Shrink header on scroll
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  const onScroll = () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load in case page is already scrolled
}

// Mobile hamburger menu
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');

if (navToggle && mainNav) {
  // Open / close
  const openNav = () => {
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close navigation menu');
    mainNav.setAttribute('aria-hidden', 'false');
    mainNav.classList.add('is-open');
    trapFocus(mainNav);
  };

  const closeNav = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation menu');
    mainNav.setAttribute('aria-hidden', 'true');
    mainNav.classList.remove('is-open');
    releaseFocus();
    navToggle.focus();
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeNav() : openNav();
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      closeNav();
    }
  });

  // Close when a nav link is followed
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeNav());
  });

  // Focus trap
  let trapCleanup = null;

  const trapFocus = (container) => {
    const focusable = container.querySelectorAll(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const handler = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    container.addEventListener('keydown', handler);
    trapCleanup = () => container.removeEventListener('keydown', handler);
  };

  const releaseFocus = () => {
    if (trapCleanup) { trapCleanup(); trapCleanup = null; }
  };

  // On resize to desktop width, reset nav state
  const mq = window.matchMedia('(min-width: 768px)');
  mq.addEventListener('change', e => {
    if (e.matches) {
      mainNav.removeAttribute('aria-hidden');
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      releaseFocus();
    } else {
      if (!mainNav.classList.contains('is-open')) {
        mainNav.setAttribute('aria-hidden', 'true');
      }
    }
  });

  // Set correct initial state on desktop
  if (mq.matches) mainNav.removeAttribute('aria-hidden');
}

// Fade-in on scroll via IntersectionObserver
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.services, .testimonials, .contact, .services__card, .testimonials__quote'
  ).forEach(el => observer.observe(el));
}
