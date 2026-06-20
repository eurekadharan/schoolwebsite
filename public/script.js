const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const modal = document.querySelector("#admission-modal");
const modalClose = document.querySelector(".modal-close");
const featureButtons = document.querySelectorAll(".feature-card button");
const galleryImages = document.querySelectorAll(".gallery-track img");
const galleryPrev = document.querySelector(".gallery-control.prev");
const galleryNext = document.querySelector(".gallery-control.next");
const forms = document.querySelectorAll("form[data-form-message]");
const scrollTop = document.querySelector(".scroll-top");

function closeMenu() {
  navMenu?.classList.remove("open");
  body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

dropdownToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const dropdown = button.closest(".nav-dropdown");
    const isOpen = dropdown.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

function openModal() {
  if (!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
}

window.addEventListener("load", () => {
  setTimeout(openModal, 700);
});

modalClose?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeModal();
  }
});

featureButtons.forEach((button) => {
  button.addEventListener("click", () => {
    featureButtons.forEach((other) => {
      const card = other.closest(".feature-card");
      const expanded = other === button;
      card.classList.toggle("expanded", expanded);
      other.setAttribute("aria-expanded", String(expanded));
    });
  });
});

let galleryIndex = 0;

function showGalleryImage(nextIndex) {
  if (!galleryImages.length) return;
  galleryImages[galleryIndex].classList.remove("active");
  galleryIndex = (nextIndex + galleryImages.length) % galleryImages.length;
  galleryImages[galleryIndex].classList.add("active");
}

galleryPrev?.addEventListener("click", () => showGalleryImage(galleryIndex - 1));
galleryNext?.addEventListener("click", () => showGalleryImage(galleryIndex + 1));

setInterval(() => showGalleryImage(galleryIndex + 1), 6500);

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (status) status.textContent = form.dataset.formMessage;
    form.reset();
  });
});

scrollTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
