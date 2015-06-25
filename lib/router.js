Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('funkos'); }
});

Router.route('/', {name: 'funkosList'});
Router.route('/funkos/:_id', {
  name: 'funkoPage',
  data: function() { return Funkos.findOne(this.params._id); }
});

Router.onBeforeAction('dataNotFound', {only: 'funkoPage'});
