
const observerOptions = {
    root: null,
    threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

const targetElement = document.querySelector('.our-story-content');
if (targetElement) {
    observer.observe(targetElement);
}
