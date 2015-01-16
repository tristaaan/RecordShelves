/* ShelfModel.js
 * a group of records
 */
var app = app || {};

app.ShelfModel = Backbone.Model.extend({
  
  defaults: {
    id: '',
    title: '',
    records: []
  },

  initialize: function(){
    //update the model when the record gets deleted
    this.listenTo(this.records, 'remove', function(){
      console.log('removed');
      this.save();
    });
  },

  parse: function(data){
    this.title = data.title;
    this.records = new app.RecordCollection(data.records);
    return data;
  },

  sync: function(method, model, options){
    this.collection.trigger('change', model);
  }

});