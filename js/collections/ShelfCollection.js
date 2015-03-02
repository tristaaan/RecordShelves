/* ShelfCollection
* container for shelves
*/

'use strict';

var Constants = require('../constants.js');
var ShelfModel = require('../models/ShelfModel');

var ShelfCollection = Backbone.Collection.extend({
  model: ShelfModel,

  localStorage: new Backbone.LocalStorage(Constants.savedData),

  initialize: function(){
    this.on('change', function(model){
      //console.log('model change', model.id, model.title, model.records.length);
      var modelCopy = {
        id: model.id,
        title: model.title,
        records: model.records
      };
      this.localStorage.update(modelCopy);
    });
  },

  parse: function(resp){
    if (resp instanceof Array){ //data is from local storage
      //console.log(resp);
      return resp;
    }
    else{ //data is fresh from resp
      this.localStorage._clear(); //reset local storage
      //console.log(resp.recordshelf);
      return resp.recordshelf;
    }
  }
});

module.exports = ShelfCollection;