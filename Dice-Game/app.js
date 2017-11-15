var scores, roundScore, activePlayer, gamePlaying, responsiveVoice, commentNumber;

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
            document.getElementById('diceID').style.top = (65 + (Math.random() * 160)) + "px";

            //transform dice angle
            document.querySelector('#diceID').style.transform = 'rotate(' + diceAngle + 'deg)';

            //send back through loop
            console.log('diceRoll i = ' + i);
            //time delay between each iteration
        }, 200 * i);

    }
    ;
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

function jsonParse(url, dice, isJSON) {
    var i = document.getElementById("sliderRange").value;
    var xmlhttp = new XMLHttpRequest();//connection to server
    xmlhttp.onreadystatechange =
            function () {
                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) //is the file done loading and error free?
                    parseDataFunc(xmlhttp.responseText, dice, commentNumber, isJSON);//pass info to the parse function
            };
    xmlhttp.open("GET", url, true);// Send a Request To a Server
    xmlhttp.send();
}

function parseDataFunc(response, divId, isJSON, i) {
    var responseText = (isJSON) ? JSON.parse(response) : response;// if xmlhttp.responseText/response is JSON then parse it
    responseText[i].comment;
    console.log(responseText[i].comment);
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
            document.getElementById('diceID').style.top = (65 + (Math.random() * 160)) + "px";
            // voice comment on dice roll
            var commentNumber = (Math.floor(Math.random() * 6));
            var voiceComment = jsonParse("diceComments.json", dice, commentNumber, "true");
            responsiveVoice.speak(voiceComment);
            

            //update the round score IF rolled number was not 1
            if (dice !== 1) {
                //add score
                roundScore += dice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                document.querySelector('#player-' + activePlayer + '-progressBar').style.height = scores[activePlayer] + roundScore + "%";
            } else {
                //next player
                roundScore = 0;
                document.querySelector('#player-' + activePlayer + '-progressBar').style.height = scores[activePlayer] + "%";
                nextPlayer();
            }
        }, 200 * diceBounceTimes);
    });
}
