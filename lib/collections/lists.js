Lists = new Mongo.Collection('lists');

Lists.allow({
  update: function(userId, list) { return ownsDocument(userId, list); },
  remove: function(userId, list) { return ownsDocument(userId, list); },
});

Lists.deny({
  update: function(userId, list, fieldNames, modifier) {
    var errors = validateList(modifier.$set);
    return errors.name;
  }
});

Meteor.methods({
  listInsert: function(listAttributes) {
    check(Meteor.userId(), String);
    check(listAttributes, {
      name: String,
    });

    var user = Meteor.user();

    var errors = validateList(listAttributes);
    if (errors.name)
      throw new Meteor.Error('invalid-list', "You must set a name for your list");

    var sameList = Lists.findOne({name: listAttributes.name, userId: user._id });
    if (sameList) {
      return {
        listExists: true,
        _id: sameList._id
      }
    }

    var list = _.extend(listAttributes, {
      userId: user._id,
      submitted: new Date()
    });
    var listId = Lists.insert(list);
    return {
      _id: listId
    };
  }
});

validateList = function (list) {
  var errors = {};
  if (!list.name)
    errors.name =  "Please fill in a name";
  return errors;
}
