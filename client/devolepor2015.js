  Meteor.startup(function () {

    // Initialize sessions
    Session.set('skills', ['Node', 'HTML5', 'SVG', 'MongoDB', 'PHP', 'RWD', 'OOCSS', 'WAI-ARIA', 'Sass', 'AngularJS', 'Meteor', 'Microdata', 'Git', 'Vim']);
    Session.set('chosenSkills', []);

  });