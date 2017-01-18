(function(){
"use strict";
App.gui.add({
    _name: 'filter-catalog',
    selector: '.js-filter-catalog',
    build: function($el){
        $el.selectmenu();
    },
    destroy: function($el, methods){
        if(methods && typeof methods['destroy'] == 'function') methods['destroy']();
    }
});
})();