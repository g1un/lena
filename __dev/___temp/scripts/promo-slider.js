(function(){
"use strict";
(function(){
    "use strict";
    App.gui.add({
        _name: 'promo-slider',
        selector: '.js-promo-slider ul',
        build: function($el){
            var pagingTitles = ["Куница", "Кисет", "Нашивка<br> на тесьму"];
            var options = {
                arrows: false,
                dots: true,
                customPaging: function(slider, i) {
                    return $('<div class="promo-slider-dot"></div>').html(pagingTitles[i]).get(0).outerHTML;
                },
                autoplay: true,
                autoPlay: 3000
            };

            $el.slick(options);

            var slickDots = $('.slick-dots');
            slickDots.addClass('__slide-0');

            $el.on('beforeChange', function(event, slick, currentSlide, nextSlide){
                slickDots[0].className = slickDots[0].className.replace(/ __slide-.*/g, '');
                slickDots.addClass('__slide-' + nextSlide);
            });

            var dot = $('.promo-slider-dot');

            dot.on('mouseover', function() {
                var slideNum = $('.promo-slider-dot').index(this);
                $el.slick('slickGoTo', slideNum);
                $el.slick('pause');
                var slickDots = $('.slick-dots');
                slickDots[0].className = slickDots[0].className.replace(/ __slide-.*/g, '');
                slickDots.addClass('__slide-' + slideNum);
            });

            dot.on('mouseout', function() {
                $el.slick('play');
            });

            return {
                destroy: function(){
                    $el.slick("unslick");
                }
            }
        },
        destroy: function($el, methods){
            if(methods && typeof methods['destroy'] == 'function') methods['destroy']();
        }
    });
})();
})();