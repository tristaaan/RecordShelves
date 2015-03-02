/* ShelvesView.js
* view of a ShelvesCollection
*/

'use strict';

var ShelfView = require('./ShelfView.js');

var ShelvesView = Backbone.View.extend({
  tagName: 'main',

  initialize: function(){
  //reset: when data loads from json
  //add: when data loads from localStorage
  this.collection.bind("reset", this.render, this);
  },

  render: function() {
    this.collection.each(this.addShelf, this);
    return this;
  },

  addShelf: function(shelf) {
    var view = new ShelfView({ model: shelf});
    this.$el.append(view.render().el);
    shelf.save();
  }
});

module.exports = ShelvesView;