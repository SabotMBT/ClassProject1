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
    var listItem = $('<li class="list-group-item">');
    $("#list").append(listItem);
    listItem.text(artistTracks);
  }
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
