/* DIS Group — Website Script */

/* ── Nav shadow on scroll ── */
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('shadowed', window.scrollY > 4);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── Mobile burger ── */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Animated counters ── */
function runCounter(el) {
  const target = +el.dataset.target;
  const dur    = 1400;
  const start  = performance.now();
  const orig   = el.textContent;
  el.textContent = '0';
  const tick = now => {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(e * target);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = orig;
  };
  requestAnimationFrame(tick);
}

const counterEls = document.querySelectorAll('.stat-num[data-target]');
if (counterEls.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { runCounter(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) runCounter(el);
    else io.observe(el);
  });
}

/* ── Contact form ── */
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successEl = document.getElementById('form-success');

if (form && submitBtn && successEl) {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const nameEl  = form.querySelector('[name="name"]');
    const emailEl = form.querySelector('[name="email"]');
    let valid = true;

    [nameEl, emailEl].forEach(f => {
      f.style.borderColor = '';
      if (!f.value.trim()) {
        f.style.borderColor = '#e53935';
        f.addEventListener('input', () => { f.style.borderColor = ''; }, { once: true });
        valid = false;
      }
    });
    if (!valid) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    await new Promise(r => setTimeout(r, 900));

    form.style.display = 'none';
    successEl.style.display = 'block';
  });
}
