/* main.js 
 * require all the things 
 */

// var library = (function(){
//   var shelves = new app.ShelfCollection();

//   $.ajax({
//     url: '/data/record-shelf.json',
//     success: function(resp){
//       shelves.reset(resp.recordshelf);
//       var shelvesView = new app.ShelvesView({collection: shelves});
//       $('body').html(shelvesView.render().el);
//     }
//   })

// })();

var shelves = new app.ShelfCollection();
var shelvesView = new app.ShelvesView({collection: shelves});
$('body').html(shelvesView.render().el);

if (location.search.split(Constants.resetParam+'=')[1] === 'true' || window.localStorage.length <= 1){
  console.log('from json');
  shelves.fetch({reset: true, ajaxSync: true, url: Constants.jsonSource});
}
else{
  console.log('from localStorage');  
  shelves.fetch({reset: true});
}