App.gui.add({
    _name: 'product-gallery',
    selector: '.js-product-gallery',
    build: function($el){
        var destroyer = (function(){
            var list = [];
            var self = function(){ _.each(list, function(handler){ handler(); }); list = undefined; self = undefined; }
            self.add = function(handler){ list.push(handler); }
            return self;
        })();

        var eventNamespace = '.' + App.getUniqKey();

        var preloader = App.createPreloader();
        destroyer.add(function(){ preloader.destroy() });

        var $prevImage;

        var $prev = $('.js-product-gallery-prev');
        var $next = $('.js-product-gallery-next');

        var clickArrowHandler = function(toRight){
            return function(e){
                e.preventDefault();
                setNextCurrent(toRight);
            }
        }
        var $links = $el.find('.js-product-gallery-item');

        var $galleryItems = $links.clone().each(function(){
            $(this).removeAttr('class');
        }).hide().attr('data-gallery', 'productcard').appendTo( $el );
        destroyer.add(function(){
            $galleryItems.remove();
        });


        var $bigImage = $('.js-product-gallery-image');
        $bigImage.on('click' + eventNamespace, function(e){
            e.preventDefault();
            console.log('click')
            console.log( $(this).attr('href') )
            $galleryItems.filter('[href="' + $(this).attr('href') + '"]').trigger('galleryOpen');
        })

        destroyer.add(function(){ $bigImage.off(eventNamespace); })



        $prev.on('click' + eventNamespace, clickArrowHandler(false));
        destroyer.add(function(){ $prev.off(eventNamespace); })

        $next.on('click' + eventNamespace, clickArrowHandler(true));
        destroyer.add(function(){ $next.off(eventNamespace); })

        var getLinks = function(){
            return $el.find('.js-product-gallery-item');
        }

        var $list = $el.find('.js-product-gallery-list');

        var _timeout;

        // if($list.children().length > 4){
        $list.slick({
            vertical: true,
            verticalSwiping: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            infinite: false,
            responsive: [
                {
                    breakpoint: 1025,
                    settings: {
                        vertical: false,
                        verticalSwiping: false,
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        prevArrow: '<button type="button" class="slick-prev"></button>',
                        nextArrow: '<button type="button" class="slick-next"></button>',
                        infinite: false,
                    }
                }
            ]
        });

        destroyer.add(function(){ $list.slick("unslick") });
        destroyer.add(function(){
            if(_timeout){
                clearTimeout(_timeout);
                _timeout = undefined;
            }
        });
        $(window).resize();

        $el.on('productcard-preview-changed' + eventNamespace, '.js-product-gallery-item', function(){
            if(_timeout) clearTimeout(_timeout);
            var $this = $(this);
            _timeout = setTimeout(function(){
                $list.slick("slickGoTo", parseInt($this.attr('data-slick-index')));
                _timeout = undefined;
            }, 300);
        });

        var mediaListener = App.MEDIA.onMax('TABLET', function(){
            var _options = $list.slick("getSlick").options;
            _options.vertical = false;
            _options.verticalSwiping = false;
            _options.initialSlide = $list.slick("slickCurrentSlide");
            $list.slick("unslick").slick(_options);
        }, function(){
            var _options = $list.slick("getSlick").options;
            _options.vertical = true;
            _options.verticalSwiping = true;
            _options.initialSlide = $list.slick("slickCurrentSlide");
            $list.slick("unslick").slick(_options);
        })
        destroyer.add(function(){ mediaListener.remove(); })

        var mediaListener2 = App.MEDIA.onMax('SMALL_PHONE', function(){
            $list.slick("slickSetOption", "slidesToShow", 3);
            $list.slick("slickSetOption", "slidesToScroll", 2, true);
        }, function(){
            $list.slick("slickSetOption", "slidesToShow", 4);
            $list.slick("slickSetOption", "slidesToScroll", 2, true);
        })
        destroyer.add(function(){ mediaListener2.remove(); })
        // }


        var getCurrent = function(){ return $el.find('.js-product-gallery-item.__current'); }


        var setNextCurrent = function(toRight){
            var $current = getCurrent();
            var $next = $current[ toRight ? 'next' : 'prev' ]();
            if(!$next.length){
                $next = (toRight ? getLinks().first() : getLinks().last() );
            }
            setCurrent($next);
        }


        var setCurrent = function($link){
            if($link.hasClass('__current')) return;

            if($prevImage){
                $prevImage.remove();
            }

            getLinks().removeClass('__current');

            $link.addClass('__current');

            var $bigImage = $('.js-product-gallery-image');
            var $newImage = $('<img src="" alt="" />').hide();
            var $oldImages = $bigImage.find('img');

            $prevImage = $newImage;

            preloader.show($bigImage);

            $newImage.one('load', function(){
                $bigImage.removeClass('__loading');
                $(this).fadeIn(300);
                $oldImages.fadeOut(300, function(){
                    $(this).remove();
                });

                preloader.hide();
                $prevImage = undefined;
            })
            $bigImage.addClass('__loading');
            $newImage.appendTo($bigImage).attr('src', $link.attr('href') );
            $bigImage.attr('href', $link.attr('href'));

            $link.trigger('productcard-preview-changed');
        }

        $el.on('click' + eventNamespace, '.js-product-gallery-item', function(e){
            e.preventDefault();
            setCurrent($(this));
        });

        destroyer.add(function(){ $el.off(eventNamespace); })



        return {
            destroy: function(){
                destroyer();
            }
        }
    },
    destroy: function($el, methods){
        if(methods && typeof methods['destroy'] == 'function'){
            methods['destroy']();
        }
    }
});

App.gui.add({
    _name: 'product-tabs',
    selector: '.js-product-options',
    build: function($el){
        var isEnabled = false;
        var enable = function(){
            if(isEnabled) return;
            isEnabled = true;
            $el.find('.js-product-option[data-tab]').each(function(){
                var $tab = $(this);
                var $page = $( $tab.attr('data-tab') );
                if( $tab.data('productcard-movableContent') == null ){ $tab.data('productcard-movableContent', App.movableContent($page)); }
                $tab.data('productcard-movableContent').eject();
                $page.insertAfter($tab);
            });
            $el.find('[data-tab-group]').attr('data-tab-group-collapsible', true);
        }
        var disable = function(){
            if(!isEnabled) return;
            isEnabled = false;
            $el.find('.js-product-option[data-tab]').each(function(){
                var $tab = $(this);
                if( $tab.data('productcard-movableContent') == null ){ return }
                $tab.data('productcard-movableContent').restore();
            });
            $el.find('[data-tab-group]').removeAttr('data-tab-group-collapsible');
        }

        var mediaListener = App.MEDIA.onMax('TABLET', enable, disable);

        return {
            destroy: function(){
                mediaListener.remove();
                disable();
                $el.find('.js-product-option[data-tab]').each(function(){ $(this).removeData('productcard-movableContent'); });
            }
        }
    },
    destroy: function($el, methods){
        if(methods && typeof methods['destroy'] == 'function'){
            methods['destroy']();
        }
    }
})