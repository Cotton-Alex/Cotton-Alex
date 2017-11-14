var scores, roundScore, activePlayer, gamePlaying;

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
    //var diceBounceTimes = Math.floor(Math.random() * 3) + 3;
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

            //time delay between number displays and rotations
            //setTimeout(function() {
            //display dice number

            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'player-' + activePlayer + '-dice-' + diceBounceNumber + '.png';
            //document.getElementById('diceID').style.margin = (100 + (Math.random() * 50)) + "px 0 0 " + (0 + (Math.random() * 240)) + "px";
            document.getElementById('diceID').style.left = (0 + (Math.random() * 60)) + "%";
            document.getElementById('diceID').style.top = (65 + (Math.random() * 160)) + "px";

            //transform dice angle
            //diceDOM.style.display.transform = 'rotate(' + diceAngle + 'deg);';
            document.querySelector('#diceID').style.transform = 'rotate(' + diceAngle + 'deg)';
            
            //send back through loop
            console.log('diceRoll i = ' + i);
            //setTimeout(diceRoll, 500);
        }, 200 * i);

    }
    ;
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //document.querySelector('.player-0-panel').classList.toggle('active');
    //document.querySelector('.player-1-panel').classList.toggle('active');
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
                diceDOM.src = 'dice-' + dice + '.png';
                document.getElementById('diceID').style.left = (0 + (Math.random() * 60)) + "%";
                document.getElementById('diceID').style.top = (65 + (Math.random() * 160)) + "px";
                
                //update the round score IF rolled number was not 1
                if (dice !== 1) {
        //add score
        roundScore += dice;
                //document.querySelector('#player-' + activePlayer + 'panel').gradient = ("0deg, #EB4D4D " + (roundScore + dice) + "%, #fff " + (roundScore + dice) + "%");
                //document.querySelector('#player-' + activePlayer + '-panel').background.color = "#EB4D4D";
                //document.querySelector('#player-' + activePlayer + '-panel').style.color = "#555";
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
