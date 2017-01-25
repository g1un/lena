(function(){
"use strict";
App.createPreloader = (function(){
	var $tmpPlace = $('<div></div>');

	var Preloader = function(options){
		this.options = options;
		this.$element = $('<div />').addClass('preloader').hide();
	}

	Preloader.prototype = {
		show: function($parent){
			this.$element.stop()
			if( !this.$element.parent().is( $parent ) ){
				this.$element.appendTo($parent);
			}
			this.$element.fadeTo(300, 1, function(){ $(this).show(); });
		},
		hide: function(){
			this.$element.stop().fadeOut(300, function(){
				$(this).appendTo( $tmpPlace );
			});
		},
		destroy: function(){
			this.$element.stop().remove();
		}
	}

	return function(option){
		return new Preloader(option);
	}
})();
})();