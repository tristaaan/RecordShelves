/* ShelvesView.js
 * view of a ShelvesCollection
 */

 var app = app || {};

 app.ShelvesView = Backbone.View.extend({
 	tagName: 'main',

 	initialize: function(){
 		this.collection.bind("reset", this.render, this);
 	},

	render: function() {
		this.collection.each(this.addShelf, this);
		return this;
	},

 	addShelf: function(shelf) {
 		var view = new app.ShelfView({ model: shelf});
 		this.$el.append(view.render().el);
 	}
 });