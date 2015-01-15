/* RecordView.js
 * view of a single record
 */

 var app = app || {};

 app.RecordView = Backbone.View.extend({
 	tagName: 'article',
 	template: _.template($('#recordTemplate').html()),

  attributes: {
    draggable: true
  },

  events:{
    'click .removeButton': 'removeView',
    'dragstart': 'dragStart',
    'dragend': 'dragEnd'
  },

 	render: function() {
		var template = this.template(this.model.toJSON());
		this.$el.html(template);
		return this;
  },

  //remove view from DOM and alter model,
  //RecordCollection sees this change and removes the model from the collection
  removeView: function(){
    this.remove();
    this.model.set('remove', true);
  },

  dragStart: function(e){
    e.originalEvent.dataTransfer.effectAllowed = Constants.dropEffect;
    e.originalEvent.dataTransfer.setData('record', JSON.stringify(this.model));
  },

  //the view is removed on dragend if the drop was completed.
  dragEnd: function(e){
    if (e.originalEvent.dataTransfer.dropEffect === Constants.dropEffect){
      this.removeView();
    }
  }

 });