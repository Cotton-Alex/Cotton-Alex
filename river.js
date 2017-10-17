var rabbit = 0;
var carrot = 0;
var fox = 0;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var targetChildCount = ev.target.childElementCount;
    console.log (targetChildCount);
        if (!ev.target.getAttribute("ondrop"))
            return false;
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}