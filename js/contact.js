const blocks = document.querySelectorAll('.animated-block');
const options = {
    root: null,
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            blocks.forEach((block, index) => {
                setTimeout(() => {
                    block.classList.add('show');
                }, index * 500); 
            });
            observer.disconnect();
        }
    });
}, options);

const section = document.querySelector('#contact-info');
observer.observe(section);
