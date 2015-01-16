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
    'change .sort': 'sortShelf',
    'dragover': 'dragOver',
    'drop': 'recordDropped'
  },

  initialize: function(){
    this.listenTo(this.model.records, 'change', this.render);
    this.listenTo(this.model.records, 'sort', this.render);
    this.el.id = this.model.id;
  },

  render: function(){
    var template = this.template(this.model.toJSON());
    this.$el.html(template);
    this.model.records.each(this.addRecordAndView, this);
    return this;
  },

  addRecordAndView: function(record){
    this.model.records.add(record);
    var view = new app.RecordView({ 
      model: record
    });
    this.$el.append(view.render().el); //no need to rerender the whole view.
  },

  /* Form functions should probably be their own view */
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
    this.hideForm();
    this.newRecordSaveAndScroll(parsedFormData);
  },

  newRecordSaveAndScroll: function(record){
    this.addRecordAndView(new app.RecordModel(record));
    this.model.save();
    this.$el.scrollLeft(0xffffff); //maximally scroll right.
  },

  /* Drag and Drop funcitons */
  dragOver: function(e){
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = Constants.dropEffect;
    return false;
  },

  recordDropped: function(e){
    e.stopPropagation();
    var droppedData = JSON.parse(e.originalEvent.dataTransfer.getData('record'));
    this.newRecordSaveAndScroll(droppedData);
    return false;
  },

  sortShelf: function(e){
    this.model.records.sortOnce(e.target.value.toLowerCase());
    this.model.save();
  }

});