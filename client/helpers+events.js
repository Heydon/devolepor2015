Handlebars.registerHelper('percent', function(key) {
	var percent = 50 + (Session.get('chosenSkills').length / Session.get('skills').length * 100) / 2;
	return {
		value: percent + '%',
		position: 100 - percent + '%'
	}
});

/* 'start' */

Template.start.events({
	'click button': function() {
		var soundStart = new buzz.sound('/sounds/start.wav');
		soundStart.play({volume: 50});
		Router.go('/skills');
	}
});

/* 'skills' */

Template.skills.helpers({
	skills: function() {
		return Session.get('skills');
	}
});

Template.skills.events({
	'change [type="checkbox"]': function(e) {
		var chosen = Session.get('chosenSkills');
		if ($(e.currentTarget).is(':checked')) {
			var soundSlideup = new buzz.sound('/sounds/slideup.wav');
			soundSlideup.play({volume: 50});
			setTimeout(function () {
				chosen.push($(e.currentTarget).val());
				Session.set('chosenSkills', chosen);
			}, 750);
		} else {
			var soundError = new buzz.sound('/sounds/error.wav');
			soundError.play({volume: 50});
			setTimeout(function () {
				Session.set('chosenSkills', _.without(chosen, $(e.currentTarget).val()));
			}, 750);
		}
	},
	'click .continue': function(e) {
		if (Session.get('chosenSkills').length === Session.get('skills').length) {
			Session.set('coronersReport', 'You forgot to save time for sleepin\'.<br> You have gone mad and died.');
			Router.go('/ded');
		} else {
			var omitted = _.difference(Session.get('skills'), Session.get('chosenSkills'));
			var keyskill = _.sample(omitted);
			Session.set('coronersReport', 'Someone asked you a question about '+keyskill+' that you couldn\'t answer.<br> You have died of shame.');
			Router.go('/ded');
		}
		Session.set('chosenSkills', []);
	}
});

/* /ded */

Template.ded.helpers({
	report: function() {
		return Session.get('coronersReport');
	}
});

Template.ded.events({
	'click button': function() {
		Router.go('/');
	}
});



Template.ded.rendered = function() {
	var soundDed = new buzz.sound('/sounds/ded.wav');
	soundDed.play({volume: 50});
};