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
var genres = [
  "Alternative",
  "Blues",
  "Christian",
  "Classical",
  "Country",
  "EDM",
  "Folk",
  "Hip-Hop",
  "Jazz",
  "K-Pop",
  "Latin",
  "Metal",
  "Pop",
  "Punk",
  "Rap",
  "Rock",
  "Salsa",
  "Samba",
  "Ska",
  "World",
];

function randomFunction(randomArtist) {
  console.log($("#lang").val());
  settings.url =
    queryBase + genres[Math.floor(Math.random() * genres.length)] + endOfQuery;
  console.log(settings);
  $.ajax(settings).done(function (response) {
    var artistArr = response.artists.items;
    var listItem = $('<li class="list-group-item">');
    $("ul#genreList1").append(listItem);
    listItem.text(
      artistArr[Math.floor(Math.random() * artistArr.length)].data.profile.name
    );
  });
}

var queryBase = "https://spotify23.p.rapidapi.com/search/?q=genre:";
var endOfQuery = "&type=genre&limit=100";
var artists = [];
function pullData() {
  var selection = $("#lang").val();
  console.log($("#lang").val());
  //new Sara script
  if (selection === "surpriseMe") {
    randomFunction();
  } else {
    //end of new - add } to bottom
    settings.url = queryBase + $("#lang").val() + endOfQuery;
    console.log(settings);
    $.ajax(settings).done(function (response) {
      // results are stored in:
      // response.artists.items[$].data.profile.name
      $("#genreList1").empty();
      $("#genreList2").empty();
      $("#genreList3").empty();
      var artistArr = response.artists.items;
      var firstList = artistArr.splice(0, Math.round(artistArr.length / 3));
      var secondList = artistArr.splice(0, Math.round(artistArr.length / 2));
      var thirdList = artistArr;
      for (i = 0; i < firstList.length; i++) {
        var artName = firstList[i].data.profile.name;
        var listItem = $('<li class="list-group-item">');
        $("ul#genreList1").append(listItem);
        listItem.text(artName);
      }
      for (i = 0; i < secondList.length; i++) {
        var artName = secondList[i].data.profile.name;
        var listItem = $('<li class="list-group-item">');
        $("ul#genreList2").append(listItem);
        listItem.text(artName);
      }
      for (i = 0; i < thirdList.length; i++) {
        var artName = thirdList[i].data.profile.name;
        var listItem = $('<li class="list-group-item">');
        $("ul#genreList3").append(listItem);
        listItem.text(artName);
      }
      console.log(response);
    });
  }
}
$("ul#genreList1").delegate("li", "click", function () {
  input.val($(this)[0].textContent);
  newSearch();
});
$("ul#genreList2").delegate("li", "click", function () {
  input.val($(this)[0].textContent);
  newSearch();
});
$("ul#genreList3").delegate("li", "click", function () {
  input.val($(this)[0].textContent);
  newSearch();
});
