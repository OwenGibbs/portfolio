document.addEventListener("DOMContentLoaded", () => {
  /* Active navbar link */
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

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

        const cardButton = card.querySelector(".expand-btn");

        if (cardButton) {
          cardButton.textContent = "View Details";
        }
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

        const cardButton = card.querySelector(".project-expand-btn");

        if (cardButton) {
          cardButton.textContent = "View Details";
        }
      });

      if (!isOpen) {
        selectedCard.classList.add("active");
        button.textContent = "Hide Details";
      }
    });
  });

  /* About page carousel */
  document.querySelectorAll(".about-carousel").forEach(carousel => {
    const images = carousel.querySelectorAll(".carousel-image");
    const previousButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");

    if (!images.length || !previousButton || !nextButton) {
      return;
    }

    let currentImage = 0;

    function showCarouselImage(index) {
      images[currentImage].classList.remove("active");

      currentImage = (index + images.length) % images.length;

      images[currentImage].classList.add("active");
    }

    previousButton.addEventListener("click", () => {
      showCarouselImage(currentImage - 1);
    });

    nextButton.addEventListener("click", () => {
      showCarouselImage(currentImage + 1);
    });
  });

  /* Lightbox */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");
  const previousBtn = document.querySelector(".lightbox-prev");
  const nextBtn = document.querySelector(".lightbox-next");

  let currentGallery = [];
  let currentImageIndex = 0;

  function displayLightboxImage() {
    if (!currentGallery.length || !lightboxImg) {
      return;
    }

    const image = currentGallery[currentImageIndex];

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt || "Fullscreen preview";
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) {
      return;
    }

    lightbox.classList.remove("active");
    lightboxImg.src = "";

    currentGallery = [];
    currentImageIndex = 0;
  }

  function showPreviousLightboxImage() {
    if (currentGallery.length <= 1) {
      return;
    }

    currentImageIndex =
      (currentImageIndex - 1 + currentGallery.length) %
      currentGallery.length;

    displayLightboxImage();
  }

  function showNextLightboxImage() {
    if (currentGallery.length <= 1) {
      return;
    }

    currentImageIndex =
      (currentImageIndex + 1) % currentGallery.length;

    displayLightboxImage();
  }

  const lightboxImages = document.querySelectorAll(
    ".publication-image img, .project-gallery img"
  );

  if (lightbox && lightboxImg) {
    lightboxImages.forEach(image => {
      image.addEventListener("click", () => {
        const projectGallery = image.closest(".project-gallery");
        const aboutCarousel = image.closest(".about-carousel");

        if (projectGallery) {
          currentGallery = Array.from(
            projectGallery.querySelectorAll("img")
          );
        } else if (aboutCarousel) {
          currentGallery = Array.from(
            aboutCarousel.querySelectorAll("img")
          );
        } else {
          currentGallery = [image];
        }

        currentImageIndex = currentGallery.indexOf(image);

        lightbox.classList.add("active");
        displayLightboxImage();

        const hasMultipleImages = currentGallery.length > 1;

        if (previousBtn) {
          previousBtn.style.display = hasMultipleImages ? "block" : "none";
        }

        if (nextBtn) {
          nextBtn.style.display = hasMultipleImages ? "block" : "none";
        }
      });
    });

    if (previousBtn) {
      previousBtn.addEventListener("click", showPreviousLightboxImage);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", showNextLightboxImage);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", event => {
      if (!lightbox.classList.contains("active")) {
        return;
      }

      if (event.key === "ArrowLeft") {
        showPreviousLightboxImage();
      }

      if (event.key === "ArrowRight") {
        showNextLightboxImage();
      }

      if (event.key === "Escape") {
        closeLightbox();
      }
    });
  }
});