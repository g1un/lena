(function(){
"use strict";
$(document).ready(function() {
    ymaps.ready(init);

    function init() {
        var maps = $('.js-map');
        if(maps.length < 1) return;

        var mapsArr = [];

        maps.each(function(id) {
            mapsArr[id] = new ymaps.Map("contacts-shop-map-"+id, {
                center: [59.958169564129435,30.313164000000015],
                zoom: 17
            });

            mapsArr[id].geoObjects.add(new ymaps.Placemark([59.958169564129435,30.313164000000015]));
        });
    }
});
})();