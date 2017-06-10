/* Javascript file to hold some of the functions used in this site ************/










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
function triesCount(){
    tries += 1;
    document.getElementById("triesNumber").innerHTML = tries;
}

function touchVsc() {
    document.getElementById("touchVsClick").style.color = "blue";
}

function tvsClick() {
    document.getElementById("touchVsClick").style.color = "red";
}