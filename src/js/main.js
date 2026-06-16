import EmblaCarousel from 'embla-carousel';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';
import '../css/style.css';
import '../css/responsive.css';

/*====================================*/
/* Scroll animations */
/*====================================*/
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll('.animate').forEach((el) => observer.observe(el));

/*====================================*/
/* Gallery carousel */
/*====================================*/
const emblaNode = document.querySelector('#gallery-carousel');
if (emblaNode) {
    EmblaCarousel(emblaNode, {
        loop: true,
        align: 'start',
        slidesToScroll: 1
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
