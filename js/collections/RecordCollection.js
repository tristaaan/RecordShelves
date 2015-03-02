/* RecordCollection
* container for shelves
*/

'use strict';

var RecordModel = require('../models/RecordModel.js');
var Constants = require('../constants.js');

var RecordCollection = Backbone.Collection.extend({
  model: RecordModel,

  initialize: function(){
    this.on('change:remove', function(el){
      this.remove(el.get(Constants.primaryRecordKey));
    });
  },

  sortOnce: function(byKey){
    this.comparator = function(model){
        return model.get(byKey).toLowerCase();
    };
    this.sort();
    this.comparator = false;
  }

});

module.exports = RecordCollection;