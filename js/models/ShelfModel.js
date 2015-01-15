/* ShelfModel.js
 * a group of records
 */
var app = app || {};

app.ShelfModel = Backbone.Model.extend({

  defaults: {
    id: '',
    title: ''
  },

  parse: function(data){
    this.records = new app.RecordCollection(data.records);
    return data;
  }

});