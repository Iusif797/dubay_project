document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav__item--dropdown")) {
      document.querySelectorAll(".dropdown").forEach((dropdown) => {
        dropdown.style.opacity = "0";
        dropdown.style.visibility = "hidden";
      });
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  console.log("DubaiRealty website loaded successfully!");
});

class ExpertiseSlider {
  constructor() {
    this.slider = document.querySelector(".expertise__slider");
    if (!this.slider) return;

    this.slides = document.querySelectorAll(".expertise__slide");
    this.dots = document.querySelectorAll(".expertise__dot");
    this.currentSlide = 0;
    this.autoPlayInterval = null;

    this.init();
  }

  init() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    this.startAutoPlay();
  }

  goToSlide(index) {
    this.slides[this.currentSlide].classList.remove("expertise__slide--active");
    this.dots[this.currentSlide].classList.remove("expertise__dot--active");

    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add("expertise__slide--active");
    this.dots[this.currentSlide].classList.add("expertise__dot--active");
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(next);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ExpertiseSlider();
});

// Видео модальное окно
class VideoModal {
  constructor() {
    this.playButton = document.querySelector(".video-section__play");
    this.modal = document.getElementById("videoModal");

    if (!this.playButton || !this.modal) return;

    this.overlay = this.modal.querySelector(".video-modal__overlay");
    this.closeButton = this.modal.querySelector(".video-modal__close");
    this.iframe = this.modal.querySelector(".video-modal__iframe");

    // URL вашего видео (замените на реальный)
    this.videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

    this.init();
  }

  init() {
    this.playButton.addEventListener("click", () => this.open());

    this.overlay.addEventListener("click", () => this.close());

    this.closeButton.addEventListener("click", () => this.close());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("is-active")) {
        this.close();
      }
    });
  }

  open() {
    this.modal.classList.add("is-active");
    this.iframe.src = this.videoUrl;
    document.body.style.overflow = "hidden";
  }

  close() {
    this.modal.classList.remove("is-active");
    this.iframe.src = "";
    document.body.style.overflow = "";
  }
}

class TestimonialsSlider {
  constructor() {
    this.slider = document.querySelector(".testimonials__slider");
    if (!this.slider) return;

    this.slidesContainer = this.slider.querySelector(".testimonials__slides");
    this.slides = document.querySelectorAll(".testimonials__slide");
    this.indicators = document.querySelectorAll(".testimonials__indicator");
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    this.slidesContainer.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    });

    this.slidesContainer.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    this.startAutoPlay();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.resetAutoPlay();
    }
  }

  goToSlide(index) {
    this.indicators[this.currentSlide].classList.remove("testimonials__indicator--active");
    
    this.currentSlide = index;
    const offset = -index * 100;
    this.slidesContainer.style.transform = `translateX(${offset}%)`;
    
    this.indicators[this.currentSlide].classList.add("testimonials__indicator--active");
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(next);
  }

  prevSlide() {
    const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prev);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
}

class MobileMenu {
  constructor() {
    this.burger = document.querySelector(".header__burger");
    this.nav = document.querySelector(".header__nav");
    this.overlay = document.querySelector(".header__overlay");
    this.body = document.body;

    if (!this.burger || !this.nav || !this.overlay) return;

    this.dropdowns = document.querySelectorAll(".nav__item--dropdown");
    
    this.init();
  }

  init() {
    this.burger.addEventListener("click", () => this.toggle());
    this.overlay.addEventListener("click", () => this.close());

    this.dropdowns.forEach(dropdown => {
      const link = dropdown.querySelector(".header__link");
      const dropdownMenu = dropdown.querySelector(".dropdown");
      
      if (link && dropdownMenu) {
        link.addEventListener("click", (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle("is-active");
            dropdownMenu.classList.toggle("is-active");
          }
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.nav.classList.contains("is-active")) {
        this.close();
      }
    });
  }

  toggle() {
    const isActive = this.nav.classList.contains("is-active");
    
    if (isActive) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.burger.classList.add("is-active");
    this.nav.classList.add("is-active");
    this.overlay.classList.add("is-active");
    this.body.style.overflow = "hidden";
  }

  close() {
    this.burger.classList.remove("is-active");
    this.nav.classList.remove("is-active");
    this.overlay.classList.remove("is-active");
    this.body.style.overflow = "";
    
    this.dropdowns.forEach(dropdown => {
      dropdown.classList.remove("is-active");
      const dropdownMenu = dropdown.querySelector(".dropdown");
      if (dropdownMenu) {
        dropdownMenu.classList.remove("is-active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ExpertiseSlider();
  new VideoModal();
  new TestimonialsSlider();
  new MobileMenu();
});
