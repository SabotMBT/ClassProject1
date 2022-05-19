// global variables
var input = $("#artists").val();
var search = $("button#search");
var infoArray = "";
var rawID = "";
var artistID = "";
var artistAlbums = "";
var artistTopTracks = "";
var artistName = "";
var savedObj = "";
var loadedObj = "";
var searchHistory = [];
// settings for first API search
const settings1 = {
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
//settings for second API search
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
//search on button click
$(search).on("click", function () {
  event.preventDefault();
  input = $("#artists").val();
  searchHistory.unshift(input);
  if (searchHistory.length > 10) {
    searchHistory.pop();
  }
  console.log(searchHistory);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  settings1.data.q = input;
  $.ajax(settings1).done(function (response) {
    console.log(response);
    infoArray = response;
    rawID = infoArray.artists.items[0].data.uri;
    artistID = rawID.substring(15);
    console.log(artistID);
    settings2.data.id = artistID;
    $.ajax(settings2).done(function (response) {
      console.log(response);
      savedObj = response;
      localStorage.setItem("lastSearch", JSON.stringify(savedObj));

      artInfo();
    });
  });
});
$(document).ready(function () {
  artInfo();
});
