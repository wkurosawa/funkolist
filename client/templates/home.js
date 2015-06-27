Template.home.helpers({
  funkos: function() {
    return Funkos.find({}, {sort: {submitted: -1}});
  }
});
