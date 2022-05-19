function artInfo() {
  loadedObj = JSON.parse(localStorage.getItem("lastSearch"));
  artistAlbums = loadedObj.data.artist.discography.albums.items;
  console.log(artistAlbums);
  artistTopTracks = loadedObj.data.artist.discography.topTracks.items;
  console.log(artistTopTracks);
  artistName = artistTopTracks[0].track.artists.items[0].profile.name;
  // console.log(artistName);
  $("#body1").empty();
  $("#body2").empty();
  for (i = 0; i < artistAlbums.length; i++) {
    if (i > 4) {
      break;
    }
    var img = artistAlbums[i].releases.items[0].coverArt.sources[1].url;
    var createImg = $("<img>");
    $("#body1").append(createImg);
    createImg.attr("src", img);
  }
  console.log(img);
  localStorage.setItem("artist-name", artistName);
  localStorage.getItem("artist-name");
  console.log(artistName);
  var ordLi = $("<ol>");
  console.log(ordLi);
  $("#body2").append(ordLi);
  ordLi.attr("id", "list");
  for (i = 0; i < 5; i++) {
    var artistTracks = artistTopTracks[i].track.name;
    var listItem = $("<li>");
    $("#list").append(listItem);
    listItem.text(artistTracks);
  }
  // var ordLi2 = $("<ol>");
  // $("#body3").append(ordLi2);
  // ordLi2.attr("id", "list2");
  // for (i = 0; i < 5; i++) {
  //   var lyricEl = artistTopTracks[0].track.contentRating.label;
  //   var listItem2 = $("<li>");
  //   $("#list2").append(listItem2);
  //   listItem2.append(lyricEl);
  //   // accGen()
  // }
}

function accGen() {
  $("#box2").empty();
  var newAcc = $("<div>");
  $("#box2").append(newAcc);
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

$("#artists").on("click", function () {
  $(function () {
    searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

    var availableTags = searchHistory;
    $("#artists").autocomplete({
      source: availableTags,
    });
  });
});
