Handlebars.registerHelper('percent', function() {
	var percent = 50 + (Session.get('chosenSkills').length / Session.get('skills').length * 100) / 2;
	return {
		value: percent + '%',
		position: 100 - percent + '%'
	}
});

/* 'start' */

Template.start.events({
	'click button': function() {
		if (Session.get('sounds')) {
			var soundStart = new buzz.sound('/sounds/start.wav');
			soundStart.play({volume: 50});
		}
		Router.go('/skills');
	}
});

/* 'skills' */

Template.skills.helpers({
	skills: function() {
		return Session.get('skills');
	}
});

/* 'noskills' */

Template.noskills.helpers({
	otherRole: function() {
		var otherRoles = Session.get('otherRoles');
		return _.sample(otherRoles);
	}
});

Template.skills.events({
	'change [type="checkbox"]': function(e) {
		var chosen = Session.get('chosenSkills');
		if ($(e.currentTarget).is(':checked')) {
			if (Session.get('sounds')) {
				var soundSlideup = new buzz.sound('/sounds/slideup.wav');
				soundSlideup.play({volume: 50});
			}
			setTimeout(function () {
				chosen.push($(e.currentTarget).val());
				Session.set('chosenSkills', chosen);
			}, 250);
		} else {
			if (Session.get('sounds')) {
				var soundError = new buzz.sound('/sounds/error.wav');
				soundError.play({volume: 50});
			}
			setTimeout(function () {
				Session.set('chosenSkills', _.without(chosen, $(e.currentTarget).val()));
			}, 250);
		}
	},
	'click .continue': function(e) {
		if (Session.get('chosenSkills').length === Session.get('skills').length) {
			Session.set('coronersReport', 'You forgot to save time for sleepin\'.<br> You have gone mad and died.');
			Router.go('/ded');
		} else {
			if (Session.get('chosenSkills').length === 0) {
				Router.go('/noskills');
			} else {
				var omitted = _.difference(Session.get('skills'), Session.get('chosenSkills'));
				var keyskill = _.sample(omitted);
				Session.set('coronersReport', 'Someone asked you a question about '+keyskill+' that you couldn\'t answer.<br> You have died of shame.');
				Router.go('/ded');
			}
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

Template.playAgain.events({
	'click button': function() {
		Router.go('/');
	}
});

Template.ded.rendered = function() {
	if (Session.get('sounds')) {
		var soundDed = new buzz.sound('/sounds/ded.wav');
		soundDed.play({volume: 50});
	}
};

Template.noskills.rendered = function() {
	if (Session.get('sounds')) {
		var soundDed = new buzz.sound('/sounds/ded.wav');
		soundDed.play({volume: 50});
	}
};

Template.sounds.events({
	'click [aria-pressed]': function(e) {
		if ($(e.currentTarget).attr('aria-pressed') === 'true') {
			console.log('true');
			$(e.currentTarget).attr('aria-pressed', 'false');
			Session.set('sounds', false);
		} else {
			console.log('false');
			$(e.currentTarget).attr('aria-pressed', 'true');
			Session.set('sounds', true);
		}
	}
});