(function(){
"use strict";
App.onReady(function(){
    lightbox.option({
        albumLabel: "Изображение %1 из %2",
        positionFromTop: 80,
        showImageNumberLabel: false
    });

    $('html').on('click galleryOpen', 'a[data-gallery]', function(e){
        e.preventDefault();

        $('[data-gallery="' + $(this).attr('data-gallery') + '"]').each(function(){
            $(this).attr('data-lightbox', $(this).attr('data-gallery'));
        });

        lightbox.start($(this));
    });

    if( $('#lightbox').length == 1 ) return;
    lightbox.init();
})
})();