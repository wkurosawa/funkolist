Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return [Meteor.subscribe('funkos'), Meteor.subscribe('lists')]; }
});

Router.route('/', {name: 'home'});

Router.route('/lists', {name: 'listsIndex'});
Router.route('/lists/new', {name: 'listNew'});
Router.route('/lists/:_id', {
  name: 'listPage',
  data: function() { return Lists.findOne({ _id: this.params._id, userId: Meteor.userId() } ); }
});

Router.route('/funkos', {name: 'funkosList'});
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
