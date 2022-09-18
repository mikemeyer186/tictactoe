let fields = [];
let currentPlayer = 'circle';


function setSign(position) {
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


function showSign(currentPlayer, position) {
    let sign = document.getElementById(currentPlayer + position);
    sign.classList.remove('d-none');
    noPointerEvents(position);
}


function noPointerEvents(position) {
    let field = document.getElementById('tt-field' + position);
    field.classList.add('no-event');
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
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
    }

    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
    }

    // vertical rows
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
    }

    // diagonal rows
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
    }

    console.log('Gewonnen:', winner);
}