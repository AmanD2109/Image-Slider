// Select DOM elements
const slidesContainer = document.querySelector('.slides');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');
const totalSlides = slides.length;

let currentIndex = 0;
let autoSlideInterval;
const autoSlideDelay = 3000; 

// Create pagination dots dynamically
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  dot.setAttribute('aria-label', 'Slide ' + (i + 1));
  dot.setAttribute('role', 'button');
  dot.setAttribute('tabindex', 0);
  dot.addEventListener('click', () => goToSlide(i));
  dot.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      goToSlide(i);
    }
  });
  dotsContainer.appendChild(dot);
}
const dots = document.querySelectorAll('.dot');

// Update slide position and active dot
function updateSlider() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Show slide by index
function goToSlide(index) {
  currentIndex = index;
  updateSlider();
  resetAutoSlide();
}

// Show next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}

// Show previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider();
}

// Attach event listeners to buttons
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

// Automatic sliding with reset on manual navigation
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
}

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', () => {
  updateSlider();
  autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
});
