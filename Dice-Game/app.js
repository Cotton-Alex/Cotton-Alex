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

function diceRoll() {
    var diceBounce = Math.floor(Math.random() * 5) + 5;
    console.log('diceRoll Initial diceBounce = ' + diceBounce);

    //create loop
    for (var i = 0; i < diceBounce; i++) {
        
        console.log('Current diceBounce =' + diceBounce);
        //random dice number
        dice = Math.floor(Math.random() * 6) + 1;
        console.log('dice = ' + dice);
        //random angle
        var diceAngle = Math.floor(Math.random() * 180) + 1;
        console.log('diceAngle = ' + diceAngle);
        //display dice number
        var diceDOM = document.querySelector('.dice');
            
        
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        document.querySelector('player-current-box').style.transform = 'rotate(' + diceAngle + 'deg);';
        //transform dice angle

        //wait some time
            

        //send back through loop
        console.log('diceRoll i = ' + i);
        setTimeout(diceRoll, 500);
    };
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
}


//var diceBounce = Math.floor(Math.random() * 10) + 5;
//console.log("original diceBounce = " + diceBounce);
//create loop
//for (var i = 0; diceBounce; i++) {
//console.log('Current diceBounce =' + diceBounce);
//random dice number
//dice = Math.floor(Math.random() * 6) + 1;
//console.log('dice = ' + dice);
//random angle
//var diceAngle = Math.floor(Math.random() * 180) + 1;
//console.log('diceAngle = ' + diceAngle);
//display dice number
//var diceDOM = document.querySelector('.dice');
//diceDOM.style.display = 'block';
//diceDOM.src = 'dice-' + dice + '.png';

//transform dice angle
//diceDOM.style.transform = 'rotate ' + diceAngle + 'deg;';

//wait some time
//setTimeout ("", 3000);
//}


var playerBtnRoll = document.querySelectorAll('.btn-roll');
for (var i = 0; i, playerBtnRoll.length; i++) {

    playerBtnRoll[i].addEventListener('click', function () {
        diceRoll();
        //random number
        dice = (Math.floor(Math.random() * 6) + 1);

        //display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //update the round score IF rolled number was not 1
        if (dice !== 1) {
            //add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }

    });
}