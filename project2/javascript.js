document.getElementById("search").addEventListener("click", searchMovie);
document.getElementById("getmore").addEventListener("click", getMore);

//lisätään muutamia globaaleja muuttujia, joita tarvitsemme useammin eri funktioissa
var searchSplit;
var searchApi;
var titleApi;
var myloc;
var clicked = 0;

function searchMovie() {
  //poistetaan mahdolliset vanhat haut
  document.getElementById("movies").innerHTML = "";
  //haetaan syötetty arvo
  var search = document.getElementById("insertMovie").value;
  if (search === "") {
    alert("write a search word");
    return false;
  }

  //käsitellään haku jotta voimme lisätä sanat API-hakuun
  //erotetaan sanat
  searchSplit = search.split(" ");
  //lisätään ensimmäinen sana
  searchApi = searchSplit[0];
  //käydään läpi loopilla loput sanat
  for (i = 1; i < searchSplit.length; i++) {
    searchApi += "+" + searchSplit[i];
  }

  //tallennetaan API-osoite, hyödynnetään TMDB:n tarjoamaa haku APIa
  var API =
    "http://api.themoviedb.org/3/search/movie?api_key=eef695400454d165b00de44173ce9dac&query=";
  //yhditetään API-osite ja haun arvo(t), jolloin voimme tehdä palauttaa oikean arvon
  var call = API + searchApi;

  //tehdään AJAX haku
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", call, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //käsitellään vastaus
      var jsonS = xmlhttp.responseText;
      //muutetaan objekteiksi
      var myObj = JSON.parse(jsonS);
      //hakutulosten määrä kokonaisuudessaan, lisätään verkkosivuille
      document.getElementById("results").innerHTML =
        "Total results: " + myObj.total_results;
      //kutsutaan funktiota parseData
      parseData(myObj);
    }
  };
  //muutetaan hakutulosten taulukon pohja näkyvyys näkyväksi
  document.getElementById("hidden").style.visibility = "visible";
}

//käsitellään
function parseData(myObj) {
  //luodaan taulukko ja lisätään se elementtiin
  var table = document.getElementById("movies");
  table.setAttribute("class", "moviesTable");
  //luodaan 1. rivi

  var tr = table.insertRow(0);
  //luodaan solut

  var c = 20 * clicked + 1;

  if (clicked == 0) {
    var td1 = tr.insertCell(0);
    var td2 = tr.insertCell(1);
    var td3 = tr.insertCell(2);

    //lisätään ensimmäisen rivin ensimmäiseen soluun otsikko ja arvostelu
    td1.innerHTML = "MOVIE";
    //1.rivin ja 2.solun tiivistelmä
    td2.innerHTML = "PLOT";
    c = 0;
  }
  //Ensimmäisen elokuvan otsikko käsitellään, uutta hakua varten
  //For loop käy läpi otsikot 2. eteenpäin
  for (i = 0; i < myObj.results.length; i++) {
    //luodaan seuraava rivi ja solut, hyödnnetään for-looppia
    tr = table.insertRow(c + 1);
    td1 = tr.insertCell(0);
    td2 = tr.insertCell(1);
    td3 = tr.insertCell(2);

    //Syötetään soluihin haetut arvot otsikko+arvostelu
    td1.innerHTML =
      myObj.results[i].title + " " + myObj.results[i].vote_average + "/10";
    //tiivistelmä
    td2.innerHTML = myObj.results[i].overview;
    //IMDB:stä saadut tiedot
    td3.innerHTML = "Release date: " + myObj.results[i].release_date;
    c = c + 1;
  }
}

function getMore() {
  clicked = clicked + 1;

  var search = document.getElementById("insertMovie").value;
  searchSplit = search.split(" ");
  //lisätään ensimmäinen sana
  searchApi = searchSplit[0];
  //käydään läpi loopilla loput sanat
  for (i = 1; i < searchSplit.length; i++) {
    searchApi += "+" + searchSplit[i];
  }

  //tallennetaan API-osoite, hyödynnetään TMDB:n tarjoamaa haku APIa
  var API =
    "http://api.themoviedb.org/3/search/movie?api_key=eef695400454d165b00de44173ce9dac&query=";
  //yhditetään API-osite ja haun arvo(t), jolloin voimme tehdä palauttaa oikean arvon
  var call = API + searchApi + "&page=" + (clicked + 1);

  //tehdään AJAX haku
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", call, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //käsitellään vastaus
      var jsonS = xmlhttp.responseText;
      //muutetaan objekteiksi
      var myObj = JSON.parse(jsonS);
      //hakutulosten määrä kokonaisuudessaan, lisätään verkkosivuille
      document.getElementById("results").innerHTML =
        "Total results: " + myObj.total_results;
      //kutsutaan funktiota parseData
      parseData(myObj);
    }
  };
}

// Film locations https://imdb8.p.rapidapi.com/title/get-filming-locations"

// API KEY FOR PICTURE https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
//API KEY FOR COUNTRIES https://api.themoviedb.org/3/configuration/countries?api_key=eef695400454d165b00de44173ce9dac
// API KEY FOR SEARCH https://api.themoviedb.org/3/search/movie?api_key=eef695400454d165b00de44173ce9dac&query=Jack+Reacher &page=1
