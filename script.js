document.addEventListener("DOMContentLoaded", () => {
  /* Active navigation link */
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* Mobile navigation */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("show");
    });
  }

  /* Experience cards */
  document.querySelectorAll(".expand-btn").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".experience-card");
      const isOpen = card.classList.contains("active");

      document.querySelectorAll(".experience-card").forEach(item => {
        item.classList.remove("active");

        const itemButton = item.querySelector(".expand-btn");

        if (itemButton) {
          itemButton.textContent = "View Details";
        }
      });

      if (!isOpen) {
        card.classList.add("active");
        button.textContent = "Hide Details";
      }
    });
  });

  /* Project cards */
  document.querySelectorAll(".project-expand-btn").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".project-card");
      const isOpen = card.classList.contains("active");

      document.querySelectorAll(".project-card").forEach(item => {
        item.classList.remove("active");

        const itemButton = item.querySelector(".project-expand-btn");

        if (itemButton) {
          itemButton.textContent = "View Details";
        }
      });

      if (!isOpen) {
        card.classList.add("active");
        button.textContent = "Hide Details";
      }
    });
  });

  /* About carousel */
  document.querySelectorAll(".about-carousel").forEach(carousel => {
    const images = carousel.querySelectorAll(".carousel-image");
    const previousButton = carousel.querySelector(".carousel-prev");
    const nextButton = carousel.querySelector(".carousel-next");

    if (!images.length) {
      return;
    }

    let currentImage = 0;

    function showCarouselImage(index) {
      images[currentImage].classList.remove("active");

      currentImage = (index + images.length) % images.length;

      images[currentImage].classList.add("active");
    }

    if (previousButton) {
      previousButton.addEventListener("click", () => {
        showCarouselImage(currentImage - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        showCarouselImage(currentImage + 1);
      });
    }
  });

  /* Lightbox */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeButton = document.querySelector(".lightbox-close");
  const previousButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

  let currentGallery = [];
  let currentImageIndex = 0;

  function displayLightboxImage() {
    if (!lightboxImg || !currentGallery.length) {
      return;
    }

    const image = currentGallery[currentImageIndex];

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt || "Fullscreen preview";
  }

  function updateLightboxArrows() {
    const multipleImages = currentGallery.length > 1;

    if (previousButton) {
      previousButton.style.display = multipleImages ? "block" : "none";
    }

    if (nextButton) {
      nextButton.style.display = multipleImages ? "block" : "none";
    }
  }

  function openLightbox(images, selectedImage) {
    if (!lightbox || !lightboxImg) {
      return;
    }

    currentGallery = Array.from(images);
    currentImageIndex = currentGallery.indexOf(selectedImage);

    if (currentImageIndex < 0) {
      currentImageIndex = 0;
    }

    lightbox.classList.add("active");

    displayLightboxImage();
    updateLightboxArrows();
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

  function showPreviousImage() {
    if (currentGallery.length <= 1) {
      return;
    }

    currentImageIndex =
      (currentImageIndex - 1 + currentGallery.length) %
      currentGallery.length;

    displayLightboxImage();
  }

  function showNextImage() {
    if (currentGallery.length <= 1) {
      return;
    }

    currentImageIndex =
      (currentImageIndex + 1) % currentGallery.length;

    displayLightboxImage();
  }

  /* Clickable images */
  const clickableImages = document.querySelectorAll(
    ".publication-image img, " +
    ".project-gallery img, " +
    ".about-image img"
  );

  clickableImages.forEach(image => {
    image.addEventListener("click", () => {
      const gallery = image.closest(
        ".project-gallery, .about-carousel"
      );

      if (gallery) {
        openLightbox(gallery.querySelectorAll("img"), image);
      } else {
        openLightbox([image], image);
      }
    });
  });

  /* Lightbox controls */
  if (previousButton) {
    previousButton.addEventListener("click", showPreviousImage);
  }

  if (nextButton) {
    nextButton.addEventListener("click", showNextImage);
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  /* Keyboard controls */
  document.addEventListener("keydown", event => {
    if (!lightbox || !lightbox.classList.contains("active")) {
      return;
    }

    if (event.key === "ArrowLeft") {
      showPreviousImage();
    }

    if (event.key === "ArrowRight") {
      showNextImage();
    }

    if (event.key === "Escape") {
      closeLightbox();
    }
  });
});