
var scores, roundScore, activePlayer, gamePlaying, responsiveVoice, commentNumber, response, voiceList, voice;
var winScore = 100;

voice = ('US English Female');
responsiveVoice.setDefaultVoice(voice);
console.log("voice = " + voice);

voicelist = responsiveVoice.getVoices();
console.log(voicelist);

//document.getElementById('roll-0').addEventListener("click", responsiveVoice.clickEvent);
//document.getElementById('roll-1').addEventListener("click", responsiveVoice.clickEvent);

//document.querySelector('#roll-0').addEventListener("click", responsiveVoice.clickEvent);
//document.querySelector('#roll-1').addEventListener("click", responsiveVoice.clickEvent);

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

init();

document.querySelector('.btn-hold').addEventListener('click', function () {
    // add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // update the ui
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check for win
    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.btn-hold').style.display = 'none';
        document.querySelector('#roll-0').style.display = 'none';
        document.querySelector('#roll-1').style.display = 'none';
        document.querySelector('.dice').style.display = 'none';
    } else {
        nextPlayer();
    }
});

function diceRoll(diceBounceTimes) {
    console.log('diceRoll Initial diceBounceTimes = ' + diceBounceTimes);

    //create loop
    for (var i = 0; i < diceBounceTimes; i++) {
        setTimeout(function () {
            console.log('Current diceBounceTimes =' + i);

            //random dice number
            diceBounceNumber = Math.floor(Math.random() * 6) + 1;
            console.log('dice = ' + diceBounceNumber);

            //random angle
            var diceAngle = Math.floor(Math.random() * 180) + 1;
            console.log('diceAngle = ' + diceAngle);

            //setTimeout(function() {
            //display dice number

            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'player-' + activePlayer + '-dice-' + diceBounceNumber + '.png';
            document.getElementById('diceID').style.left = (0 + (Math.random() * 60)) + "%";
            document.getElementById('diceID').style.top = (0 + (Math.random() * 160)) + "px";

            //transform dice angle
            document.querySelector('#diceID').style.transform = 'rotate(' + diceAngle + 'deg)';

            //send back through loop
            console.log('diceRoll i = ' + i);
            //time delay between each iteration
        }, 200 * i);

    }
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    if (activePlayer === 1) {
        document.querySelector('#roll-0').style.display = 'none';
        document.querySelector('#roll-1').style.display = 'block';
    } else {
        document.querySelector('#roll-0').style.display = 'block';
        document.querySelector('#roll-1').style.display = 'none';
    }
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('#roll-0').style.display = 'block';
    document.querySelector('#roll-1').style.display = 'none';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#player-0-progressBar').style.height = "0%";
    document.querySelector('#player-1-progressBar').style.height = "0%";
}

document.querySelector('.btn-settings').addEventListener('click', flip);

function flip()
{
    console.log("Settings clicked");
    document.querySelector('.flipWrapper').style.webkitTransform = "rotatey(180deg)";
    document.querySelector('.flipWrapper').style.msTransform = "rotatey(180deg)";
    document.querySelector('.flipWrapper').style.MozTransform = "rotatey(180deg)";
    document.querySelector('.flipWrapper').style.OTransform = "rotatey(180deg)";
    document.querySelector('.flipWrapper').style.transform = "rotatey(180deg)";
}

document.querySelector('.btn-play').addEventListener('click', flipBack);

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

function jsonParse(url, dice, commentNumber, isJSON) {
    dice = dice - 1;
    console.log(url, dice, commentNumber, isJSON);
    var xmlhttp = new XMLHttpRequest();//connection to server
    xmlhttp.onreadystatechange =
            function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) //is the file done loading and error free?
                    parseDataFunc(xmlhttp.responseText, dice, commentNumber, isJSON);//pass info to the parse function
            };
    xmlhttp.open("GET", url, dice, commentNumber, true);// Send a Request To a Server
    xmlhttp.send();
}

function parseDataFunc(response, dice, commentNumber, isJSON) {
    var responseText = (isJSON) ? JSON.parse(response) : response;// if xmlhttp.responseText/response is JSON then parse it
    //responseText[dice].comment[commentNumber];
    console.log("JSON = " + response, dice, commentNumber, isJSON);
    console.log("Chosen text = " + responseText[dice].comment[commentNumber]);
    responsiveVoice.speak("" + responseText[dice].comment[commentNumber] + "");
    //document.getElementById("voiceString").innerHTML = responseText[dice].comment[commentNumber];
}

//var playerBtnRoll = document.querySelectorAll('.btn-roll');
var playerBtnRoll = document.querySelectorAll('.btn-roll');
for (var i = 0; i, playerBtnRoll.length; i++) {
    playerBtnRoll[i].addEventListener('click', function () {
        var diceBounceTimes = Math.floor(Math.random() * 3) + 3;
        diceRoll(diceBounceTimes);
        setTimeout(function () {
            //random number
            dice = (Math.floor(Math.random() * 6) + 1);
            console.log("final dice roll = " + dice);
            //display result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'player-' + activePlayer + '-dice-' + dice + '.png';
            //random dice location
            document.getElementById('diceID').style.left = (0 + (Math.random() * 60)) + "%";
            document.getElementById('diceID').style.top = (45 + (Math.random() * 160)) + "px";
            // voice comment on dice roll
            var commentNumber = (Math.floor(Math.random() * 6));
            jsonParse("diceComments.json", dice, commentNumber, "true");
            //update the round score IF rolled number was not 1
            if (dice !== 1) {
                //add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                var totalPlusCurrent = scores[activePlayer] + roundScore;
                if (totalPlusCurrent >= winScore) {
                    totalPlusCurrent = winScore;
                }
                document.querySelector('#player-' + activePlayer + '-progressBar').style.height = totalPlusCurrent + "%";
//                document.querySelector('#player-' + activePlayer + '-progressBar').style.background = "linear-gradient(90deg, #EB4D4D" + 25 + "%, #2C729E " +75 + "%)";
            } else {
                //next player
                roundScore = 0;
                document.querySelector('#player-' + activePlayer + '-progressBar').style.height = scores[activePlayer] + "%";
                nextPlayer();
            }
        }, 200 * diceBounceTimes);
    });
}


var p0Red = document.querySelector('#p0Red');
var p0Green = document.querySelector('#p0Green');
var p0Blue = document.querySelector('#p0Blue');
var p0Red_out = document.querySelector('#p0Red_out');
var p0Green_out = document.querySelector('#p0Green_out');
var p0Blue_out = document.querySelector('#p0Blue_out');
var p0Color = "rgb(" + p0Red +", " + p0Green + ", " + p0Blue + ");";
    document.querySelector('.btn-hold').style.display = 'block';
    console.log("rgb= " + p0Red, p0Green, p0Blue);