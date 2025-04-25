document.addEventListener('DOMContentLoaded', () => {
  const heartIntro = document.querySelector('.heart-intro');
  const container = document.querySelector('.container');

  // Xóa phần setTimeout vì hiệu ứng mờ và hiện đã được xử lý bằng CSS
  // setTimeout(() => {
  //     heartIntro.classList.add('fade-out');
  //     container.classList.add('fade-in');
  // }, 2000);

  // Smooth scrolling for better user experience
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Falling Hearts Effect
  function createFallingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '♥';

    // Random horizontal position
    heart.style.left = Math.random() * 100 + 'vw';

    // Random animation duration between 3s and 6s
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';

    // Random size between 1rem and 2rem
    heart.style.fontSize = Math.random() * 1 + 1 + 'rem';

    // Add to container
    document.querySelector('.hearts-container').appendChild(heart);

    // Remove heart after animation ends
    heart.addEventListener('animationend', () => {
      heart.remove();
    });
  }

  // Create a new heart every 500ms
  setInterval(createFallingHeart, 500);

  // Carousel Functionality
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active');
      if (i === index) {
        slide.classList.add('active');
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Auto slide every 4 seconds
  let autoSlideInterval = setInterval(nextSlide, 4000);

  // Navigation button event listeners
  document.querySelector('.next-btn').addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Stop auto slide on manual interaction
    nextSlide();
    autoSlideInterval = setInterval(nextSlide, 4000); // Restart auto slide
  });

  document.querySelector('.prev-btn').addEventListener('click', () => {
    clearInterval(autoSlideInterval); // Stop auto slide on manual interaction
    prevSlide();
    autoSlideInterval = setInterval(nextSlide, 4000); // Restart auto slide
  });

  // Countdown Timer
  function startCountdown() {
    const weddingDate = new Date('2025-07-13T11:00:00').getTime();

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      // Calculate days, hours, minutes, seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the DOM
      document.getElementById('days').textContent = days.toString().padStart(2, '0');
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

      // If the countdown is over, stop the timer
      if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
      }
    }, 1000);
  }

  // Start the countdown
  startCountdown();
});