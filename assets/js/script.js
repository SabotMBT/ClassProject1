// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
// console.log(options)
// $( function() {
//     function log( message ) {
//       $( "<div>" ).text( message ).prependTo( "#log" );
//       $( "#log" ).scrollTop( 0 );
//     }
//     $( "#artists" ).autocomplete({
//       source: function( request, response ) {
//         $.ajax( {
//           url: "search.php",
//           dataType: "jsonp",
//           data: {
//             term: request.term
//           },
//           success: function( data ) {
//             response( data );
//           }
//         } );
//       },
//       minLength: 2,
//       select: function( event, ui ) {
//         log( "Selected: " + ui.item.value + " aka " + ui.item.id );
//       }
//     } );
//   } );