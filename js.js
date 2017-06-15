/* Javascript file to hold some of the functions used in this site ************/




/* SECTION 04 *****************************************************************/

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
            + "Placement: " + responseText[i].unique.location + "<br></div></div></li></ul><br>";
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

function parseDataFunc2(response, divId, isJSON, i) {
    var responseText = (isJSON) ? JSON.parse(response) : response;
    document.getElementById(divId).innerHTML = response;
}

function bounce() {
    document.getElementById("animB").style.animationPlayState = "running";
}

/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::  05: Local Storage  :::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

function checkLocalStorage() {
    if (typeof(localStorage) !== "undefined") { //checking for browser compatibility with local storage
        if (localStorage.backgroundColor !== null) {
            var bgColor = localStorage.getItem('backgroundColor');
            document.body.style.background = bgColor;
        }else {
            return;
        }
} else {
    alert("Some features on this site are incompatible with your browser. For the best experience please update this browser or use a different one.");
    }   
}

function backgroundColor(bgColor) {
    localStorage.setItem("backgroundColor", bgColor);
    document.body.style.background = bgColor;
}

function clearBackgroundColor(name) {
    localStorage.removeItem(name);
    location.reload();
}

function localStorageGreeting () {
    if (typeof(localStorage) !== "undefined") { //checking for browser compatibility with local storage
        if (localStorage.getItem("visitorName") !== null) {
            var vName = localStorage.getItem("visitorName");
            document.getElementById("lsGreeting").innerHTML = "<span><b>" + vName + "!!</b> That's right. Welcome back " + vName + ", I knew you looked familiar!</span> <button onclick=" + "'clearVisitorName()'" + ">I can try to forget your name if you click here...</button>";
        }else {
            document.getElementById("lsGreeting").innerHTML = "<div>Hi there, I kinda feel like I recognize you.<br> Remind me your name again...</div> <span><input id=" + "'visitorNameField'" + "type=" + "'text'" + "></span><button type=" +"'submit'" + "onClick=" + "'visitorNameStorage()'" + ">Remember now?</button>";
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

/* SECTION 09 *****************************************************************/

/* global CSSStyleDeclaration */

function loadOn() {
    alert('This alert was just created by an onload event handler');
}

function mouseOverButton() {
    with (document.getElementById("mouseOverButtonId").style) {
        left = (Math.random() * 200) + "px";
        top = (Math.random() * 150) + "px";
    }
}

function focusFAndB() {
    document.getElementById("fAndB").style.textTransform = "uppercase";
}

function blurFAndB() {
    document.getElementById("fAndB").style.textTransform = "lowercase";
}

function focusBAndF() {
    document.getElementById("bAndF").style.textTransform = "uppercase";
}

function blurBAndF() {
    document.getElementById("bAndF").style.textTransform = "lowercase";
}

var clicks = 0;
function clickCount() {
    clicks += 1;
    document.getElementById("addClick").innerHTML = clicks;
}

var mouseOutClicks = 0;
function mouseOutClickCount() {
    mouseOutClicks += 1;
    document.getElementById("mouseOutAddClick").innerHTML = mouseOutClicks;
}

var mouseOutOuts = 0;
function mouseOutCount() {
    mouseOutOuts += 1;
    document.getElementById("mouseOutAdd").innerHTML = mouseOutOuts;
}

function slideGame() {
    document.getElementById("triesNumber").innerHTML = 0;
    document.getElementById("slideNumber").innerHTML = 0;
    document.getElementById("sliderValue").innerHTML = 0;
    var r = (Math.floor(Math.random() * 100));
    document.getElementById("matchNumber").innerHTML = r;
}

function slideChange() {
    var slideNumber = document.getElementById("sliderValue").value;
    document.getElementById("slideNumber").innerHTML = slideNumber;
}

var tries = 0;
function triesCount() {
    tries += 1;
    document.getElementById("triesNumber").innerHTML = tries;
}

function touchVsc() {
    document.getElementById("touchVsClick").style.color = "blue";
}

function tvsClick() {
    document.getElementById("touchVsClick").style.color = "red";
}