(function(){
"use strict";
App.run(function() {
    $(document).ready(function () {
        var atelierLink = $(".js-atelier-link");
        var atelier = atelierLink.closest(".js-atelier");
        // console.log(atelierBg);
        atelierLink.on('mouseover', function() {
            atelier.addClass('__zoom');
        });
        atelierLink.on('mouseout', function() {
            atelier.removeClass('__zoom');
        });
    });
});
})();