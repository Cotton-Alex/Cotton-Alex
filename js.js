/* Javascript file to hold some of the functions used in this site ************/




/* SECTION 04 *****************************************************************/

function jsonParse(url, divId, isJSON) {
    var i = document.getElementById("sliderRange").value;
    var xmlhttp = new XMLHttpRequest();//connection to server
    xmlhttp.onreadystatechange =
            function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) //is the file done loading and error free?
                    parseDataFunc(xmlhttp.responseText, divId, isJSON, i);//pass info to the parse function
            };
    xmlhttp.open("GET", url, true);// Send a Request To a Server
    xmlhttp.send();
}

function parseDataFunc(response, divId, isJSON, i) {
    var responseText = (isJSON) ? JSON.parse(response) : response;// if xmlhttp.responseText/response is JSON then parse it
    console.log(responseText, divId, isJSON, i);
    document.getElementById(divId).innerHTML = //update page with JSON info
            "<ul id='pbAJAX'><li><div><img class='pbPicAJAX' src='"
            + responseText[i].card + "' height='250'>"
            + "<div class='pbInfoAJAX'> Name: " + responseText[i].name + "<br>"
            + responseText[i].from + "<br>\n\
                Battlefield: " + responseText[i].stats.battlefield + "<br>\n\
                Life: " + responseText[i].stats.life + "<br>\n\
                Spellboard: " + responseText[i].stats.spellboard + "<br>\n\
                Ability: " + responseText[i].stats.ability + "</div></div></li>\n\
                \n\
                <li><div><img class='pbPicAJAX' src='" + responseText[i].unique.card
            + "' height='250'>"
            + "<div class='pbInfoAJAX'>Unique Card: "
            + responseText[i].unique.name + "<br>"
            + "Type: " + responseText[i].unique.type + "<br>"
            + "Placement: " + responseText[i].unique.location + "</div></div></li></ul><br>";
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
            document.getElementById("lsGreeting").innerHTML = "<span><b>"
                    + vName + "!!</b> That's right. Welcome back "
                    + vName + ", I knew you looked familiar!</span> <button onclick="
                    + "'clearVisitorName()'" + ">I can try to forget your name\n\
                    if you click here...</button>";
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
//var itemText, priceText;

var item = "item";
var price = "0.00";



function addItem() {
    var item = document.getElementById("item");
    var price = document.getElementById("price");

    if (item.value === "" || price.value === "") {
        ifEmpty(item);
        ifEmpty(price);
    } else {
        // Create Row
        var newRow = document.createElement("tr");

        // Create item cell and append text
        var newCell = document.createElement("td");
        var itemText = document.createTextNode(item.value);
        newCell.appendChild(itemText);
        newRow.appendChild(newCell);

        // Create price cell and append text
        var newCell2 = document.createElement("td");
        var priceText = document.createTextNode(price.value);
        newCell2.appendChild(priceText);
        newRow.appendChild(newCell2);

        // Create edit and remove icon image and set their attributes
        var newCell3 = document.createElement("td");
        var editImage = document.createElement("img");
        editImage.setAttribute("class", "em em-pencil");
        editImage.setAttribute("onclick", "editARow(this)");
        newCell3.appendChild(editImage);
        
        var newCell4 = document.createElement("td");
        var deleteImage = document.createElement("img");
        deleteImage.setAttribute("class", "em em-no_entry");
        deleteImage.setAttribute("onclick", "deleteARow(this)");
        newCell3.appendChild(deleteImage);
        newRow.appendChild(newCell3);

        // Find the table body element
        // Append the new row before the new input row
        var tableBody = document.getElementById("domTable");
        var newInputRow = document.getElementById("newInput");
        tableBody.insertBefore(newRow, newInputRow);

        // Reset Input Values to Blank
        item.value = "item";
        price.value = "0.00";
    }
}

function deleteARow(icon) {
    var row = icon.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function editARow(icon) {
    var row = icon.parentNode.parentNode;
    var itemNode = row.firstChild;
    var itemText = itemNode.textContent;
    var priceNode = row.getElementsByTagName("td")[1];
    var priceText = priceNode.textContent;
    itemNode.innerHTML = '<input class="itemEdit" name="itemEdit" value="' + itemText + '" onchange="ifEmpty(this)"/>';
    priceNode.innerHTML = '<input class="priceEdit" name="priceEdit" value="' + priceText + '" onchange="ifEmpty(this)"/>';
    icon.setAttribute("class", "em em-heavy_check_mark");
    icon.setAttribute("onclick", "saveARow(this)");
}

function saveARow(icon) {
    var row = icon.parentNode.parentNode;
    var itemNode = row.getElementsByClassName("itemEdit")[0];
    var itemText = itemNode.value;
    var priceNode = row.getElementsByClassName("priceEdit")[0];
    var priceText = priceNode.value;
    if (itemText === "" || priveText === "") {
        ifEmpty(itemNode);
        ifEmpty(priceNode);
    } else {
        itemNode.parentNode.innerHTML = itemText;
        priceNode.parentNode.innerHTML = priceText;
        icon.setAttribute("class", "em em-heavy_check_mark.png");
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

function createShapeA() {
    var wA = document.getElementById("widthA").value;
    var wtA = document.getElementById("widthTimeA").value;
    var weA = document.getElementById("widthEaseA").value;
    var hA = document.getElementById("heightA").value;
    var htA = document.getElementById("heightTimeA").value;
    var heA = document.getElementById("heightEaseA").value;
    var cA = document.getElementById("colorA").value;
    var ctA = document.getElementById("colorTimeA").value;
    var ceA = document.getElementById("colorEaseA").value;
    var bwA = document.getElementById("borderWidthA").value;
    var bwtA = document.getElementById("borderWidthTimeA").value;
    var bweA = document.getElementById("borderWidthEaseA").value;
    var bcA = document.getElementById("borderColorA").value;
    var bctA = document.getElementById("borderColorTimeA").value;
    var bceA = document.getElementById("borderColorEaseA").value;
    var brA = document.getElementById("borderRadiusA").value;
    var brtA = document.getElementById("borderRadiusTimeA").value;
    var breA = document.getElementById("borderRadiusEaseA").value;
    var rA = document.getElementById("rotationA").value;
    var rtA = document.getElementById("rotationTimeA").value;
    var reA = document.getElementById("rotationEaseA").value;
    document.getElementById('shapeA').style.width = wA + "px";
    document.getElementById('shapeA').style.height = hA + "px";
    document.getElementById('shapeA').style.background = cA;
    document.getElementById('shapeA').style.border = bwA + "px solid " + bcA;
    document.getElementById('shapeA').style.borderRadius = brA + "%";
    document.getElementById('shapeA').style.transform = "rotate(" + rA + "deg)";
    document.getElementById('shapeA').style.transition = 
            "width " + wtA + "s " + weA + 
            ", height " + htA + "s " + heA + 
            ", background-color " + ctA + "s " + ceA + 
            ", border-width " + bwtA + "s " + bweA + 
            ", border-color " + bctA + "s " + bceA + 
            ", border-radius " + brtA + "s " + breA +
            ", transform " + rtA + "s " + reA;
    document.getElementById('btnShapeA').textContent = "Change to B";
    document.getElementById('btnShapeA').setAttribute( "onClick", "javascript: transitionShapeA()" );
    
    console.log("width " + wtA + "s " + weA + 
            ", height " + htA + "s " + heA + 
            ", background-color " + ctA + "s " + ceA + 
            ", border-width " + bwtA + "s " + bweA + 
            ", border-color " + bctA + "s " + bceA + 
            ", border-radius " + brtA + "s " + breA +
            ", rotate " + rtA + "s " + reA);
}

function transitionShapeA() {
    var wB = document.getElementById("widthB").value;
    var wtB = document.getElementById("widthTimeB").value;
    var weB = document.getElementById("widthEaseB").value;
    var hB = document.getElementById("heightB").value;
    var htB = document.getElementById("heightTimeB").value;
    var heB = document.getElementById("heightEaseB").value;
    var cB = document.getElementById("colorB").value;
    var ctB = document.getElementById("colorTimeB").value;
    var ceB = document.getElementById("colorEaseB").value;
    var bwB = document.getElementById("borderWidthB").value;
    var bwtB = document.getElementById("borderWidthTimeB").value;
    var bweB = document.getElementById("borderWidthEaseB").value;
    var bcB = document.getElementById("borderColorB").value;
    var bctB = document.getElementById("borderColorTimeB").value;
    var bceB = document.getElementById("borderColorEaseB").value;
    var brB = document.getElementById("borderRadiusB").value;
    var brtB = document.getElementById("borderRadiusTimeB").value;
    var breB = document.getElementById("borderRadiusEaseB").value;
    var rB = document.getElementById("rotationB").value;
    var rtB = document.getElementById("rotationTimeB").value;
    var reB = document.getElementById("rotationEaseB").value;
    document.getElementById('shapeA').style.width = wB + "px";
    document.getElementById('shapeA').style.height = hB + "px";
    document.getElementById('shapeA').style.background = cB;
    document.getElementById('shapeA').style.border = bwB + "px solid " + bcB;
    document.getElementById('shapeA').style.borderRadius = brB + "%";
    document.getElementById('shapeA').style.transform = "rotate(" + rB + "deg)";
    document.getElementById('shapeA').style.transition = 
            "width " + wtB + "s " + weB + 
            ", height " + htB + "s " + heB + 
            ", background-color " + ctB + "s " + ceB + 
            ", border-width " + bwtB + "s " + bweB + 
            ", border-color " + bctB + "s " + bceB + 
            ", border-radius " + brtB + "s " + breB +
            ", transform " + rtB + "s " + reB;
    document.getElementById('btnShapeA').textContent = "Change to A";
    document.getElementById('btnShapeA').setAttribute( "onClick", "javascript: createShapeA()" );
    
    console.log("width " + wtB + "s " + weB + 
            ", height " + htB + "s " + heB + 
            ", background-color " + ctB + "s " + ceB + 
            ", border-width " + bwtB + "s " + bweB + 
            ", border-color " + bctB + "s " + bceB + 
            ", border-radius " + brtB + "s " + breB +
            ", transform " + rtB + "s " + reB);
}
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
    document.getElementById('flipBox').style.webkitTransform = "rotatex(" + value + "deg)";
    document.getElementById('flipBox').style.msTransform = "rotatex(" + value + "deg)";
    document.getElementById('flipBox').style.MozTransform = "rotatex(" + value + "deg)";
    document.getElementById('flipBox').style.OTransform = "rotatex(" + value + "deg)";
    document.getElementById('flipBox').style.transform = "rotatex(" + value + "deg)";
    document.getElementById('xval').innerHTML = value + "deg";
}

function rotatey(value)
{
    document.getElementById('flipBox').style.webkitTransform = "rotatey(" + value + "deg)";
    document.getElementById('flipBox').style.msTransform = "rotatey(" + value + "deg)";
    document.getElementById('flipBox').style.MozTransform = "rotatey(" + value + "deg)";
    document.getElementById('flipBox').style.OTransform = "rotatey(" + value + "deg)";
    document.getElementById('flipBox').style.transform = "rotatey(" + value + "deg)";
    document.getElementById('yval').innerHTML = value + "deg";
}

function rotatez(value)
{
    document.getElementById('flipBox').style.webkitTransform = "rotatez(" + value + "deg)";
    document.getElementById('flipBox').style.msTransform = "rotatez(" + value + "deg)";
    document.getElementById('flipBox').style.MozTransform = "rotatez(" + value + "deg)";
    document.getElementById('flipBox').style.OTransform = "rotatez(" + value + "deg)";
    document.getElementById('flipBox').style.transform = "rotatez(" + value + "deg)";
    document.getElementById('zval').innerHTML = value + "deg";
}

function turnDiceOne() {
    console.log("turnDiceOne function trigger");
    document.getElementById('x3DRange').value = 1;
    document.getElementById('y3DRange').value = 1;
    document.getElementById('z3DRange').value = 1;
    document.getElementById('a3DRange').value = 1;
    rotate3D();
}
function turnDiceTwo() {
    console.log("turnDiceOne function trigger");
    document.getElementById('x3DRange').value = 100;
    document.getElementById('y3DRange').value = 1;
    document.getElementById('z3DRange').value = 100;
    document.getElementById('a3DRange').value = 179;
    rotate3D();
}
function turnDiceThree() {
    console.log("turnDiceOne function trigger");
    document.getElementById('x3DRange').value = -100;
    document.getElementById('y3DRange').value = 1;
    document.getElementById('z3DRange').value = 1;
    document.getElementById('a3DRange').value = 90;
    rotate3D();
}
function turnDiceFour() {
    console.log("turnDiceOne function trigger");
    document.getElementById('x3DRange').value = 100;
    document.getElementById('y3DRange').value = 1;
    document.getElementById('z3DRange').value = 1;
    document.getElementById('a3DRange').value = 90;
    rotate3D();
}
function turnDiceFive() {
    console.log("turnDiceOne function trigger");
    document.getElementById('x3DRange').value = 1;
    document.getElementById('y3DRange').value = 100;
    document.getElementById('z3DRange').value = 1;
    document.getElementById('a3DRange').value = 90;
    rotate3D();
}
function turnDiceSix() {
    console.log("turnDiceOne function trigger");
    document.getElementById('x3DRange').value = 100;
    document.getElementById('y3DRange').value = 100;
    document.getElementById('z3DRange').value = 1;
    document.getElementById('a3DRange').value = 179;
    rotate3D();
}

function rotate3D() {
    var x3D = (document.getElementById('x3DRange').value) / 100;
    var y3D = (document.getElementById('y3DRange').value) / 100;
    var z3D = (document.getElementById('z3DRange').value) / 100;
    var a3D = (document.getElementById('a3DRange').value);
    var s3D = (document.getElementById('s3DRange').value) / 100;
    var p3D = (document.getElementById('p3DRange').value);
    var tx3D = (document.getElementById('tx3DRange').value);
    var ty3D = (document.getElementById('ty3DRange').value);
    var tz3D = (document.getElementById('tz3DRange').value);
    console.log("x3D = " + x3D);
    console.log("y3D = " + y3D);
    console.log("z3D = " + z3D);
    console.log("a3D = " + a3D);
    console.log("s3D = " + s3D);
    console.log("p3D = " + p3D);
    console.log("tx3D = " + tx3D);
    console.log("ty3D = " + ty3D);
    console.log("tz3D = " + tz3D);
    document.getElementById('dice3D').style.webkitTransform = "rotate3D(" + x3D + ", " + y3D + ", " + z3D + ", " + a3D + "deg)";
    document.getElementById('dice3D').style.msTransform = "rotate3D(" + x3D + ", " + y3D + ", " + z3D + ", " + a3D + "deg)";
    document.getElementById('dice3D').style.MozTransform = "rotate3D(" + x3D + ", " + y3D + ", " + z3D + ", " + a3D + "deg)";
    document.getElementById('dice3D').style.OTransform = "rotate3D(" + x3D + ", " + y3D + ", " + z3D + ", " + a3D + "deg)";
    document.getElementById('dice3D').style.transform = "rotate3D(" + x3D + ", " + y3D + ", " + z3D + ", " + a3D + "deg)";
    document.getElementById('3dXVal').innerHTML = x3D ;
    document.getElementById('3dYVal').innerHTML = y3D ;
    document.getElementById('3dZVal').innerHTML = z3D ;
    document.getElementById('3dAVal').innerHTML = a3D + "deg";
    document.getElementById('diceTranslateContainer').style.webkitTransform = "translate3d(" + tx3D + "px, " + ty3D + "px, " + tz3D + "px)";
    document.getElementById('diceTranslateContainer').style.msTransform = "translate3d(" + tx3D + "px, " + ty3D + "px, " + tz3D + "px)";
    document.getElementById('diceTranslateContainer').style.MozTransform = "translate3d(" + tx3D + "px, " + ty3D + "px, " + tz3D + "px)";
    document.getElementById('diceTranslateContainer').style.OTransform = "translate3d(" + tx3D + "px, " + ty3D + "px, " + tz3D + "px)";
    document.getElementById('diceTranslateContainer').style.transform = "translate3d(" + tx3D + "px, " + ty3D + "px, " + tz3D + "px)";
    document.getElementById('3dTXVal').innerHTML = tx3D + "px";
    document.getElementById('3dTYVal').innerHTML = ty3D + "px";
    document.getElementById('3dTZVal').innerHTML = tz3D + "px";
    document.getElementById('dice3DContainer').style.webkitTransform = "scale(" + s3D + ")";
    document.getElementById('dice3DContainer').style.msTransform = "scale(" + s3D + ")";
    document.getElementById('dice3DContainer').style.MozTransform = "scale(" + s3D + ")";
    document.getElementById('dice3DContainer').style.OTransform = "scale(" + s3D + ")";
    document.getElementById('dice3DContainer').style.transform = "scale(" + s3D + ")";
    document.getElementById('3dSVal').innerHTML = s3D + "x";
    document.getElementById('dice3DContainer').style.webkitPerspective = p3D + "px" ;
    document.getElementById('dice3DContainer').style.msPerspective = p3D + "px";
    document.getElementById('dice3DContainer').style.MozPerspective = p3D + "px";
    document.getElementById('dice3DContainer').style.OPerspective = p3D + "px";
    document.getElementById('dice3DContainer').style.perspective = p3D + "px";
    document.getElementById('3dPVal').innerHTML = p3D + "px";
}

