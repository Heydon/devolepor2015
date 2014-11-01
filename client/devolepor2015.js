  Meteor.startup(function () {

    // Initialize sessions
    Session.set('skills', ['Node', 'HTML5', 'SVG', 'PHP', 'RWD', 'OOCSS', 'WAI-ARIA', 'Sass', 'AngularJS', 'Meteor', 'Microdata', 'Git']);
    Session.set('chosenSkills', []);
    Session.set('otherRoles', ['estate agent', 'solicitor']);
    Session.set('sounds', true);
  });