if (Funkos.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);
  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);

  var flashId = Funkos.insert({
    number: 1,
    collection: 'DC',
    name: 'Flash',
    submitted: new Date(now - 7 * 3600 * 1000)
  });

  var greenId = Funkos.insert({
    number: 2,
    collection: 'DC',
    name: 'Green Lantern',
    submitted: new Date(now - 7 * 3600 * 1000)
  });

  var tomWishesId = Lists.insert({
    userId: tom._id,
    name: 'Wishes',
    funkoIds: [flashId, greenId],
    created_at: new Date(now - 7 * 3600 * 1000)
  });


  Funkos.insert({
    number: 1,
    collection: 'Harry Potter',
    name: 'Harry Potter'
  });
}
