Template.listPage.helpers({
  funkos: function(){
    if (this.funkoIds) {
      return Funkos.find({ _id : { $in : this.funkoIds } });
    }
    else {
      return null;
    }
  }
});
