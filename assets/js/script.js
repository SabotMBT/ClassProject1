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
    $("#genreList1").empty();
    var artistArr = response.artists.items;
    var firstList = artistArr;
    for (i = 0; i < firstList.length; i++) {
      var artName = firstList[i].data.profile.name;
      var listItem = $('<li class="list-group-item listener">');
      $("ul#genreList1").append(listItem);
      listItem.text(artName);
    }
    console.log(response);
    randomFunction(artists);
  });
}

$("ul#genreList1").delegate("li", "click", function () {
  input.val($(this)[0].textContent);
  newSearch();
});
