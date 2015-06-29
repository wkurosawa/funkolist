Template.funkoItem.helpers({
  ownFunko: function() {
    return this.userId === Meteor.userId();
  },
  wishList: function() {
    return Lists.findOne({name: 'Wishes', userId: Meteor.userId()});
  },
  isOnWishlist: function() {
    var wishList = Lists.findOne({name: 'Wishes', userId: Meteor.userId()});
    return _.contains( wishList.funkoIds, this._id );
  },
  isOnMyFunkosList: function() {
    var myFunkosList = Lists.findOne({name: 'My Funkos', userId: Meteor.userId()});
    return _.contains( myFunkosList.funkoIds, this._id );
  },
});

Template.funkoItem.events({
  'click .add-wish': function(e) {
    e.preventDefault();
    Meteor.call('addWish', this._id);
  },
  'click .add-my-funkos': function(e) {
    e.preventDefault();
    Meteor.call('addMyFunkos', this._id);
  },
});
