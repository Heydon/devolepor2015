Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading'
});

Router.map(function() {
	this.route('start', { 
		path: '/' 
	});
});

Router.onBeforeAction('loading');