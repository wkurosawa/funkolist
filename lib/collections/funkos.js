Funkos = new Mongo.Collection('funkos');

Funkos.allow({
  update: function(userId, funko) { return ownsDocument(userId, funko); },
  remove: function(userId, funko) { return ownsDocument(userId, funko); },
});

Funkos.deny({
  update: function(userId, funko, fieldNames, modifier) {
    var errors = validateFunko(modifier.$set);
    return errors.collection || errors.name || errors.number;
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

    var errors = validateFunko(funkoAttributes);
    if (errors.collection || errors.name || errors.number)
      throw new Meteor.Error('invalid-funko', "You must set a collection, name and number for your post");

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

validateFunko = function (funko) {
  var errors = {};
  if (!funko.collection)
    errors.collection = "Please fill in a collection name";
  if (!funko.name)
    errors.name =  "Please fill in a name";
  if (!funko.number)
    errors.number =  "Please fill in a number";
  return errors;
}
