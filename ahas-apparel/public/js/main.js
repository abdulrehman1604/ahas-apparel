// Ahas Apparel — front-end interactions.
// Vanilla JS: mobile nav, scroll-reveal animation, hero image slider, form submission via fetch.

document.addEventListener('DOMContentLoaded', () => {
  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  const iconOpen = document.getElementById('navIconOpen');
  const iconClose = document.getElementById('navIconClose');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isHidden = mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden');
      mobileNav.classList.toggle('flex');
      if (iconOpen && iconClose) {
        iconOpen.classList.toggle('hidden', isHidden);
        iconClose.classList.toggle('hidden', !isHidden);
      }
    });
  }

  // ---- Scroll-reveal animation (fade + rise as elements enter viewport) ----
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in-view'));
  }

  // ---- Hero background slider ----
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('opacity-100');
      slides[current].classList.add('opacity-0');
      current = (current + 1) % slides.length;
      slides[current].classList.remove('opacity-0');
      slides[current].classList.add('opacity-100');
    }, 4500);
  }

  // ---- Pre-select product line on sample-request page via ?category= ----
  const subSelect = document.getElementById('subcategory');
  if (subSelect) {
    const params = new URLSearchParams(window.location.search);
    const preselect = params.get('category');
    if (preselect) subSelect.value = preselect;
  }

  // ---- Generic form-to-API wiring ----
  wireForm('contactForm', '/api/contact', 'contactStatus');
  wireForm('sampleForm', '/api/sample-request', 'sampleStatus');

  function wireForm(formId, endpoint, statusId) {
    const form = document.getElementById(formId);
    const status = document.getElementById(statusId);
    if (!form || !status) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
      status.className = 'mt-4 px-4 py-3 rounded-sm text-sm hidden';
      status.textContent = '';

      const data = Object.fromEntries(new FormData(form).entries());

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();

        if (res.ok && result.ok) {
          status.textContent = result.message || 'Thanks — we received your request.';
          status.className = 'mt-4 px-4 py-3 rounded-sm text-sm block bg-green-50 text-green-800 border border-green-200';
          form.reset();
        } else {
          status.textContent = result.error || 'Something went wrong. Please try again.';
          status.className = 'mt-4 px-4 py-3 rounded-sm text-sm block bg-orange-light text-orange-deep border border-orange/30';
        }
      } catch (err) {
        status.textContent = 'Network error — please check your connection and try again.';
        status.className = 'mt-4 px-4 py-3 rounded-sm text-sm block bg-orange-light text-orange-deep border border-orange/30';
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
      }
    });
  }
});
