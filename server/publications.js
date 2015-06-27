Meteor.publish('funkos', function() {
  return Funkos.find();
});

Meteor.publish('lists', function() {
  return Lists.find({userId: this.userId});
});
