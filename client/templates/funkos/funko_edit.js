Template.funkoEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentFunkoId = this._id;

    var funkoProperties = {
      collection: $(e.target).find('[name=collection]').val(),
      number: parseInt($(e.target).find('[name=number]').val(),10),
      name: $(e.target).find('[name=name]').val()
    }

    Funkos.update(currentFunkoId, {$set: funkoProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('funkoPage', {_id: currentFunkoId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this funko?")) {
      var currentFunkoId = this._id;
      Funkos.remove(currentFunkoId);
      Router.go('funkosList');
    }
  }
});
