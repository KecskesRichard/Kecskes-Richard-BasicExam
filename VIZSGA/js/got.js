function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
    createTable(userDatas);
    document.getElementById("searchInput").addEventListener("search", function () {
        searchInput(userDatas);
    });
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

function createTable(userDatas) {
    var div = "";
    for (var i in userDatas) {
        if (userDatas[i].dead === "0") {
            div += `<div class='pic'>
            <img id="pic${i}" src=${userDatas[i].portrait} alt=${userDatas[i].name} onclick="function() {pictureClick(userDatas)}">
            <p> ${userDatas[i].name} </p>
            </div>`
        }
    }
    document.getElementById("table").innerHTML = div;
}

function pictureClick(userDatas) {

}

function searchInput(userDatas) {
    var searchExp = document.getElementById("searchInput").value;
    searchExp = searchExp.toLowerCase();
    document.querySelector(".bigpic").innerHTML = "";
    document.querySelector(".name").innerHTML = "";
    /* document.querySelector(".icon").innerHTML = ""; */
    document.querySelector(".bio").innerHTML = "";

    for (var k in userDatas) {
        if (userDatas[k].name.indexOf(searchExp) >= 0) {
            document.querySelector(".bigpic").innerHTML = `<img id="bigpic" src="${userDatas[k].picture} alt="${userDatas[k].name}>`;
            document.querySelector(".name").innerHTML = `<p id="name">${userDatas[k].name}</p>`;
            /* document.querySelector(".icon").innerHTML = `<img id="icon" src="${userDatas[k].` */
            document.querySelector(".bio").innerHTML = `<p id="bio">${userDatas[k].bio}</p>`;
            break;
        } else {
            document.querySelector(".name").innerHTML = `<p id="name">Character not found</p>`
        }
    }
}