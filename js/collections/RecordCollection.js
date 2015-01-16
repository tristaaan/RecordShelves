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
  }

});