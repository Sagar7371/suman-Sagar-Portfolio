// =========================================================
// Theme toggle (persists via localStorage)
// =========================================================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

(function initTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }
})();

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// =========================================================
// Mobile nav toggle
// =========================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// =========================================================
// Scroll progress bar
// =========================================================
const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = percent + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

// =========================================================
// Reveal-on-scroll animations
// =========================================================
const revealTargets = document.querySelectorAll(
  '.section-heading, .about-text, .edu-item, .timeline-item, .skill-group, .project-card, .achieve-card, .cert-item, .contact-grid > *'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => observer.observe(el));

// =========================================================
// Active nav link highlighting
// =========================================================
const sections = document.querySelectorAll('main .section, .hero');
const navAnchors = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      navAnchors.forEach(a => {
        a.classList.toggle(
          'active',
          a.getAttribute('href') === '#' + id
        );
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));

// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Contact form (Formspree-ready)
// Replace the form's action URL in index.html with your own
// Formspree endpoint: https://formspree.io/f/YOUR_FORM_ID
// =========================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const action = contactForm.getAttribute('action');

    if (!action || action.includes('YOUR_FORM_ID')) {
      formStatus.textContent =
        'Form endpoint not configured yet — see README.md to connect Formspree or EmailJS.';
      formStatus.className = 'form-status error';
      return;
    }

    formStatus.textContent = 'Sending…';
    formStatus.className = 'form-status';

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formStatus.textContent =
          'Message sent — thank you! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        formStatus.textContent =
          'Something went wrong. Please try emailing me directly.';
        formStatus.className = 'form-status error';
      }
    } catch (err) {
      formStatus.textContent =
        'Network error. Please try emailing me directly.';
      formStatus.className = 'form-status error';
    }
  });
}