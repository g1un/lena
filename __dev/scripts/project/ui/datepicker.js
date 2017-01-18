App.gui.add({
	_name: 'datepicker',
	selector: '[data-datepicker]',
	build: function($el) {
        var _resizeEvent, _self;
		$el.datepicker();
        _resizeEvent = App.onResize(function() {
            _self.refresh();
        });

		return _self = {
			refresh: function() {
				if ($('body').find($el).length < 1) {
					_self.destroy();
					return;
				}
			},
			destroy: function() {
                App.onResize.remove(_resizeEvent);
                if ($('body').find($el).length < 1) {
                    return;
                }
				return $el.datepicker("destroy");
			}
		};
	},
	destroy: function($el, methods) {
		if (typeof methods['destroy'] !== 'function') {
			return;
		}
		methods['destroy']();
	}
});