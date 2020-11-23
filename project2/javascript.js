
//lisätään muutamia globaaleja muuttujia, joita tarvitsemme useammin eri funktioissa
var searchSplit;
var searchApi;

function searchMovie(){

    //poistetaan mahdolliset vanhat haut
    document.getElementById("movies").innerHTML="";
    //haetaan syötetty arvo
    var search=document.getElementById("insertMovie").value;

    //käsitellään haku jotta voimme lisätä sanat API-hakuun
    //erotetaan sanat
    searchSplit=search.split(" ");
    //lisätään ensimmäinen sana 
    searchApi=searchSplit[0];
    //käydään läpi loopilla loput sanat
    for (i=1; i<searchSplit.length; i++){
        searchApi+="+"+searchSplit[i];
    }

    //tallennetaan API-osoite, hyödynnetään TMDB:n tarjoamaa haku APIa
    var API = "http://api.themoviedb.org/3/search/movie?api_key=eef695400454d165b00de44173ce9dac&query=";
    //yhditetään API-osite ja haun arvo(t), jolloin voimme tehdä palauttaa oikean arvon
    var call = API+searchApi;

    //tehdään AJAX haku
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", call, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //käsitellään vastaus
            var jsonS=xmlhttp.responseText;
            //muutetaan objekteiksi
            var myObj = JSON.parse(jsonS);
            //hakutulosten määrä kokonaisuudessaan, lisätään verkkosivuille
            document.getElementById("results").innerHTML = "Total results: " + myObj.total_results;
            //kutsutaan funktiota parseData
            parseData(myObj);
           
        }
    
    }
    //muutetaan hakutulosten taulukon pohja näkyvyys näkyväksi
    document.getElementById("hidden").style.visibility = "visible";

}

//käsitellään 
function parseData(myObj) {
            //luodaan taulukko ja lisätään se elementtiin
            var table = document.getElementById("movies");
            //luodaan 1. rivi
            var tr = table.insertRow(0);
            //luodaan solut
            var td1 = tr.insertCell(0);
            var td2 = tr.insertCell(1);
            var td3 = tr.insertCell(2);

            //lisätään ensimmäisen rivin ensimmäiseen soluun otsikko ja arvostelu
            td1.innerHTML = "MOVIE"
            //1.rivin ja 2.solun tiivistelmä 
            td2.innerHTML = "PLOT"

 
            //Ensimmäisen elokuvan otsikko käsitellään, uutta hakua varten
            //For loop käy läpi otsikot 2. eteenpäin
        for (i=0; i<myObj.results.length; i++) {
            
            //tallennetaan otsikko muuttujaan
            var title=myObj.results[i].title;
            //erotellaan sanat 
            var titleSplit=title.split(" ");
            //lisätään ensimmäinen sana 
            var titleApi=titleSplit[0];
                //käydään läpi muut sanat 
                for (y=1; y<titleSplit.length; y++){
                    //lisätään väliin %20- haun muotoa varten
                    titleApi+="%20"+titleSplit[y];
                }
            //kutsutaan funktio, missä tehdään ensimmäiselle otsikolle uusi haku


          //luodaan seuraava rivi ja solut, hyödnnetään for-looppia
          tr = table.insertRow(i+1);
          td1 = tr.insertCell(0);
          td2 = tr.insertCell(1);
          td3 = tr.insertCell(2)    
        
        //Syötetään soluihin haetut arvot otsikko+arvostelu
            td1.innerHTML = myObj.results[i].title + " " + myObj.results[i].vote_average + "/10"
        //tiivistelmä
            td2.innerHTML = myObj.results[i].overview;
        //IMDB:stä saadut tiedot
            td3.innerHTML = myloc;            
        }
}

//Funktio hakee IMDB:stä saadun otsikon mukaiset tiedot
function searchLocation(titleApi){

    //tallennetaan API-osoite
    var API2 = "http://www.omdbapi.com/?i=tt3896198&apikey=6d850d11&t=";
    //yhditetään API-osite ja haun arvo(t), jolloin voimme tehdä palauttaa oikean arvon
    var call2 = API2+titleApi;
    var mylocS;
    //tehdään AJAX haku
    var xmlhttp2 = new XMLHttpRequest();
    xmlhttp.open("GET", call2, true);

    //lähetetään haku serverille
    xmlhttp.send();
    //kun vastaus tulee käynnistetään funktio
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //käsitellään vastaus
            var jsonL=xmlhttp.responseText;
            mylocS = JSON.parse(jsonL);
        }
    }

}


// Film locations https://imdb8.p.rapidapi.com/title/get-filming-locations"

// API KEY FOR PICTURE https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
//API KEY FOR COUNTRIES https://api.themoviedb.org/3/configuration/countries?api_key=eef695400454d165b00de44173ce9dac
// API KEY FOR SEARCH https://api.themoviedb.org/3/search/movie?api_key=eef695400454d165b00de44173ce9dac&query=Jack+Reacher