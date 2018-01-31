var rabbit = "topDrop";
var carrot = "topDrop";
var fox = "topDrop";
var boatLocation = 0;
var dropFrom = "";
var dropTo = "";
var waterFlow = 0;
var winPossible = true;
var carrotBite = false;
var rabbitBite = false;
var win = false;
var carrotSpeak = false;
var rabbitSpeak = false;
var responsiveVoice, commentNumber, response, voiceList, voice;

voice = ('US English Female');
responsiveVoice.setDefaultVoice(voice);
console.log("voice = " + voice);

voicelist = responsiveVoice.getVoices();
console.log(voicelist);

var select = document.getElementById("voiceSelect"),
        voiceList = responsiveVoice.getVoices();

for (var i = 0; i < voiceList.length; i++)
{
    var option = document.createElement("OPTION"),
            txt = document.createTextNode(voiceList[i].name);
    option.appendChild(txt);
    option.setAttribute("value", voiceList[i]);
    select.insertBefore(option, select.lastChild);
}

console.log("option = " + option.value);
console.log("select = " + select);

document.querySelector('#menuOn').addEventListener('click', menuOn);

function menuOn() {
    console.log(menuOn);
    document.querySelector(".container").style.left = "50%";
}
 
document.querySelector('#play').addEventListener('click', menuOff); 
 
function menuOff() {
    console.log("menuOff");
    document.querySelector(".container").style.left = "-150%";
}

function flip() {
    console.log("Settings clicked");
    document.querySelector('.card').style.webkitTransform = "rotatey(180deg)";
    document.querySelector('.card').style.msTransform = "rotatey(180deg)";
    document.querySelector('.card').style.MozTransform = "rotatey(180deg)";
    document.querySelector('.card').style.OTransform = "rotatey(180deg)";
    document.querySelector('.card').style.transform = "rotatey(180deg)";
}

function flipBack() {
    console.log("Play clicked");
    voiceChoice = document.getElementById('voiceSelect');
    let newVoice = voiceChoice.selectedOptions;
    let output = "";
    for (let i=0; i<newVoice.length; i++) {
        output = newVoice[i].label;
    }
    voice = (output);
    console.log("voice = " + voice);
    responsiveVoice.setDefaultVoice(voice);
//    output.innerHTML = output;
//    console.log("output = " + output);
//    console.log("new voice = " + voice);
    document.querySelector('.card').style.webkitTransform = "rotatey(0deg)";
    document.querySelector('.card').style.msTransform = "rotatey(0deg)";
    document.querySelector('.card').style.MozTransform = "rotatey(0deg)";
    document.querySelector('.card').style.OTransform = "rotatey(0deg)";
    document.querySelector('.card').style.transform = "rotatey(0deg)";
}

function checkLocalStorage() {
    if (typeof (localStorage) !== "undefined") { //checking for browser compatibility with local storage
        if (localStorage.showMenu !== null) {
            var displayMenu = localStorage.getItem('showMenu');
                if (displayMenu === false) {
                     document.getElementById("menu").setAttribute.left = "-150%";
                } else {
                    return;
                }
        } else {
            return;
        }
    } else {
        alert("Some features on this site are incompatible with your browser. For the best experience please update this browser or use a different one.");
    }
}

function showMenu(displayMenu) {
    localStorage.setItem("showMenu", displayMenu);
    document.body.style.background = bgColor;
}

function jsonParse(url, group, commentNumber, isJSON) {
    console.log(url, group, commentNumber, isJSON);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange =
            function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
                    parseDataFunc(xmlhttp.responseText, group, commentNumber, isJSON);
            };
    xmlhttp.open("GET", url, group, commentNumber, true);
    xmlhttp.send();
}

function parseDataFunc(response, group, commentNumber, isJSON) {
    var responseText = (isJSON) ? JSON.parse(response) : response;
    console.log("JSON = " + response, group, commentNumber, isJSON);
    console.log("Chosen text = " + responseText[group].comment[commentNumber]);
    responsiveVoice.speak("" + responseText[group].comment[commentNumber] + "");
}

function allowDrop(ev) {
    ev.preventDefault();
}

function allowDropBoat(ev) {
    ev.preventDefault();
    document.getElementById("boatFront").setAttribute("background-image", "none");
    document.getElementById("boatFront").style.display = "none";
}

function showBoatFront(ev) {
    ev.preventDefault();
    document.getElementById("boatFront").setAttribute("background-image", "url=(/images/boat_front.png)");
}

function touchScreenMove(object) {
    var objectParentNode = document.getElementById(object).parentNode;
    var objectParentId = (objectParentNode.id);
    var carrotParentNode = document.getElementById("carrot").parentNode;
    var carrotParentId = (carrotParentNode.id);
    var rabbitParentNode = document.getElementById("rabbit").parentNode;
    var rabbitParentId = (rabbitParentNode.id);
    var foxParentNode = document.getElementById("fox").parentNode;
    var foxParentId = (foxParentNode.id);
    if (objectParentId === "topDrop" || objectParentId === "bottomDrop") {
        if (carrotParentId === "boat" || rabbitParentId === "boat" || foxParentId === "boat") {
            return;
        } else if (objectParentId === "topDrop" && boatLocation === 0) {
            document.getElementById('boat').appendChild(
                    document.getElementById(object)
                    );
        } else if (objectParentId === "bottomDrop" && boatLocation === 1) {
            document.getElementById('boat').appendChild(
                    document.getElementById(object)
                    );
            checkWin();
        } else {
            return;
        }
    }
    if (boatLocation === 0 && objectParentId === "boat") {
        document.getElementById('topDrop').appendChild(
                document.getElementById(object)
                );
    } else if (boatLocation === 1 && objectParentId === "boat") {
        document.getElementById('bottomDrop').appendChild(
                document.getElementById(object)
                );
        checkWin();
    } else {
        return;
    }
}

function drag(ev) {
    console.log("ev.target.parentNode.id = " + ev.target.parentNode.id);
    ev.dataTransfer.setData("text", ev.target.id);
    dropFrom = (ev.target.parentNode.id);
    console.log("------------------- drag");
    console.log("object = " + ev.target.id);
    console.log("dropFrom = " + dropFrom);
    console.log("boatLocation = " + boatLocation);
}

function drop(ev) {
    ev.preventDefault();
    object = (ev.target.id);
    var dropTo = (ev.target.id);
    console.log("------------------- drop");
    console.log("object = " + object);
    console.log("dropFrom = " + dropFrom);
    console.log("dropTo = " + dropTo);
    if (!ev.target.getAttribute("ondrop")) {
        return false;
    }
    var data = ev.dataTransfer.getData("text");
    console.log("function drop data = " + data);
    ev.target.appendChild(document.getElementById(data));
    checkWin();
}

function dropBoat(ev) {
    ev.preventDefault();
    var dropTo = (ev.target.id);
    console.log("------------------- dropBoat");
    console.log("object = " + ev.target.id);
    console.log("dropFrom = " + dropFrom);
    console.log("dropTo = " + dropTo);
    var dropFrom = (ev.target.parentNode.id);
    var targetChildCount = ev.target.childElementCount;
    if (targetChildCount === 1) {
        return false;
    }
    if (!ev.target.getAttribute("ondrop")) {
        return false;
    }
    var data = ev.dataTransfer.getData("text");
//    document.getElementById("boatFront").style.display = "block";
    ev.target.appendChild(document.getElementById(data));
}

function bite(object) {
    if (object === "carrot") {
        if (carrotBite === false) {
            var audio = new Audio('audio/chomp.wav');
            audio.play();
            carrotBite = true;
            console.log("carrotBite = " + carrotBite);
            document.getElementById("reset").style.left = "2%";
            if (carrotSpeak === false) {
                setTimeout(function () {
                    commentNumber = (Math.floor(Math.random() * 12));
                    jsonParse("riverComments.json", 0, commentNumber, "true");
                    carrotSpeak = true;
                }, 700);
            }
            return;
        }
    }
    if (object === "rabbit") {
        if (rabbitBite === false) {
            var audio = new Audio('audio/comic_bite.wav');
            audio.play();
            rabbitBite = true;
            console.log("rabbitBite = " + rabbitBite);
            document.getElementById("reset").style.left = "2%";
            if (rabbitSpeak === false) {
                setTimeout(function () {
                    commentNumber = (Math.floor(Math.random() * 12));
                    jsonParse("riverComments.json", 1, commentNumber, "true");
                    rabbitSpeak = true;
                }, 700);
            }
            return;
        }
    } else {
        return;
    }
}

function boatCross() {
    var carrotParentNode = document.getElementById("carrot").parentNode;
    var carrotParentId = (carrotParentNode.id);
    var rabbitParentNode = document.getElementById("rabbit").parentNode;
    var rabbitParentId = (rabbitParentNode.id);
    var foxParentNode = document.getElementById("fox").parentNode;
    var foxParentId = (foxParentNode.id);
    var waterHeight = (document.getElementById("water").offsetHeight);
    console.log("------------------- boatCross");
    console.log("carrotParentId = " + carrotParentId);
    console.log("rabbitParentId = " + rabbitParentId);
    console.log("foxParentId = " + foxParentId);
    console.log("waterheight = " + waterHeight);
    if (boatLocation === 0) {
        if (carrotParentId === "topDrop" && rabbitParentId === "topDrop" && foxParentId !== "topDrop") {
            bite("carrot");
            document.getElementById("carrot").setAttribute("src", "images/carrot_bite.png");
            winPossible = false;
            document.getElementById("boat").style.bottom = "0%";
            document.getElementById("boatFront").style.bottom = "0%";
            boatLocation = 1;
            movementRulesUpdate(carrotParentId, rabbitParentId, foxParentId);
            return;
        } else if (rabbitParentId === "topDrop" && foxParentId === "topDrop" && carrotParentId !== "topDrop") {
            bite("rabbit");
            document.getElementById("rabbit").setAttribute("src", "images/Rabbit_bite.png");
            winPossible = false;
            document.getElementById("boat").style.bottom = "0%";
            document.getElementById("boatFront").style.bottom = "0%";
            boatLocation = 1;
            movementRulesUpdate(carrotParentId, rabbitParentId, foxParentId);
            return;
        } else {
            document.getElementById("boat").style.bottom = "0%";
            document.getElementById("boatFront").style.bottom = "0%";
            boatLocation = 1;
            movementRulesUpdate(carrotParentId, rabbitParentId, foxParentId);
            return;
        }
    }
    if (boatLocation === 1) {
        if (carrotParentId === "bottomDrop" && rabbitParentId === "bottomDrop" && foxParentId !== "bottomDrop") {
            bite("carrot");
            document.getElementById("carrot").setAttribute("src", "images/carrot_bite.png");
            winPossible = false;
            document.getElementById("boat").style.bottom = null;
            document.getElementById("boatFront").style.bottom = null;
            boatLocation = 0;
            movementRulesUpdate(carrotParentId, rabbitParentId, foxParentId);
            return;
        } else if (rabbitParentId === "bottomDrop" && foxParentId === "bottomDrop" && carrotParentId !== "bottomDrop") {
            bite("rabbit");
            document.getElementById("rabbit").setAttribute("src", "images/Rabbit_bite.png");
            winPossible = false;
            document.getElementById("boat").style.bottom = null;
            document.getElementById("boatFront").style.bottom = null;
            boatLocation = 0;
            movementRulesUpdate(carrotParentId, rabbitParentId, foxParentId);
            return;
        } else {
            document.getElementById("boat").style.bottom = null;
            document.getElementById("boatFront").style.bottom = null;
            boatLocation = 0;
            movementRulesUpdate(carrotParentId, rabbitParentId, foxParentId);
            return;
        }
    } else {
        console.log("boatCross error");
    }
}

function movementRulesUpdate(carrotParentId, rabbitParentId, foxParentId) {
    console.log("------------------- movementRulesUpdate");
    console.log("carrotParentId = " + carrotParentId);
    console.log("rabbitParentId = " + rabbitParentId);
    console.log("foxParentId = " + foxParentId);
    if (boatLocation === 0) {
        document.getElementById("topDrop").setAttribute("ondrop", "drop(event)");
        document.getElementById("topDrop").setAttribute("ondragover", "allowDrop(event)");
        document.getElementById("bottomDrop").setAttribute("ondrop", null);
        document.getElementById("bottomDrop").setAttribute("ondragover", null);
        if (carrotParentId === "topDrop") {
            document.getElementById("carrot").setAttribute("draggable", "true");
        }
        if (rabbitParentId === "topDrop") {
            document.getElementById("rabbit").setAttribute("draggable", "true");
        }
        if (foxParentId === "topDrop") {
            document.getElementById("fox").setAttribute("draggable", "true");
        }
        if (carrotParentId === "bottomDrop") {
            document.getElementById("carrot").setAttribute("draggable", "false");
        }
        if (rabbitParentId === "bottomDrop") {
            document.getElementById("rabbit").setAttribute("draggable", "false");
        }
        if (foxParentId === "bottomDrop") {
            document.getElementById("fox").setAttribute("draggable", "false");
            return;
        }
    } else if (boatLocation === 1) {
        document.getElementById("topDrop").setAttribute("ondrop", null);
        document.getElementById("topDrop").setAttribute("ondragover", null);
        document.getElementById("bottomDrop").setAttribute("ondrop", "drop(event)");
        document.getElementById("bottomDrop").setAttribute("ondragover", "allowDrop(event)");
        if (carrotParentId === "topDrop") {
            document.getElementById("carrot").setAttribute("draggable", "false");
        }
        if (rabbitParentId === "topDrop") {
            document.getElementById("rabbit").setAttribute("draggable", "false");
        }
        if (foxParentId === "topDrop") {
            document.getElementById("fox").setAttribute("draggable", "false");
        }
        if (carrotParentId === "bottomDrop") {
            document.getElementById("carrot").setAttribute("draggable", "true");
        }
        if (rabbitParentId === "bottomDrop") {
            document.getElementById("rabbit").setAttribute("draggable", "true");
        }
        if (foxParentId === "bottomDrop") {
            document.getElementById("fox").setAttribute("draggable", "true");
            return;
        }
    } else {
        console.log("function movementRulesUpdate error");
    }
}

function checkWin() {
    var carrotParentNode = document.getElementById("carrot").parentNode;
    var carrotParentId = (carrotParentNode.id);
    var rabbitParentNode = document.getElementById("rabbit").parentNode;
    var rabbitParentId = (rabbitParentNode.id);
    var foxParentNode = document.getElementById("fox").parentNode;
    var foxParentId = (foxParentNode.id);
    if (win === false
            && carrotBite === false
            && rabbitBite === false
            && carrotParentId === "bottomDrop"
            && rabbitParentId === "bottomDrop"
            && foxParentId === "bottomDrop") {
        console.log("WINNER WINNER CHICKEN DINNER!!!");
        setTimeout(function () {
            commentNumber = (Math.floor(Math.random() * 12));
            jsonParse("riverComments.json", 2, commentNumber, "true");
            win = true;
        }, 700);
    }
}


function draw(x, y) {
    var canvas = document.getElementById("canvasWater");
    var ctx = canvas.getContext("2d");
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.ImageSmoothingEnabled = false;

//    var red_fish_left = new Image();
//    red_fish_left.addEventListener('load', function () {
//        ctx.drawImage(red_fish_left,25,25,100,100);
//    }, false);
//    
//    red_fish_left.src = 'images/red_fish_left.png';
//    console.log(red_fish_left.src);


//    var yellow_fish_left = new Image();    
//    yellow_fish_left.onLoad = function () {
//        ctx.drawImage(yellow_fish_left,100,100);
//    };
//    yellow_fish_left.src = 'images/yellow_fish_left.png';
//    console.log(yellow_fish_left.src);

    waterFlow++;
    if (waterFlow === 90) {
        waterFlow = 0;
    }

    for (x = -100; x <= 600; x += 1) {
        y = -10 - Math.sin((x - waterFlow) * Math.PI / 45) * 9;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#4ddbff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 0 - Math.sin((x - waterFlow + 20) * Math.PI / 45) * 12;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#00ccff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 10 - Math.sin((x + waterFlow) * Math.PI / 45) * 8;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#99ebff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 20 - Math.sin((x - waterFlow * 2) * Math.PI / 45) * 10;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#4ddbff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 30 - Math.sin((x + waterFlow) * Math.PI / 45) * 12;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#00ccff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 40 - Math.sin((x - waterFlow + 10) * Math.PI / 45) * 8;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#99ebff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 50 - Math.sin((x + waterFlow * 2) * Math.PI / 45) * 11;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#4ddbff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 60 - Math.sin((x - waterFlow) * Math.PI / 45) * 9;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#00ccff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 70 - Math.sin((x + waterFlow) * Math.PI / 45) * 12;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#99ebff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 80 - Math.sin((x - waterFlow - 15) * Math.PI / 45) * 9;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#4ddbff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 90 - Math.sin((x + waterFlow) * Math.PI / 45) * 11;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#00ccff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 100 - Math.sin((x - waterFlow * 2) * Math.PI / 45) * 8;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#99ebff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 110 - Math.sin((x + waterFlow + 20) * Math.PI / 45) * 10;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#4ddbff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 120 - Math.sin((x - waterFlow) * Math.PI / 45) * 12;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#00ccff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 130 - Math.sin((x + waterFlow + 35) * Math.PI / 45) * 8;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#99ebff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 140 - Math.sin((x - waterFlow) * Math.PI / 45) * 10;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#4ddbff";
    ctx.fill();
    ctx.beginPath();

    for (x = -100; x <= 600; x += 1) {
        y = 150 - Math.sin((x + waterFlow * 2) * Math.PI / 45) * 11;
        ctx.lineTo(x, y);
    }
    ctx.lineTo(600, 500);
    ctx.lineTo(-100, 500);
    ctx.fillStyle = "#00ccff";
    ctx.fill();
    ctx.beginPath();

    var loopTimer = setTimeout('draw()', 60);
}

function reset() {
    boatLocation = 0;
    document.getElementById("boat").style.bottom = null;
    document.getElementById("boatFront").style.bottom = null;
    document.getElementById("carrot").setAttribute("src", "images/carrot.png");
    document.getElementById("rabbit").setAttribute("src", "images/rabbit.png");
    document.getElementById("fox").setAttribute("src", "images/fox.png");
    document.getElementById("topDrop").appendChild(document.getElementById("carrot"));
    document.getElementById("topDrop").appendChild(document.getElementById("rabbit"));
    document.getElementById("topDrop").appendChild(document.getElementById("fox"));
    document.getElementById("carrot").setAttribute("draggable", "true");
    document.getElementById("rabbit").setAttribute("draggable", "true");
    document.getElementById("fox").setAttribute("draggable", "true");
    document.getElementById("topDrop").setAttribute("ondrop", "drop(event)");
    document.getElementById("topDrop").setAttribute("ondragover", "allowDrop(event)");
    document.getElementById("bottomDrop").setAttribute("ondrop", null);
    document.getElementById("bottomDrop").setAttribute("ondragover", null);
    document.getElementById("reset").style.left = "-150%";
    carrotBite = false;
    rabbitBite = false;
    win = false;
    carrotSpeak = false;
    rabbitSpeak = false;
}
