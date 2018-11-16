/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

function initializeVarsAndScores() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    var playerDivDOM1 = document.querySelector('.player-' + activePlayer + '-panel');
    var playerDivDOM2 = document.querySelector('.player-' + (activePlayer + 1) + '-panel');

    if (!playerDivDOM1.classList.contains('active')) {
        playerDivDOM1.classList.add('active');
        playerDivDOM2.classList.remove('active');
    }


    //hide dice picture in the begining of the game
    document.querySelector('.dice').style.display = 'none';

    //Initialize Scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
}

initializeVarsAndScores();

function switchPlayer() {
    //document.getElementsByClassName('wrapper')[0].childNodes[activePlayer + 1].classList.remove('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //document.getElementsByClassName('wrapper')[0].childNodes[activePlayer + 1].classList.add('active');
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

// New game button
document.querySelector('.btn-new').addEventListener('click', function () {
    initializeVarsAndScores();
});

//roll dice button
document.querySelector('.btn-roll').addEventListener('click', function () {
    //01. Random number
    var dice = Math.ceil(Math.random() * 6);

    //02. Display result
    var currentScoreDOM = document.querySelector('#current-' + activePlayer);
    currentScoreDOM.textContent = dice;

    var diceDOMPic = document.querySelector('.dice');
    diceDOMPic.style.display = 'block';
    diceDOMPic.src = 'dice-' + dice + '.png';

    //03. Update roundScore
    var roundScoreDOM = document.querySelector('#score-' + activePlayer);
    switch (dice) {
        case 1:
            roundScore = 0;
            scores[activePlayer] = roundScore;
            roundScoreDOM.textContent = scores[activePlayer];
            currentScoreDOM.textContent = 0;
            switchPlayer();
            break;
        default:
            scores[activePlayer] += dice;
            roundScoreDOM.textContent = scores[activePlayer];
            if (scores[activePlayer] >= 100) {
                alert('PLAYER' + (activePlayer + 1) + ' wins');
            }
            break;
    }
});

//hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
    switchPlayer()
});