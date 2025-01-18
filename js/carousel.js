$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: -25,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1 
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            }
        }
    });
  });