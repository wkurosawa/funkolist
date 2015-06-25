Template.funkoNew.events({
  'submit form': function(e) {
    e.preventDefault();

    var funko = {
      collection: $(e.target).find('[name=collection]').val(),
      number: parseInt($(e.target).find('[name=number]').val(),10),
      name: $(e.target).find('[name=name]').val(),
    };

    Meteor.call('funkoInsert', funko, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      // show this result but route anyway
      if (result.funkoExists)
        alert('This funko has already been created');

      Router.go('funkoPage', {_id: result._id});
    });
  }
});
