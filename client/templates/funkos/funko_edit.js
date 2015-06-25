Template.funkoEdit.onCreated(function() {
  Session.set('funkoEditErrors', {});
});
Template.funkoEdit.helpers({
  errorMessage: function(field) {
    return Session.get('funkoEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('funkoEditErrors')[field] ? 'has-error' : '';
  }
});

Template.funkoEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentFunkoId = this._id;

    var funkoProperties = {
      collection: $(e.target).find('[name=collection]').val(),
      number: parseInt($(e.target).find('[name=number]').val(),10),
      name: $(e.target).find('[name=name]').val()
    }

    var errors = validateFunko(funkoProperties);
    if (errors.collection || errors.name || errors.number)
      return Session.set('funkoEditErrors', errors);

    Funkos.update(currentFunkoId, {$set: funkoProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
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
