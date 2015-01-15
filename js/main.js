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

shelves.fetch({reset: true});