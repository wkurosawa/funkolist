Template.funkosList.helpers({
  funkos: function() {
    return Funkos.find({}, {sort: {submitted: -1}});
  }
});
