Handlebars.registerHelper('percent', function(key) {
	var percent = 50 + (Session.get('chosenSkills').length / Session.get('skills').length * 100) / 2;
	return {
		value: percent + '%',
		position: 100 - percent + '%'
	}
});

/* 'start' */

Template.start.rendered = function() {
	console.log(soundStart);
};

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
			chosen.push($(e.currentTarget).val());
			Session.set('chosenSkills', chosen);
			var soundSelect = new buzz.sound('/sounds/select.wav');
			soundSelect.play({volume: 50});
		} else {
			Session.set('chosenSkills', _.without(chosen, $(e.currentTarget).val()));
			var soundError = new buzz.sound('/sounds/error.wav');
			soundError.play({volume: 50});
		}
	}
});