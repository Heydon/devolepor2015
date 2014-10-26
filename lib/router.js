Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading',
	onRun: function() {
		setTimeout(function () {
			$('.reveal-box').addClass('opaque');
		}, 750);
	}
});

Router.map(function() {
	this.route('start', { 
		path: '/',
		onRun: function() {
			setTimeout(function () {
				$('.focus-on-load').focus();
			}, 750);
		}
	});
	this.route('skills', { 
		path: '/skills',
		onRun: function() {
			setTimeout(function () {
				$('.focus-on-load').attr('tabindex', '-1').focus();
			}, 750);
		}
	});
	this.route('ded', { 
		path: '/ded',
		onRun: function() {
			setTimeout(function () {
				$('h1').attr('role', 'alert');
			}, 750);
		}		
	});

});

Router.onBeforeAction('loading');