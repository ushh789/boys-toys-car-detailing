const navbarMenu = document.getElementById("menu");
const burgerMenu = document.getElementById("burger");
const headerMenu = document.getElementById("header");
const scrollToTopButton = document.querySelector('.scroll-to-top');

if (burgerMenu && navbarMenu) {
   burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("is-active");
      navbarMenu.classList.toggle("is-active");
   });
}

document.querySelectorAll(".menu-link").forEach((link) => {
   link.addEventListener("click", () => {
      burgerMenu.classList.remove("is-active");
      navbarMenu.classList.remove("is-active");
   });
});

window.addEventListener("scroll", () => {
   if (window.scrollY >= 85) {
      headerMenu.classList.add("on-scroll");
   } else {
      headerMenu.classList.remove("on-scroll");
   }
});

window.addEventListener("resize", () => {
   if (window.innerWidth > 768) {
      if (navbarMenu.classList.contains("is-active")) {
         navbarMenu.classList.remove("is-active");
      }
   }
});

let currentParallaxOffset = 0;

function updateParallax() {
    const scrollPosition = window.scrollY;
    currentParallaxOffset = scrollPosition * 0.8;
    const activeImage = document.querySelector(".banner-image.active");
    if (activeImage) {
        activeImage.style.transform = `translateY(${currentParallaxOffset}px)`;
    }
}

document.addEventListener("scroll", updateParallax);

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        scrollToTopButton.classList.add('visible');
        scrollToTopButton.classList.remove('hidden');
    } else {
        scrollToTopButton.classList.add('hidden');
        scrollToTopButton.classList.remove('visible');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const images = document.querySelectorAll('.banner-image');
let currentIndex = 0;

function changeImage() {
    const oldImage = images[currentIndex];
    oldImage.classList.remove('active');
    
    currentIndex = (currentIndex + 1) % images.length;
    
    const newImage = images[currentIndex];
    newImage.classList.add('active');
    
    newImage.style.transform = `translateY(${currentParallaxOffset}px)`;
}

setInterval(changeImage, 5000);
