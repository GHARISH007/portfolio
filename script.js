// ================================================
//   HARISH PORTFOLIO — Interactive JavaScript
// ================================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});
// Close menu on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Active nav link on scroll ---
const sections  = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link');
const observer  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => observer.observe(s));

// Active nav style
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--text) !important; background: var(--bg-card) !important; }`;
document.head.appendChild(style);

// --- Typewriter Effect ---
const roles = [
  '.NET Developer',
  'ASP.NET Core Engineer',
  'Backend Architect',
  'Microservices Builder',
  'API Developer',
  'C# Enthusiast',
];
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typewrite() {
  const current = roles[roleIdx];
  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIdx--);
  } else {
    typeEl.textContent = current.substring(0, charIdx++);
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIdx > current.length) {
    isDeleting = true;
    delay = 1800; // pause at end
  } else if (isDeleting && charIdx < 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typewrite, delay);
}
typewrite();

// --- Scroll Reveal Animation ---
const revealEls = document.querySelectorAll(
  '.section-header, .about-grid, .about-highlights .highlight-item, ' +
  '.profile-card, .timeline-card, .skill-category-card, ' +
  '.project-card, .ai-card, .contact-card, .hero-content, .hero-visual'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 60 * (i % 6));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// --- Code Card tilt effect ---
const codeCard = document.getElementById('codeCard');
if (codeCard) {
  const heroVisual = codeCard.closest('.hero-visual');
  if (heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
      codeCard.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      codeCard.style.transform = '';
    });
  }
}

// --- Skill tag ripple ---
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', (e) => {
    const ripple = document.createElement('span');
    const rect = tag.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute; border-radius:50%;
      width:120px; height:120px;
      left:${e.clientX - rect.left - 60}px;
      top:${e.clientY - rect.top - 60}px;
      background: rgba(255,255,255,0.25);
      animation: rippleAnim 0.55s ease-out forwards;
      pointer-events: none;
    `;
    tag.style.position = 'relative';
    tag.style.overflow = 'hidden';
    tag.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleAnim { from { transform: scale(0); opacity:1; } to { transform: scale(1.5); opacity:0; } }`;
document.head.appendChild(rippleStyle);

// --- Smooth scroll for all anchor links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- AI Cards: dynamic glow on mousemove ---
document.querySelectorAll('.ai-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.ai-card-glow');
    if (glow) {
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, hsl(215 90% 60% / 0.18), transparent 55%)`;
    }
  });
});

// --- Project card cursor glow ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const glow = card.querySelector('.project-glow');
    if (glow) {
      glow.style.cssText = `
        position:absolute;
        top:${y - 125}px; left:${x - 125}px;
        width:250px; height:250px;
        background: radial-gradient(circle, hsl(215 90% 60% / 0.14), transparent 70%);
        pointer-events:none;
        opacity:1;
        transition: opacity 0.3s;
      `;
    }
  });
  card.addEventListener('mouseleave', () => {
    const glow = card.querySelector('.project-glow');
    if (glow) glow.style.opacity = '0';
  });
});

// --- Counting animation for stats ---
function animateCount(el, target, suffix = '') {
  let start = 0;
  const step = target < 10 ? 1 : Math.ceil(target / 40);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start + suffix;
    if (start >= target) clearInterval(timer);
  }, 40);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-number');
      nums.forEach(num => {
        const text = num.textContent;
        const val = parseInt(text);
        const suffix = text.replace(/\d/g, '');
        animateCount(num, val, suffix);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// --- Loading complete log ---
console.log('%c🚀 Harish — .NET Developer Portfolio', 'color:#4da6ff;font-size:1.2rem;font-weight:700;');
console.log('%cBuilt with ❤️ using HTML, CSS & JavaScript', 'color:#aaa;font-size:0.9rem;');
