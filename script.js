document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Countdown (Toronto local) ---
  // Set your real launch moment here:
  const DROP_LOCAL_ISO = '2025-11-15T12:00:00'; // YYYY-MM-DDTHH:mm:ss
  const dd = document.getElementById('dd');
  const hh = document.getElementById('hh');
  const mm = document.getElementById('mm');
  const ss = document.getElementById('ss');

  function tick() {
    const now = new Date();
    const target = new Date(DROP_LOCAL_ISO);
    const diffMs = Math.max(0, target - now);
    const totalSec = Math.floor(diffMs / 1000);

    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    dd.textContent = String(d).padStart(2, '0');
    hh.textContent = String(h).padStart(2, '0');
    mm.textContent = String(m).padStart(2, '0');
    ss.textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);

  // --- Transparent → Solid nav on scroll ---
  const nav = document.querySelector('.nav');
  const hero = document.querySelector('.hero');
  if (nav && hero) {
    const io = new IntersectionObserver(
      ([entry]) => nav.classList.toggle('nav-solid', !entry.isIntersecting),
      { rootMargin: '-80px 0px 0px 0px', threshold: 0.01 }
    );
    io.observe(hero);

    // Handle load-at-scroll
    requestAnimationFrame(() => {
      const rect = hero.getBoundingClientRect();
      const atTop = rect.top >= 0 && rect.bottom > 80;
      if (!atTop) nav.classList.add('nav-solid');
    });
  }

  // --- Email form (client-side) ---
  const form = document.getElementById('emailForm');
  const input = document.getElementById('email');
  const msg = document.getElementById('formMessage');
  const SIGNUP_KEY = 'mellow_signup_email';

  // Persist success if already signed
  const saved = localStorage.getItem(SIGNUP_KEY);
  if (saved) {
    msg.textContent = 'You’re on the list — thanks for signing up!';
    msg.classList.add('success');
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = (input?.value || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!valid) {
        msg.textContent = 'Please enter a valid email address.';
        msg.classList.remove('success');
        msg.classList.add('error');
        input?.focus();
        return;
      }

      // Replace this with your ESP call (Mailchimp/Beehiiv/ConvertKit)
      localStorage.setItem(SIGNUP_KEY, val);
      msg.textContent = 'You’re on the list — thanks for signing up!';
      msg.classList.remove('error');
      msg.classList.add('success');
      input.value = '';
    });
  }
});
