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

var settings = {
  async: true,
  crossDomain: true,
  url: "",
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    "X-RapidAPI-Key": "eaec35990amsh814deba101d8394p1f7881jsn5a8d39c6cfd3",
  },
};
//in progress, will proceed a random artist from API list
function randomFunction(randomArtist) {
  console.log(randomArtist);
  var property = randomArtist[Math.floor(Math.random() * randomArtist.length)];
  console.log(property);
}

var queryBase = "https://spotify23.p.rapidapi.com/search/?q=genre:";
var endOfQuery = "&type=genre&limit=100";
var artists = [];
function pullData() {
  console.log($("#lang").val());
  settings.url = queryBase + $("#lang").val() + endOfQuery;
  console.log(settings);
  $.ajax(settings).done(function (response) {
    // results are stored in:
    // response.artists.items[$].data.profile.name

    var artistArr = response.artists.items;
    for (i = 0; i < artistArr.length; i++) {
      var artName = artistArr[i].data.profile.name;
      var listItem = $("<li>");
      $("ul#genreList").append(listItem);
      listItem.text(artName);

    }
    console.log(response);
    randomFunction(artists)
  });
}
