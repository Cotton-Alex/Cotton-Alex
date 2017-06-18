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











function draw() {
        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        roundedRect(ctx, 12, 12, 150, 150, 15);
        roundedRect(ctx, 19, 19, 150, 150, 9);
        roundedRect(ctx, 53, 53, 49, 33, 10);
        roundedRect(ctx, 53, 119, 49, 16, 6);
        roundedRect(ctx, 135, 53, 49, 33, 10);
        roundedRect(ctx, 135, 119, 25, 49, 10);

        ctx.beginPath();
        ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
        ctx.lineTo(31, 37);
        ctx.fill();

        for (var i = 0; i < 8; i++) {
        ctx.fillRect(51 + i * 16, 35, 4, 4);
        }

        for (i = 0; i < 6; i++) {
        ctx.fillRect(115, 51 + i * 16, 4, 4);
        }

        for (i = 0; i < 8; i++) {
        ctx.fillRect(51 + i * 16, 99, 4, 4);
        }

        ctx.beginPath();
        ctx.moveTo(83, 116);
        ctx.lineTo(83, 102);
        ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
        ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
        ctx.lineTo(111, 116);
        ctx.lineTo(106.333, 111.333);
        ctx.lineTo(101.666, 116);
        ctx.lineTo(97, 111.333);
        ctx.lineTo(92.333, 116);
        ctx.lineTo(87.666, 111.333);
        ctx.lineTo(83, 116);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(91, 96);
        ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
        ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
        ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
        ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
        ctx.moveTo(103, 96);
        ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
        ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
        ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
        ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
        ctx.fill();

        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();
        }
        }

        // A utility function to draw a rectangle with rounded corners.

        function roundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.stroke();
        }