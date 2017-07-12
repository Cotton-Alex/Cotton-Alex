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
            + "Placement: " + responseText[i].unique.location + "<br>"
            + "TTS JSON Info: " + responseText[i].tts + "</div></div></li></ul><br>";
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

function backgroundColor(bgColor) {
    localStorage.setItem("backgroundColor", bgColor);
    document.body.style.background = bgColor;
}

function clearBackgroundColor(name) {
    localStorage.removeItem(name);
    location.reload();
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

/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::  06: DOM Manipulation  ::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

function addItem() {
    var item = document.getElementById("item");
    var price = document.getElementById("price");

    if (firstName.value === "" || lastName.value === "") {
        ifEmpty(firstName);
        ifEmpty(lastName);
    } else {
        // Create Row
        var newRow = document.createElement("tr");

        // Create first name cell and append text
        var newCell = document.createElement("td");
        var fnameText = document.createTextNode(item.value);
        newCell.appendChild(fnameText);
        newRow.appendChild(newCell);

        // Create last name cell and append text
        var newCell2 = document.createElement("td");
        var lnameText = document.createTextNode(price.value);
        newCell2.appendChild(lnameText);
        newRow.appendChild(newCell2);

        // Create edit and remove icon image and set their attributes
        var newCell3 = document.createElement("td");
        var eimage = document.createElement("img");
        eimage.setAttribute("src", "media/edit-icon.png");
        eimage.setAttribute("onclick", "editARow(this)");
        eimage.setAttribute("alt", "edit icon");
        newCell3.appendChild(eimage);

        var dimage = document.createElement("img");
        dimage.setAttribute("src", "media/delete-icon.png");
        dimage.setAttribute("onclick", "deleteARow(this)");
        dimage.setAttribute("alt", "delete icon");
        newCell3.appendChild(dimage);
        newRow.appendChild(newCell3);

        // Find the table body element
        // Append the new row before the new input row
        var tableBody = document.getElementById("domTable");
        var newInputRow = document.getElementById("newInput");
        tableBody.insertBefore(newRow, newInputRow);

        // Reset Input Values to Blank
        item.value = "";
        price.value = "";
    }
}

function deleteARow(icon) {
    var row = icon.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editARow(icon) {
    var row = icon.parentNode.parentNode;
    var firstNameNode = row.firstChild;
    var firstNameText = firstNameNode.textContent;
    var lastNameNode = row.getElementsByTagName("td")[1];
    var lastNameText = lastNameNode.textContent;
    firstNameNode.innerHTML = '<input class="firstNameEdit" name="firstNameEdit" value="' + firstNameText + '" onchange="ifEmpty(this)"/>';
    lastNameNode.innerHTML = '<input class="lastNameEdit" name="lastNameEdit" value="' + lastNameText + '" onchange="ifEmpty(this)"/>';
    icon.setAttribute("src", "media/save-icon.png");
    icon.setAttribute("alt", "save icon");
    icon.setAttribute("onclick", "saveARow(this)");
}

function saveARow(icon) {
    var row = icon.parentNode.parentNode;
    var firstNameNode = row.getElementsByClassName("firstNameEdit")[0];
    var firstNameText = firstNameNode.value;
    var lastNameNode = row.getElementsByClassName("lastNameEdit")[0];
    var lastNameText = lastNameNode.value;
    if (firstNameText === "" || lastNameText === "") {
        ifEmpty(firstNameNode);
        ifEmpty(lastNameNode);
    } else {
        firstNameNode.parentNode.innerHTML = firstNameText;
        lastNameNode.parentNode.innerHTML = lastNameText;
        icon.setAttribute("src", "media/edit-icon.png");
        icon.setAttribute("alt", "edit icon");
        icon.setAttribute("onclick", "editARow(this)");
    }

}

function ifEmpty(input) {

    if (input.value === "") {
        input.style.borderColor = "red";
    } else {
        input.style.borderColor = "initial";
    }

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

/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::  10: Audio, Video, Canvas  ::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

function draw(x, y) {
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    ctx.save();

    ctx.clearRect(0, 0, 300, 300);


    ctx.fillStyle = "rgba(0, 0, 255, .25)";
    ctx.beginPath();
    ctx.rect(0, 0, 150, 150);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255, 0, 0, .5)";
    ctx.beginPath();
    ctx.rect(150, 0, 150, 150);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(0, 255, 0, .5)";
    ctx.beginPath();
    ctx.rect(0, 150, 150, 150);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(125, 255, 255, .5)";
    ctx.beginPath();
    ctx.rect(150, 150, 150, 150);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255, 255, 255, .5)";
    ctx.beginPath();
    ctx.rect(0, 0, 300, 300);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.font = "13px Arial";
    ctx.fillText("Surf the sine wave!", (x + 20), (y + 6));

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, (y / 15), 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    x += .6;

    if (x >= 300) {
        x = 0;
    }
    var loopTimer = setTimeout('draw(' + x + ',' + (150.0 - Math.sin(x * Math.PI / 90) * 120) + ')', 10);

    for (x = 0; x < 360; x += 20) {
        ctx.moveTo(x + 5, 150);
        ctx.lineTo(x, 150);
    }
    ctx.moveTo(0, 180);

    for (x = 0; x <= 360; x += 1) {
        y = 150.0 - Math.sin(x * Math.PI / 90) * 120;
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::  11: CSS Transition  ::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/




/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::  12: CSS Transforms  ::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/

function trf2() {
    document.getElementById("trf2").style.transform = "rotate(+20deg)";
}
function trf2Up() {
    document.getElementById("trf2").style.transform = "rotate(-40deg)";
}
function trf2Out() {
    document.getElementById("trf2").style.transform = "rotate(0deg)";
}

function rotatex(value)
{
document.getElementById('flipBox').style.webkitTransform="rotatex(" + value + "deg)";
document.getElementById('flipBox').style.msTransform="rotatex(" + value + "deg)";
document.getElementById('flipBox').style.MozTransform="rotatex(" + value + "deg)";
document.getElementById('flipBox').style.OTransform="rotatex(" + value + "deg)";
document.getElementById('flipBox').style.transform="rotatex(" + value + "deg)";
document.getElementById('xval').innerHTML=value + "deg";
}

function rotatey(value)
{
document.getElementById('flipBox').style.webkitTransform="rotatey(" + value + "deg)";
document.getElementById('flipBox').style.msTransform="rotatey(" + value + "deg)";
document.getElementById('flipBox').style.MozTransform="rotatey(" + value + "deg)";
document.getElementById('flipBox').style.OTransform="rotatey(" + value + "deg)";
document.getElementById('flipBox').style.transform="rotatey(" + value + "deg)";
document.getElementById('yval').innerHTML=value + "deg";
}

function rotatez(value)
{
document.getElementById('flipBox').style.webkitTransform="rotatez(" + value + "deg)";
document.getElementById('flipBox').style.msTransform="rotatez(" + value + "deg)";
document.getElementById('flipBox').style.MozTransform="rotatez(" + value + "deg)";
document.getElementById('flipBox').style.OTransform="rotatez(" + value + "deg)";
document.getElementById('flipBox').style.transform="rotatez(" + value + "deg)";
document.getElementById('zval').innerHTML=value + "deg";
}