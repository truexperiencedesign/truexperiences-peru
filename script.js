// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });
}

// Dropdown menu
const menu = document.querySelector('.menu');
const menuBtn = document.querySelector('.menu-btn');
if (menu && menuBtn) {
  menuBtn.addEventListener('click', () => {
    const showing = menu.classList.toggle('show');
    menuBtn.setAttribute('aria-expanded', String(showing));
  });
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) menu.classList.remove('show');
  });
}

// Elevate header on scroll
const header = document.querySelector('[data-elevate]');
window.addEventListener('scroll', () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (!header) return;
  header.style.boxShadow = y > 8 ? '0 8px 24px rgba(0,0,0,.25)' : 'none';
});

// Dark/light mode toggle
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'light') document.body.classList.remove('dark');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Contact form validation demo
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const errors = [];
    if (!data.name || String(data.name).trim().length < 2) errors.push('Please enter your name.');
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.email))) errors.push('Please enter a valid email.');
    if (!data.message || String(data.message).trim().length < 10) errors.push('Tell us a little more about your trip (10+ chars).');
    if (errors.length) { msg.textContent = errors.join(' '); msg.style.color='salmon'; return; }
    msg.textContent = 'Thanks! We will get back to you shortly.';
    msg.style.color = 'limegreen';
    form.reset();
  });
}
