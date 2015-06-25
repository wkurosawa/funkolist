Meteor.publish('funkos', function() {
  return Funkos.find();
});
