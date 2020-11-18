
function searchMovie(){

    //haetaan syötetty arvo
    var search=document.getElementById("insertMovie").value;

    //tallennetaan API-osoite
    var API = "http://api.themoviedb.org/3/search/movie?api_key=eef695400454d165b00de44173ce9dac&query=";
    //yhditetään API-osite ja haun arvo, jolloin voimme tehdä API haun oikealla arvolla
    var call = API+search;

    //tehdään AJAX haku
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", call, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var json=xmlhttp.responseText;
            var myObj = JSON.parse(json);
            document.getElementById("newsfeed").innerHTML = myObj.title;
        }

    }

}



function exefour() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://www.omdbapi.com/?apikey=6d850d11&", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var doc = xmlhttp.responseXML;
            var titles = doc.getElementsByTagName('title');
            for (i = 0; i < titles.length; i++) {
                title = "<li>" + titles[i].innerHTML + "</li>";
                document.getElementById("newsfeed").innerHTML += title;
            }

        }
    }
}


//API KEY FOR COUNTRIES https://api.themoviedb.org/3/configuration/countries?api_key=eef695400454d165b00de44173ce9dac
// API KEY FOR SEARCH https://api.themoviedb.org/3/search/movie?api_key=eef695400454d165b00de44173ce9dac&query=Jack+Reacher