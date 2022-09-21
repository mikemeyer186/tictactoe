let fields = [];
let currentPlayer = 'circle';
let gameOver = false;
let gameMove = 0;

let endAudio = new Audio('./sounds/end_game.mp3');
endAudio.volume = 0.5;


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


function showSign(currentPlayer, position) {
    let sign = document.getElementById(currentPlayer + position);
    sign.classList.remove('d-none');
    noPointerEvents(position);
}


function noPointerEvents(position) {
    let field = document.getElementById('tt-field' + position);
    field.classList.add('no-event');
}


function noPointerEventsAllFields() {
    for (let i = 0; i < 9; i++) {
        document.getElementById('tt-field' + i).classList.add('no-event');
    }
}


function setActivePlayer() {
    document.getElementById('player-1').classList.toggle('player-inactive');
    document.getElementById('player-2').classList.toggle('player-inactive');
}


function checkWinner() {
    let winner;

    // horizontal rows
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        changeBgColor(0, 1, 2);
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        changeBgColor(3, 4, 5);
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        changeBgColor(6, 7, 8);
    }

    // vertical rows
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        changeBgColor(0, 3, 6);
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        changeBgColor(1, 4, 7);
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        changeBgColor(2, 5, 8);
    }

    // diagonal rows
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        changeBgColor(0, 4, 8);
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        changeBgColor(2, 4, 6);
    }

    gameEndScreen(winner);
}


function changeBgColor(f1, f2, f3) {
    document.getElementById(`tt-field${f1}`).classList.add('green-bg');
    document.getElementById(`tt-field${f2}`).classList.add('green-bg');
    document.getElementById(`tt-field${f3}`).classList.add('green-bg');
}


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


function noPlayerWins() {
    let winnerImage = document.getElementById('winner-image');
    gameMove++;

    if (gameMove == 9) {
        document.getElementById('player-box').classList.add('transparent');
        winnerImage.src = './img/win_noplayer.png';
        winnerImage.classList.add('scale');
        gameOver = true;
        showRestartBtn();
    }
}


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


function showRestartBtn() {
    document.getElementById('restart-btn').classList.remove('d-none');
}


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


function clearFields() {
    for (let i = 0; i < 9; i++) {
        document.getElementById('cross' + i).classList.add('d-none');
        document.getElementById('circle' + i).classList.add('d-none');
        document.getElementById('tt-field' + i).classList.remove('no-event');
        document.getElementById('tt-field' + i).classList.remove('green-bg');
    }

    fields = [];
}
