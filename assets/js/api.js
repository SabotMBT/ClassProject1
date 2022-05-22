// global variables
var input = $("#artists");
var search = $("button#search");
var infoArray = "";
var rawID = "";
var artistID = "";
var artistAlbums = "";
var artistTopTracks = "";
var artistName = "";
var savedObj = "";
var loadedObj = "";
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var eventData = "";
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
    "X-RapidAPI-Key": "eaec35990amsh814deba101d8394p1f7881jsn5a8d39c6cfd3",
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
    "X-RapidAPI-Key": "eaec35990amsh814deba101d8394p1f7881jsn5a8d39c6cfd3",
  },
};

//search on button click
$(search).on("click", function (event) {
  event.preventDefault();
  newSearch();
});

function newSearch() {
  var userInput = input.val().toLowerCase();
  searchHistory.unshift(userInput);
  if (searchHistory.length > 10) {
    searchHistory.pop();
  }
  var shSet = new Set(searchHistory);
  console.log(shSet);
  var sHcopy = [...shSet];
  console.log(sHcopy);
  localStorage.setItem("searchHistory", JSON.stringify(sHcopy));
  settings1.data.q = userInput;
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
      eventLookup();
    });
  });
}

$(document).ready(function () {
  if (localStorage.getItem("lastSearch") !== null) {
    artInfo();
  } else {
    return;
  }
});

function eventLookup() {
  $.ajax({
    url:
      "https://rest.bandsintown.com/artists/" +
      encodeURIComponent(artistName) +
      "/events/?app_id=11fd1719872137f611a737acb9d8cfdc",
    success: function (data) {
      eventData = data;
      console.log(eventData);
      eventCards();
    },
  });
}

function eventCards() {
  console.log("eventCard function triggered");
  $("#body3").empty();
  for (i = 0; i < eventData.length; i++) {
    if (i > 4) {
      break;
    }
    var card = $('<div class="card w-auto">');
    $("#body3").append(card);
    var cardbody = $('<div class="card-body">');
    card.append(cardbody);
    var cardTitle = $('<h5 class="card-title">');
    var cardDate = $('<p class="card-text">');
    var cardLoc = $('<p class="card-text">');
    cardTitle.text(eventData[i].venue.name);
    const dnt = new Date(eventData[i].datetime);
    cardDate.text(dnt);
    cardLoc.text(eventData[i].venue.location);
    cardbody.append(cardTitle);
    cardbody.append(cardDate);
    cardbody.append(cardLoc);
  }
}
