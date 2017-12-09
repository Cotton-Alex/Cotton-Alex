var rabbit = "topDrop";
var carrot = "topDrop";
var fox = "topDrop";
var boatLocation = 0;
var dropFrom = "topDrop";
var waterFlow = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

document.querySelector('#rabbit').addEventListener('click', move(rabbit));
document.querySelector('#carrot').addEventListener('click', move(carrot));
document.querySelector('#fox').addEventListener('click', move(fox));

function move(object) {
    console.log("object = " + object);
    document.getElementById('boat').appendChild(
            document.getElementById("'" + object + "'")
            );
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

//function draw(x, y) {
//    var canvas = document.getElementById("canvasWater");
//    var ctx = canvas.getContext("2d");
//    ctx.save();
//    
//    var colorShift = Math.floor(Math.random() * 50) + 1;
//    var gradient1 = ctx.createRadialGradient(x, y, 0, x, y, 40);
//    gradient1.addColorStop(0, "rgba(0," + (255 - colorShift) + "," + (255 - colorShift) + ",1)");
//    //gradient1.addColorStop(1,"rgba(0," + (255 - colorShift) + "," + (255 - colorShift) +",0)");
//    gradient1.addColorStop(1, "rgba(255,255,255,0)");
//    ctx.fillStyle = gradient1;
//    ctx.beginPath();
//    //ctx.arc(100,100,50,0,2*Math.PI);
//    ctx.arc(x, y, 50, 0, Math.PI * 2, true);
//    //ctx.closePath();
//    ctx.fill();
//    ctx.fillStyle = gradient1;
//    //ctx.restore();
//    ctx.beginPath();
//    
//    
//    x += 1;
//
//    if (x >= 300) {
//        x = 0;
//    }
//
//    var loopTimer = setTimeout('draw(' + x + ',' + (150.0 - Math.sin(x * Math.PI / 90) * 120) + ')', 1);
//    console.log(loopTimer);
//    ctx.moveTo(0, 180);

function draw(x, y) {
    var canvas = document.getElementById("canvasWater");
    var ctx = canvas.getContext("2d");
    //ctx.save();

    waterFlow ++;
    if (waterFlow === 90) {
        waterFlow = 0;
    }
    
    //console.log(waterFlow);
    
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

    //ctx.stroke();
}