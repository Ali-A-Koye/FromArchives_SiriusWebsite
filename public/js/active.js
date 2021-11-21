/*eslint-disable*/

!(function(e) {
  'use strict';
  var a = e(window);
  a.on('load', function() {
    e('.preloader').fadeOut('slow', function() {
      e(this).remove();
    });
  }),
    e.fn.classyNav && e('#artyNav').classyNav(),
    e.fn.simpleTicker &&
      e.simpleTicker(e('#breakingNewsTicker'), {
        speed: 1e3,
        delay: 3e3,
        easing: 'swing',
        effectType: 'roll'
      }),
    e.fn.sticky && e('#sticker').sticky({ topSpacing: 0 }),
    e.fn.owlCarousel &&
      (e('.twitter-slides').owlCarousel({
        items: 1,
        margin: 0,
        loop: !0,
        dots: !1,
        autoplay: !0,
        autoplayTimeout: 4e3,
        smartSpeed: 1e3
      }),
      e('.featured-post-slides').owlCarousel({
        items: 1,
        margin: 0,
        loop: !0,
        nav: !0,
        navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
        ],
        dots: !1,
        autoplay: !0,
        autoplayTimeout: 4e3,
        smartSpeed: 1e3
      }),
      e('.sport-video-slides').owlCarousel({
        items: 1,
        margin: 0,
        loop: !0,
        nav: !0,
        navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
        ],
        dots: !1,
        autoplay: !0,
        autoplayTimeout: 4e3,
        smartSpeed: 1e3
      }),
      e('.business-video-slides').owlCarousel({
        items: 1,
        margin: 0,
        loop: !0,
        nav: !0,
        navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
        ],
        dots: !1,
        autoplay: !0,
        autoplayTimeout: 4e3,
        smartSpeed: 1e3
      })),
    e.fn.niceScroll &&
      e('.arty-nav-tab').niceScroll({
        cursorcolor: '#838586',
        cursorwidth: '6px',
        cursorborder: 'none'
      }),
    e.fn.scrollUp &&
      a.scrollUp({
        scrollSpeed: 1500,
        scrollText: '<i class="ti-angle-up"></i>'
      }),
    e.fn.tooltip && e('[data-toggle="tooltip"]').tooltip(),
    e.fn.counterUp && e('.counter').counterUp({ delay: 10, time: 3e3 }),
    e('a[href="#"]').on('click', function(e) {
      e.preventDefault();
    }),
    a.width() > 767 && new WOW().init();
})(jQuery);
