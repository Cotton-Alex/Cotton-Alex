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
            "<ul id='pbAJAX'><li><div><img class='pbPicAJAX' src='" + responseText[i].card + "' height='250'>"
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
            + "TTS JSON Info: " + responseText[i].tts + "</div></div></li></ul><br>";
}
