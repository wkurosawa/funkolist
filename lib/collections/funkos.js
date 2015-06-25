Funkos = new Mongo.Collection('funkos');

Funkos.allow({
  update: function(userId, funko) { return ownsDocument(userId, funko); },
  remove: function(userId, funko) { return ownsDocument(userId, funko); },
});

Funkos.deny({
  update: function(userId, funko, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'collection', 'name', 'number').length > 0);
  }
});

Meteor.methods({
  funkoInsert: function(funkoAttributes) {
    check(Meteor.userId(), String);
    check(funkoAttributes, {
      collection: String,
      name: String,
      number: Match.Integer
    });

    var sameFunko = Funkos.findOne({collection: funkoAttributes.collection, number: funkoAttributes.number });
    if (sameFunko) {
      return {
        funkoExists: true,
        _id: sameFunko._id
      }
    }

    var user = Meteor.user();
    var funko = _.extend(funkoAttributes, {
      userId: user._id,
      author: user.name,
      submitted: new Date()
    });
    var funkoId = Funkos.insert(funko);
    return {
      _id: funkoId
    };
  }
});
