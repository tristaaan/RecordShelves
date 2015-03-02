/* RecordModel.js
* has: title, asin, artist, genre
*/

'use strict';

var Constants = require('../constants.js');

var RecordModel = Backbone.Model.extend({

  idAttribute: Constants.primaryRecordKey,

  defaults: {
    title: '',
    asin: '',
    artist: '',
    genre: ''
  }
});

module.exports = RecordModel;