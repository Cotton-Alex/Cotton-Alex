//************** NOTES ***************
// 1. An idea to get js to build the json file: a json array holds all of the
// information about the cards to display on the screen. The user can choose
// cards by clicking checkboxes or using up/down buttons to choose the number
// of each card they want in their deck. Once finished, they'll press a
// "create deck" button that will add the selections via concat to another
// json file that already includes everything except the cards. This file will
// be stored in local storage until I can figure out how to download it.

function jsonParse(url, divId, isJSON) {
    var i = document.getElementById("sliderRange").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange =
            function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
                    parseDataFunc(xmlhttp.responseText, divId, isJSON, i);

            };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseDataFunc(response, divId, isJSON, i) {
    var responseText = (isJSON) ? JSON.parse(response) : response;
    document.getElementById(divId).innerHTML =
            "<ul id='pbAJAX'><li><div><img class='pbPicAJAX' src='"
            + responseText[i].card + "' height='250'>"
            + "<div class='pbInfoAJAX'> Name: " + responseText[i].name + "<br>"
            + responseText[i].from + "<br>\n\
                Battlefield: " + responseText[i].stats.battlefield + "<br>\n\
                Life: " + responseText[i].stats.life + "<br>\n\
                Spellboard: " + responseText[i].stats.spellboard + "<br>\n\
                Ability: " + responseText[i].stats.ability + "</div></div></li>\n\
                \n\
                <li><div><img class='pbPicAJAX' src='" + responseText[i].unique.card + "' height='250'>"
            + "<div class='pbInfoAJAX'>Unique Card: " + responseText[i].unique.name + "<br>"
            + "Type: " + responseText[i].unique.type + "<br>"
            + "Placement: " + responseText[i].unique.location + "<br>"
            + "TTS JSON Info: " + responseText[i].tts.cardID + "</div></div></li></ul><br>";
}

function jsonString(url, divId, isJSON) {
    var i = document.getElementById("sliderRange").value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange =
            function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
                    parseDataFunc2(xmlhttp.responseText, divId, isJSON, i);
            };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function checkLocalStorage() {
    if (typeof (localStorage) !== "undefined") { //checking for browser compatibility with local storage
        if (localStorage.backgroundColor !== null) {
            var bgColor = localStorage.getItem('backgroundColor');
            document.body.style.background = bgColor;
        } else {
            return;
        }
    } else {
        alert("Some features on this site are incompatible with your browser. For the best experience please update this browser or use a different one.");
    }
}

function localStorageGreeting() {
    if (typeof (localStorage) !== "undefined") { //checking for browser compatibility with local storage
        if (localStorage.getItem("visitorName") !== null) {
            var vName = localStorage.getItem("visitorName");
            document.getElementById("lsGreeting").innerHTML = "<span><b>" + vName + "!!</b> That's right. Welcome back " + vName + ", I knew you looked familiar!</span> <button onclick=" + "'clearVisitorName()'" + ">I can try to forget your name if you click here...</button>";
        } else {
            document.getElementById("lsGreeting").innerHTML = "<div>Hi there, I kinda feel like I recognize you.<br> Remind me your name again...</div> <span><input id=" + "'visitorNameField'" + "type=" + "'text'" + "></span><button type=" + "'submit'" + "onClick=" + "'visitorNameStorage()'" + ">Remember now?</button>";
        }
    } else {
        alert("Some features on this site are incompatible with your browser. For the best experience please update this browser or use a different one.");
    }
}

function visitorNameStorage() {
    var vName = document.getElementById("visitorNameField").value;
    console.log(vName);
    localStorage.setItem("visitorName", vName);
    location.reload();
}

function clearVisitorName() {
//    var vName = localStorage.getItem("visitorName");
    localStorage.removeItem("visitorName");
    location.reload();
}

//function saveFile() {
//    fswriteFile('pxbrn4TTS.json', json, 'utf8', callback);
//}