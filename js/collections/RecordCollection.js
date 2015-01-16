/* RecordCollection
* container for shelves
*/

var app = app || {};

app.RecordCollection = Backbone.Collection.extend({
  model: app.RecordModel,

  initialize: function(){
    this.on('change:remove', function(el){
      this.remove(el.get(Constants.primaryRecordKey));
    });
  },

  sortOnce: function(byKey){
    this.comparator = function(model){
        return model.get(byKey).toLowerCase();
    };
    this.sort();
    this.comparator = false;
  }

});