/* ShelfView.js
 * view of a single shelf
 */

 var app = app || {};

 app.ShelfView = Backbone.View.extend({
 	tagName: 'section',
  template: _.template($("#shelfTemplate").html()),

  events:{
    'click .addButton': 'toggleForm',
    'submit': 'newRecordFromForm',
    'dragover': 'dragOver',
    'drop': 'recordDropped'
  },

  initialize: function(){
    this.listenTo(this.model.records, 'change', this.render);
    this.el.id = this.model.id;
  },

 	render: function(){
    var template = this.template(this.model.toJSON());
    this.$el.html(template);
 		this.model.records.each(this.addRecordView, this);
 		return this;
 	},

 	addRecordView: function(record){
 		var view = new app.RecordView({ 
      model: record, 
      collection: this.model
    });
 		this.$el.append(view.render().el);
 	},

  toggleForm: function(){
    this.$('form').toggleClass('visible');
  },

  hideForm: function(){
    this.$('form').removeClass('visible');
    this.clearForm();
  },

  clearForm: function(){
    this.$('form')[0].reset();
  },

  newRecordFromForm: function(formData){
    formData.preventDefault();
    var parsedFormData = {};
    $(formData.target).serializeArray().forEach(function(element){
      parsedFormData[element.name] = element.value.trim();
    });
    this.addDataAndView(parsedFormData);
    this.hideForm();
  },

  addDataAndView: function(data){
    var model = new app.RecordModel(data);
    this.model.records.add(model);
    this.addRecordView(model); //no need to rerender the whole view.
  },

  dragOver: function(e){
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = Constants.dropEffect;
    return false;
  },

  recordDropped: function(e){
    e.stopPropagation();
    var droppedData = JSON.parse(e.originalEvent.dataTransfer.getData('record'));
    this.addDataAndView(droppedData);
    //console.log('drop', e);
    return false;
  }

});