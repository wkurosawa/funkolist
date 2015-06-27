Template.listNew.events({
  'submit form': function(e) {
    e.preventDefault();

    var list = {
      name: $(e.target).find('[name=name]').val(),
    };

    var errors = validateList(list);
    if (errors.name)
      return Session.set('listNewErrors', errors);

    Meteor.call('listInsert', list, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);

      // show this result but route anyway
      if (result.listExists)
        throwError('This list has already been created');

      Router.go('listPage', {_id: result._id});
    });
  }
});

Template.listNew.onCreated(function() {
  Session.set('listNewErrors', {});
});

Template.listNew.helpers({
  errorMessage: function(field) {
    return Session.get('listNewErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('listNewErrors')[field] ? 'has-error' : '';
  }
});
