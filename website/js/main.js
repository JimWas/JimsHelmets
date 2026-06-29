// Lightbox
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img alt="">';
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  lightboxImg.src = "";
}

lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) closeLightbox();
});

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

document.querySelectorAll(".photo-grid img, .photo-frame img").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.src, img.alt));
});

const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("active");
  }
});

// Newsletter toast popup
const toast = document.createElement('div');
toast.className = 'subscribe-toast';
toast.setAttribute('role', 'status');
toast.setAttribute('aria-live', 'polite');
toast.innerHTML = '<span class="subscribe-toast-icon"></span><span class="subscribe-toast-msg"></span><button class="subscribe-toast-close" aria-label="Dismiss">&times;</button>';
document.body.appendChild(toast);

const toastIcon = toast.querySelector('.subscribe-toast-icon');
const toastMsg  = toast.querySelector('.subscribe-toast-msg');
const toastClose = toast.querySelector('.subscribe-toast-close');
let toastTimer;

function showToast(type, message) {
  clearTimeout(toastTimer);
  toast.className = 'subscribe-toast ' + type;
  toastIcon.textContent = type === 'success' ? '✓' : '⚠';
  toastMsg.textContent = message;
  toast.classList.add('visible');
  if (type === 'success') {
    toastTimer = setTimeout(() => toast.classList.remove('visible'), 6000);
  }
}

toastClose.addEventListener('click', () => {
  clearTimeout(toastTimer);
  toast.classList.remove('visible');
});

// Newsletter signup
document.querySelectorAll('[data-subscribe]').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn   = form.querySelector('button');
    btn.disabled = true;
    btn.textContent = 'Subscribing…';
    try {
      const res  = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: input.value }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        form.reset();
        showToast('success', "You're subscribed — thank you! We'll send campaign updates only.");
      } else {
        showToast('error', data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      showToast('error', 'Could not reach the server. Check your connection and try again.');
    }
    btn.disabled = false;
    btn.textContent = 'Subscribe';
  });
});

const slider = document.querySelector("[data-impact-slider]");
const helmetCount = document.querySelector("[data-helmet-count]");
const childrenProtected = document.querySelector("[data-children-protected]");
const deathsPrevented = document.querySelector("[data-deaths-prevented]");
const injuriesPrevented = document.querySelector("[data-injuries-prevented]");
const economicValue = document.querySelector("[data-economic-value]");

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function updateImpact(value) {
  const helmets = Number(value);
  const deaths = helmets * 0.015;
  const injuries = helmets * 0.045;
  const valueUsd = helmets * 1250;

  if (helmetCount) helmetCount.textContent = formatNumber(helmets);
  if (childrenProtected) childrenProtected.textContent = formatNumber(helmets);
  if (deathsPrevented) deathsPrevented.textContent = deaths.toFixed(1);
  if (injuriesPrevented) injuriesPrevented.textContent = injuries.toFixed(1);
  if (economicValue) {
    economicValue.textContent = `$${formatNumber(valueUsd)}`;
  }
}

if (slider) {
  updateImpact(slider.value);
  slider.addEventListener("input", (event) => updateImpact(event.target.value));
}
