var rabbit = "topDrop";
var carrot = "topDrop";
var fox = "topDrop";
var boatLocation = 0;
var dropFrom = "topDrop";

function allowDrop(ev) {
    ev.preventDefault();
}

document.querySelector('#rabbit').addEventListener('click', move(rabbit));
document.querySelector('#carrot').addEventListener('click', move(carrot));
document.querySelector('#fox').addEventListener('click', move(fox));

function move(object) {
    console.log("object = " + object);
}


function flipBack()
{
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
    document.querySelector('.flipWrapper').style.webkitTransform = "rotatey(0deg)";
    document.querySelector('.flipWrapper').style.msTransform = "rotatey(0deg)";
    document.querySelector('.flipWrapper').style.MozTransform = "rotatey(0deg)";
    document.querySelector('.flipWrapper').style.OTransform = "rotatey(0deg)";
    document.querySelector('.flipWrapper').style.transform = "rotatey(0deg)";
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    var dropFrom = (ev.target.parentNode.id);
    if ((dropFrom === "topDrop") && (boatLocation === 1)) {
        return false;
    }
    if ((dropFrom === "bottomDrop") && (boatLocation === 0)) {
        return false;
    }
    if (boatLocation === 0) {
        document.getElementById("bottomDrop").setAttribute("onDrop", false);
        document.getElementById("topDrop").setAttribute("onDrop", "drop(event)");
    }
    if (boatLocation === 1) {
        document.getElementById("topDrop").setAttribute("onDrop", false);
        document.getElementById("bottomDrop").setAttribute("onDrop", "drop(event)");
    }
    console.log("------------------- drag");
    console.log("object = " + ev.target.id);
    console.log("dropFrom = " + dropFrom);
    console.log("boatLocation = " + boatLocation);
}

function drop(ev) {
    ev.preventDefault();
    //var dropFrom = (ev.target.id);
    var dropFrom = (ev.target.parentNode.id);
    var dropTo = (ev.target.id);
    console.log("------------------- drop");
    console.log("object = " + ev.target);
    console.log("dropFrom = " + dropFrom);
    console.log("dropTo = " + dropTo);
//        if (((dropFrom === "topDrop") && (dropTo === "bottomDrop")) || ((dropFrom === "bottomDrop") && (dropTo === "topDrop")))
//            return false;
    if (!ev.target.getAttribute("ondrop"))
        return false;
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
function dropBoat(ev) {
    ev.preventDefault();
    //var dropFrom = (ev.target.parentNode.id);
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
    if (!ev.target.getAttribute("ondrop"))
        return false;
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function boatCross() {
    var carrotParentNode = document.getElementById("carrot").parentNode;
    var carrotParentId = (carrotParentNode.id);
    var rabbitParentNode = document.getElementById("rabbit").parentNode;
    var rabbitParentId = (rabbitParentNode.id);
    var foxParentNode = document.getElementById("fox").parentNode;
    var foxParentId = (foxParentNode.id);
    var waterHeight = (document.getElementById("water").width);
    console.log("------------------- boatCross");
    console.log("carrotParentId = " + carrotParentId);
    console.log("rabbitParentId = " + rabbitParentId);
    console.log("foxParentId = " + foxParentId);
    console.log("waterheight = " + waterHeight);
    if (boatLocation === 0) {
        if ((carrotParentId === "topDrop" && rabbitParentId === "topDrop") || (rabbitParentId === "topDrop" && foxParentId === "topDrop")) {
            console.log("(boatLocation === 0) error");
            return false;
        }
        document.getElementById("boat").style.transform = "translateY(100%)";
        boatLocation = 1;
        return;
    }
    if (boatLocation === 1) {
        if ((carrotParentId === "bottomDrop" && rabbitParentId === "bottomDrop") || (rabbitParentId === "bottomDrop" && foxParentId === "bottomDrop")) {
            console.log("(boatLocation === 1) error");
            return false;
        }
        document.getElementById("boat").style.transform = "translateY(0%)";
        boatLocation = 0;
        return;
    } else {
        console.log("function boatCross error");
    }

}
