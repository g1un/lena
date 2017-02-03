App.run(function() {
    $(document).ready(function () {
        if($('.js-header-women-menu').length) {
            var womenBtn = $('.js-header-women-btn');
            var womenMenu = $('.js-header-women-menu');

            womenBtn.hover(
                function() {
                    womenMenu.stop().fadeIn('300');
                },
                function() {
                    womenMenu.stop().fadeOut('300');
                }
            );

            womenBtn.on('touchend', function(e) {
                e.preventDefault();
                var touched = $(e.target);
                if(!touched.closest('.js-header-women-menu').length) {
                    womenMenu.fadeToggle('300');
                }
            });

            $('html').on('touchstart', function(e) {
                var touched = $(e.target);
                if(!touched.closest(('.js-header-women-btn')).length) {
                    womenMenu.fadeOut('300');
                }
            });
        }
    });
});