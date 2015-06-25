Template.funkoNew.events({
  'submit form': function(e) {
    e.preventDefault();

    var funko = {
      collection: $(e.target).find('[name=collection]').val(),
      number: parseInt($(e.target).find('[name=number]').val(),10),
      name: $(e.target).find('[name=name]').val(),
    };

    var errors = validateFunko(funko);
    if (errors.collection || errors.name || errors.number)
      return Session.set('funkoNewErrors', errors);


    Meteor.call('funkoInsert', funko, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // show this result but route anyway
      if (result.funkoExists)
        throwError('This funko has already been created');

      Router.go('funkoPage', {_id: result._id});
    });
  }
});

Template.funkoNew.onCreated(function() {
  Session.set('funkoNewErrors', {});
});

Template.funkoNew.helpers({
  errorMessage: function(field) {
    return Session.get('funkoNewErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('funkoNewErrors')[field] ? 'has-error' : '';
  }
});
