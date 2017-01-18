App.gui.add({
    _name: 'lang',
    selector: '.js-lang',
    build: function($el){
        $el.selectmenu();

    },
    destroy: function($el, methods){
        if(methods && typeof methods['destroy'] == 'function') methods['destroy']();
    }
});