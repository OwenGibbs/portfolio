document.addEventListener("DOMContentLoaded", () => {
  /* Active navbar link */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* Hamburger menu */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("show");
    });
  }

  /* Expandable experience cards */
  document.querySelectorAll(".expand-btn").forEach(button => {
    button.addEventListener("click", () => {
      const selectedCard = button.closest(".experience-card");
      const isOpen = selectedCard.classList.contains("active");

      document.querySelectorAll(".experience-card").forEach(card => {
        card.classList.remove("active");

        const btn = card.querySelector(".expand-btn");
        if (btn) btn.textContent = "View Details";
      });

      if (!isOpen) {
        selectedCard.classList.add("active");
        button.textContent = "Hide Details";
      }
    });
  });

  /* Expandable project cards */
  document.querySelectorAll(".project-expand-btn").forEach(button => {
    button.addEventListener("click", () => {
      const selectedCard = button.closest(".project-card");
      const isOpen = selectedCard.classList.contains("active");

      document.querySelectorAll(".project-card").forEach(card => {
        card.classList.remove("active");

        const btn = card.querySelector(".project-expand-btn");
        if (btn) btn.textContent = "View Details";
      });

      if (!isOpen) {
        selectedCard.classList.add("active");
        button.textContent = "Hide Details";
      }
    });
  });

  /* Image lightbox */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  const lightboxImages = document.querySelectorAll(
    ".publication-image img, .project-gallery img"
  );

  if (lightbox && lightboxImg) {
    lightboxImages.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Fullscreen preview";
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active");
        lightboxImg.src = "";
      });
    }

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        lightbox.classList.remove("active");
        lightboxImg.src = "";
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        lightbox.classList.remove("active");
        lightboxImg.src = "";
      }
    });
  }
});