Template.listsIndex.helpers({
  lists: function() {
    return Lists.find({userId: Meteor.userId()});
  }
});
