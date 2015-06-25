Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('funkos'); }
});

Router.route('/', {name: 'funkosList'});
Router.route('/funkos/new', {name: 'funkoNew'});
Router.route('/funkos/:_id', {
  name: 'funkoPage',
  data: function() { return Funkos.findOne(this.params._id); }
});
Router.route('/funkos/:_id/edit', {
  name: 'funkoEdit',
  data: function() { return Funkos.findOne(this.params._id); }
});


var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'funkoPage'});
Router.onBeforeAction(requireLogin, {only: 'funkoNew'});
