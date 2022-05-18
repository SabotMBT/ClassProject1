var input = $("#artists").val();
var search = $("button#search");
var infoArray = "";
var rawID = "";
var artistID = "";
var artistAlbums = "";
var artistTopTracks = "";
var artistName = "";

const settings = {
  async: true,
  crossDomain: true,
  url: "https://spotify23.p.rapidapi.com/search/?q=",
  method: "GET",
  data: {
    q: input,
    type: "multi",
    offset: 0,
    limit: 10,
  },
  headers: {
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    "X-RapidAPI-Key": "54925b7d60msh3c1dfb426ff3887p135fcfjsn984b8600dd90",
  },
};
const settings2 = {
  async: true,
  crossDomain: true,
  url: "https://spotify23.p.rapidapi.com/artist_overview/?id=",
  method: "GET",
  data: {
    id: artistID,
  },
  headers: {
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    "X-RapidAPI-Key": "54925b7d60msh3c1dfb426ff3887p135fcfjsn984b8600dd90",
  },
};
$(search).on("click", function () {
  event.preventDefault();
  input = $("#artists").val();
  settings.data.q = input;
  $.ajax(settings).done(function (response) {
    console.log(response);
    infoArray = response;
    rawID = infoArray.artists.items[0].data.uri;
    artistID = rawID.substring(15);
    console.log(artistID);
    settings2.data.id = artistID;
    $.ajax(settings2).done(function (response) {
      console.log(response);
      artistAlbums = response.data.artist.discography.albums.items;
      console.log(artistAlbums);
      artistTopTracks = response.data.artist.discography.topTracks.items;
      console.log(artistTopTracks);
      artistName = artistTopTracks[0].track.artists.items[0].profile.name;
      var albumCover = artistTopTracks[0].track.album.coverArt.sources[1];
      localStorage.setItem("album-cover", albumCover);
      var img = artistAlbums[0].releases.items[0].coverArt.sources[1].url;

      $("#img1").attr("src", img);
      console.log(img);
      localStorage.setItem("artist-name", artistName);
      localStorage.getItem("artist-name");
      console.log(artistName);
      // accGen()
    });
  });
});

function accGen() {
  $("section.box2").empty();
  var newAcc = $("<div>");
  $("section.box2").append(newAcc);
  newAcc.addClass("accordion");
  newAcc.attr("id", "accordionExample");
  var newAccI1 = $("<div>");
  newAcc.append(newAccI1);
  newAccI1.addClass("accordion-item");
  var newAccH1 = $("<h2>");
  newAccH1.addClass("accordion-header");
  newAccH1.attr("id", "headingOne");
  newAccI1.append(newAccH1);
  var newAccBtn1 = $("<button>");
  newAccBtn1.addClass("accordion-button");
  newAccBtn1.attr({
    type: "button",
    "data-bs-toggle": "collapse",
    "data-bs-target": "#collapseOne",
    "aria-expanded": "true",
    "aria-controls": "collapseOne",
    style: "font-family:'Macondo', cursive;",
  });
  newAccBtn1.text(artistName);
  var colOne = $("<div>");
  newAccI1.append(colOne);
  colOne.addClass("accordion-collapse collapse show");
  colOne.attr({
    id: "collapseOne",
    "aria-labelledby": "headingOne",
    "data-bs-parent": "#accordionExample",
  });
}

// $( function() {
//     function log( message ) {
//       $( ".input" ).text( message ).prependTo( "#log" );
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
