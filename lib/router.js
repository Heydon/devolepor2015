Router.configure({  
	layoutTemplate: 'layout',  
	loadingTemplate: 'loading'
});

Router.map(function() {
	this.route('start', { 
		path: '/' 
	});
	this.route('skills', { 
		path: '/skills'
	});
});

Router.onBeforeAction('loading');