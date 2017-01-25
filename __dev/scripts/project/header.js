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
        }
    });
});