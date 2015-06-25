Template.funkoItem.helpers({
  ownFunko: function() {
    return this.userId === Meteor.userId();
  }
});
