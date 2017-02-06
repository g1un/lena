$(document).ready(function() {
    ymaps.ready(init);

    function init() {
        var maps = $('.js-map');
        if(maps.length < 1) return;

        var mapsArr = [];
        var myGeoObject = [];
        // var mapContainer = [];
        // var mapBtn = [];

        maps.each(function(id) {
            mapsArr[id] = new ymaps.Map("contacts-shop-map-"+id, {
                center: [59.958169564129435,30.313164000000015],
                zoom: 17,
                controls: []
            });

            myGeoObject[id] = new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [59.958169564129435,30.313164000000015]
                },
                properties: {
                    iconCaption: 'Кроневркская улица, 5'
                }
            }, {
                preset: 'islands#redDotIconWithCaption'
            });

            mapsArr[id].geoObjects.add(myGeoObject[id]);

            var mapBtn = $("#contacts-shop-map-"+id).closest('.js-map-container').find('.js-btn-map');
            mapBtn.on('click', function () {
                setTimeout(function() {
                    mapsArr[id].container.fitToViewport();
                }, 1);
            });
        });
    }
});