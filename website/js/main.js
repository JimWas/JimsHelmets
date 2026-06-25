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
