import EmblaCarousel from 'embla-carousel';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';
import '../css/style.css';
import '../css/responsive.css';

/*====================================*/
/* Mobile nav toggle */
/*====================================*/
const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('nav-open');
    });
    // Close on nav link click
    navbar.querySelectorAll('.navbar-links a').forEach((link) => {
        link.addEventListener('click', () => navbar.classList.remove('nav-open'));
    });
}

/*====================================*/
/* Gallery carousel */
/*====================================*/
const emblaNode = document.querySelector('#gallery-carousel');
if (emblaNode) {
    EmblaCarousel(emblaNode, {
        loop: true,
        align: 'start',
        slidesToScroll: 1,
        dragFree: true
    });
}

/*====================================*/
/* Lightbox */
/*====================================*/
GLightbox({
    selector: '#gallery-carousel a',
    touchNavigation: true,
    loop: true
});
