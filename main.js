let fields = [];
let currentPlayer = 'circle';
let gameOver = false;
let gameMove = 0;

let horizontalLineTop = 'top: 177px; transform: scale(1, 1)';
let horizontalLineMid = 'top: 312px; transform: scale(1, 1)';
let horizontalLineBottom = 'top: 447px; transform: scale(1, 1)';
let verticalLineLeft = 'top: 316px; left: -265px; transform: scale(1, 1) rotate(90deg)';
let verticalLineMid = 'top: 316px; transform: scale(1, 1) rotate(90deg)';
let verticalLineRight = 'top: 316px; left: 273px; transform: scale(1, 1) rotate(90deg)';
let diagonalLineLeft = 'width: 422px; top: 316px; left: 10px; transform: scale(1, 1) rotate(45deg)';
let diagonalLineRight = 'width: 422px; top: 316px; left: -7px; transform: scale(1, 1) rotate(135deg)';


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
    let winnerLine = document.getElementById('winner-line');

    // horizontal rows
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        winnerLine.style = horizontalLineTop;
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        winnerLine.style = horizontalLineMid;
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        winnerLine.style = horizontalLineBottom;
    }

    // vertical rows
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        winnerLine.style = verticalLineLeft;
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        winnerLine.style = verticalLineMid;
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        winnerLine.style = verticalLineRight;
    }

    // diagonal rows
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        winnerLine.style = diagonalLineLeft;
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        winnerLine.style = diagonalLineRight;
    }

    gameEndScreen(winner);
}


function gameEndScreen(winner) {
    if (winner) {
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
    document.getElementById('winner-line').style = '';
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
    }

    fields = [];
}
