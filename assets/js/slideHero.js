function toggleMenu() {
    document.getElementById('menu').classList.toggle('active');
}

let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const container = document.getElementById('carousel-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() { showSlide(currentIndex + 1); }
function prevSlide() { showSlide(currentIndex - 1); }

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
setInterval(nextSlide, 6500);