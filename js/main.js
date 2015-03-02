/* main.js 
 * require all the things 
 */

'use strict';

// <!-- Models -->
var Constants = require('./constants.js')
var ShelfModel = require('./models/ShelfModel.js');
var RecordModel = require('./models/RecordModel.js');

// <!-- Views -->
var RecordView = require('./views/RecordView.js');
var ShelfView = require('./views/ShelfView.js');
var ShelvesView = require('./views/ShelvesView.js');

// <!-- Collections -->
var ShelfCollection = require('./collections/ShelfCollection.js');
var RecordCollection = require('./collections/RecordCollection.js');

var shelves = new ShelfCollection();
var shelvesView = new ShelvesView({collection: shelves});

$('body').html(shelvesView.render().el);

if (location.search.split(Constants.resetParam+'=')[1] === 'true' || window.localStorage.length <= 1){
  console.log('from json');
  shelves.fetch({reset: true, ajaxSync: true, url: Constants.jsonSource});
}
else{
  console.log('from localStorage');  
  shelves.fetch({reset: true});
}