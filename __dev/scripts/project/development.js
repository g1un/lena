// App.gui.add({
//     _name: 'development-masonry',
//         selector: '.js-development-masonry',
//         build: function($el){
//         var options = {
//             itemSelector: '.js-development-masonry-item',
//             gutter: 20,
//             columnWidth: '.grid-sizer'
//         };
//         $el.masonry(options);
//     },
//     destroy: function($el, methods){
//         if(methods && typeof methods['destroy'] == 'function') methods['destroy']();
//     }
// });
// App.run(function() {
//     $(document).ready(function () {
//         // Inject YouTube API script
//         var tag = document.createElement('script');
//         tag.src = "//www.youtube.com/player_api";
//         var firstScriptTag = document.getElementsByTagName('script')[0];
//         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//     });
// });