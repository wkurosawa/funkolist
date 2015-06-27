Template.funkoItem.helpers({
  ownFunko: function() {
    return this.userId === Meteor.userId();
  },
});

Template.funkoItem.events({
  'click .add-wish': function(e) {
    e.preventDefault();
    Meteor.call('addWish', this._id);
  }
});
