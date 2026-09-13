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

  /* Lightbox elements */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeButton = document.querySelector(".lightbox-close");
  const previousButton = document.querySelector(".lightbox-prev");
  const nextButton = document.querySelector(".lightbox-next");

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

  function updateLightboxArrows() {
    const hasMultipleImages = currentGallery.length > 1;

    if (previousButton) {
      previousButton.style.display = hasMultipleImages
        ? "block"
        : "none";
    }

    if (nextButton) {
      nextButton.style.display = hasMultipleImages
        ? "block"
        : "none";
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
    ".home-collage img, " +
    ".about-image img"
  );

  clickableImages.forEach(image => {
    image.addEventListener("click", () => {
      const projectGallery = image.closest(".project-gallery");
      const homeCollage = image.closest(".home-collage");
      const aboutCarousel = image.closest(".about-carousel");

      if (projectGallery) {
        openLightbox(
          projectGallery.querySelectorAll("img"),
          image
        );
      } else if (homeCollage) {
        openLightbox(
          homeCollage.querySelectorAll("img"),
          image
        );
      } else if (aboutCarousel) {
        openLightbox(
          aboutCarousel.querySelectorAll("img"),
          image
        );
      } else {
        openLightbox([image], image);
      }
    });
  });

  /* Equal-sized collage grid */
  const viewAllButton = document.querySelector(".collage-view-all");
  const collageGallery = document.getElementById("collageGallery");
  const collageGalleryGrid =
    document.getElementById("collageGalleryGrid");
  const closeCollageGallery =
    document.getElementById("closeCollageGallery");

  function openCollageGrid() {
    if (!collageGallery || !collageGalleryGrid) {
      return;
    }

    const collageImages = Array.from(
      document.querySelectorAll(".home-collage img")
    );

    collageGalleryGrid.innerHTML = "";

    collageImages.forEach(originalImage => {
      const imageButton = document.createElement("button");

      imageButton.className = "collage-gallery-item";
      imageButton.type = "button";
      imageButton.setAttribute(
        "aria-label",
        `Zoom in on ${originalImage.alt}`
      );

      const imageCopy = originalImage.cloneNode(true);

      imageButton.appendChild(imageCopy);
      collageGalleryGrid.appendChild(imageButton);

      imageButton.addEventListener("click", () => {
        collageGallery.classList.remove("active");
        openLightbox(collageImages, originalImage);
      });
    });

    collageGallery.classList.add("active");
  }

  if (viewAllButton) {
    viewAllButton.addEventListener("click", openCollageGrid);
  }

  if (closeCollageGallery) {
    closeCollageGallery.addEventListener("click", () => {
      collageGallery.classList.remove("active");
    });
  }

  if (collageGallery) {
    collageGallery.addEventListener("click", event => {
      if (event.target === collageGallery) {
        collageGallery.classList.remove("active");
      }
    });
  }

  /* Lightbox buttons */
  if (previousButton) {
    previousButton.addEventListener("click", showPreviousImage);
  }

  if (nextButton) {
    nextButton.addEventListener("click", showNextImage);
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
  }

  /* Close lightbox when clicking outside image */
  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  /* Keyboard controls */
  document.addEventListener("keydown", event => {
    if (lightbox && lightbox.classList.contains("active")) {
      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }

      if (event.key === "Escape") {
        closeLightbox();
      }
    }

    if (
      collageGallery &&
      collageGallery.classList.contains("active") &&
      event.key === "Escape"
    ) {
      collageGallery.classList.remove("active");
    }
  });
});