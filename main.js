let fields = [];
let currentPlayer = 'circle';
let gameOver = false;
let gameMove = 0;
let winner;


/**
 * Sounds and volume
 */
let endAudio = new Audio('./sounds/end_game.mp3');
endAudio.volume = 0.5;


/** 
 * Sets the sign of active player in array 
 */
function setSign(position) {
    if (!gameOver) {
        if (currentPlayer == 'cross') {
            currentPlayer = 'circle';
        } else {
            currentPlayer = 'cross';
        }

        fields[position] = currentPlayer;
        showSign(currentPlayer, position);
        checkWinner();
        setActivePlayer();
    }
}


/** 
 * Shows cross or circle of selected field
 */
function showSign(currentPlayer, position) {
    let sign = document.getElementById(currentPlayer + position);
    sign.classList.remove('d-none');
    noPointerEvents(position);
}


/** 
 * Disables pointer events for selected field 
 */
function noPointerEvents(position) {
    let field = document.getElementById('tt-field' + position);
    field.classList.add('no-event');
}


/** 
 * Disables pointer evnets for all field 
 */
function noPointerEventsAllFields() {
    for (let i = 0; i < 9; i++) {
        document.getElementById('tt-field' + i).classList.add('no-event');
    }
}


/** 
 * Sets inactive player to transparent 
 */
function setActivePlayer() {
    document.getElementById('player-1').classList.toggle('player-inactive');
    document.getElementById('player-2').classList.toggle('player-inactive');
}


/** 
 * Checks winning fields 
 */
function checkWinner() {
    winner = '';

    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
    gameEndScreen(winner);
}


/**
 * Checks horizontal wins
 */
function checkHorizontalWin() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        changeBgColor(0, 1, 2);
        return winner = fields[0];
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        changeBgColor(3, 4, 5);
        return winner = fields[3];
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        changeBgColor(6, 7, 8);
        return winner = fields[6];
    }
}


/** 
 * Checks vertical wins
 */
function checkVerticalWin() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        changeBgColor(0, 3, 6);
        return winner = fields[0];
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        changeBgColor(1, 4, 7);
        return winner = fields[1];
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        changeBgColor(2, 5, 8);
        return winner = fields[2];
    }
}


/** 
 * Checks diagonal wins 
 */
function checkDiagonalWin() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        changeBgColor(0, 4, 8);
        return winner = fields[0];
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        changeBgColor(2, 4, 6);
        return winner = fields[2];
    }
}


/** 
 * Sets background-color to green if it is a winning field 
 */
function changeBgColor(f1, f2, f3) {
    document.getElementById(`tt-field${f1}`).classList.add('green-bg');
    document.getElementById(`tt-field${f2}`).classList.add('green-bg');
    document.getElementById(`tt-field${f3}`).classList.add('green-bg');
}


/** 
 * Sets the winning screen 
 */
function gameEndScreen(winner) {
    if (winner) {
        endAudio.play();
        gameOver = true;
        noPointerEventsAllFields();
        showWinnerScreen(winner);
        showRestartBtn();
    } else {
        noPlayerWins();
    }
}


/** 
 * Checks if no player wins 
 */
function noPlayerWins() {
    let winnerImage = document.getElementById('winner-image');
    gameMove++;

    if (gameMove == 9) {
        winnerImage.src = './img/win_noplayer.png';
        document.getElementById('player-box').classList.add('transparent');
        gameOver = true;
        showRestartBtn();
        winnerImage.classList.add('scale');
    }
}


/** 
 * Shows the winning image 
 */
function showWinnerScreen(winner) {
    let winnerImage = document.getElementById('winner-image');
    document.getElementById('player-box').classList.add('transparent');

    if (winner == 'cross') {
        winnerImage.src = './img/win_player1.png';
    } else {
        winnerImage.src = './img/win_player2.png';
    }

    winnerImage.classList.add('scale');
}


/** 
 * Shows the restart button 
 */
function showRestartBtn() {
    document.getElementById('restart-btn').classList.remove('d-none');
}


/** 
 * Restarts the game 
 */
function restartGame() {
    document.getElementById('winner-image').classList.remove('scale');
    document.getElementById('restart-btn').classList.add('d-none');
    document.getElementById('player-box').classList.remove('transparent');
    document.getElementById('player-1').classList.remove('player-inactive');
    document.getElementById('player-2').classList.add('player-inactive');
    gameOver = false;
    gameMove = 0;
    currentPlayer = 'circle';

    clearFields();
}


/** 
 * Clears the gamefield 
 */
function clearFields() {
    for (let i = 0; i < 9; i++) {
        document.getElementById('cross' + i).classList.add('d-none');
        document.getElementById('circle' + i).classList.add('d-none');
        document.getElementById('tt-field' + i).classList.remove('no-event');
        document.getElementById('tt-field' + i).classList.remove('green-bg');
        setTimeout(clearWinnerImage, 1000);
    }

    fields = [];
}


/** 
 * Deletes src of winner image 
 */
function clearWinnerImage() {
    document.getElementById('winner-image').src = '';
}
