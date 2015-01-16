/* RecordModel.js
 * has: title, asin, artist, genre
 */
var app = app || {};

 app.RecordModel = Backbone.Model.extend({

  idAttribute: Constants.primaryRecordKey,

 	defaults: {
 		title: '',
 		asin: '',
 		artist: '',
 		genre: ''
 	}
 });