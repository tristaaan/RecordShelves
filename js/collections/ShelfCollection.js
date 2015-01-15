/* ShelfCollection
 * container for shelves
 */

var app = app || {};

app.ShelfCollection = Backbone.Collection.extend({
	model: app.ShelfModel,
  url: Constants.jsonSource,

  parse: function(json){
    return json.recordshelf;
  }
});