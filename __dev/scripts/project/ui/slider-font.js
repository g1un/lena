App.gui.add({
	_name: 'slider-font',
	selector: '[data-slider-font]',
	build: function($el) {
        var _resizeEvent, _self;
		$el.slider({
			min: 16,
			max: 24,
			step: 1,
			value: 16,
			range: 'min',
			slide: function(event, ui) {
				$('.document-title, .accordion-title').css('font-size', $el.slider( "option", "value" ));
			}
		});
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
				return $el.slider("destroy");
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