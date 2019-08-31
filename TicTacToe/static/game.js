var socket = io();
var myTurn = true;
var symbol;
player_wins = 0;

var winning_sequence = ['OOO', 'XXX'];

function initBoard() {
  $('.sqr').each(function () {
    $(this).text("");
  });
}

function getBoardState() {
  var board = {};

  // We will compose an object of all of the Xs and Ox
  // that are on the board into an array of cells 
  // Every cell contains either 'X', 'O' or ''
  $('.sqr').each(function () {
    board[$(this).attr('id')] = $(this).text() || '';
  });

  console.log("state: ", board);
  return board;
}

function checkDraw() {
  var state = getBoardState();

  if ((state.c00 === '') ||
    (state.c01 === '') ||
    (state.c02 === '') ||
    (state.c10 === '') ||
    (state.c11 === '') ||
    (state.c12 === '') ||
    (state.c20 === '') ||
    (state.c21 === '') ||
    (state.c22 === ''))
    return false;
  return true;
}


function checkEndGame() {
  var state = getBoardState();
  console.log("Board State: ", state);

  // These are all of the possible combinations
  // that would win the game
  var board_sequences = [
    state.c00 + state.c01 + state.c02,
    state.c10 + state.c11 + state.c12,
    state.c20 + state.c21 + state.c22,
    state.c00 + state.c10 + state.c20,
    state.c01 + state.c11 + state.c21,
    state.c02 + state.c12 + state.c22,
    state.c00 + state.c11 + state.c22,
    state.c02 + state.c11 + state.c20
  ];

  // Loop over all of the rows and check if any of them compare
  // to either 'XXX' or 'OOO'
  for (var i = 0; i < board_sequences.length; i++) {
    if (board_sequences[i] === winning_sequence[0] || board_sequences[i] === winning_sequence[1]) {
      return true;
    }
  }
  return false;
}

function renderTurnMessage() {
  // Disable the board if it is the opponents turn
  if (!myTurn) {
    $('#messages').text('Your opponent\'s turn');
    //$('.board button').attr('disabled', true);
    $('.sqr').attr('disabled', true);

    // Enable the board if it is your turn
  } else {
    $('#messages').text('Your turn.');
    //$('.board button').removeAttr('disabled');
    $('.sqr').removeAttr('disabled');

  }
}

function playMove(e) {
  e.preventDefault();
  // It's not your turn
  if (!myTurn) {
    return;
  }

  // The space is already checked
  if ($(this).text().length) {
    return;
  }

  // Emit the move to the server
  socket.emit('play', {
    symbol: symbol,
    position: $(this).attr('id')
  });

}

function reset() {
  socket.emit('reset game');
}

socket.on('reset game', function () {
  resetGame();
});

function resetGame() {
  initBoard();
  $('.resetGameBtn').attr('disabled', true);
  renderTurnMessage();
}


// Event is called when either player makes a move
socket.on('move made', function (data) {
  // Render the move, data.position holds the target cell ID
  $('#' + data.position).text(data.symbol);

  // If the symbol is the same as the player's symbol,
  // we can assume it is their turn
  myTurn = (data.symbol !== symbol);

  // If the game is still going, show who's turn it is
  if (!checkEndGame()) {
    if (checkDraw()) {
      $('.resetGameBtn').attr('disabled', false);
      $('#messages').text('Draw!');
      return;
    } else
      return renderTurnMessage();
  }

  // If the game is over Show the message for the loser
  if (myTurn) {
    $('#messages').text('Game over. You lost.');
    // Show the message for the winner
  } else {
    $('#messages').text('Game over. You won!');
    socket.emit('add win');
  }

  // Disable the board
  //$('.board button').attr('disabled', true);
  $('.sqr').attr('disabled', true);
  $('.resetGameBtn').attr('disabled', false);
});

socket.on('get wins', function (num) {
  player_wins = num;
  $('#num_of_wins').text(player_wins);
});

socket.on('start game', function (data) {
  // The server will asign X or O to the player
  $("#symbol").html(data.symbol); // Show the players symbol
  symbol = data.symbol;

  // Give X the first turn
  myTurn = (data.symbol === 'X');
  renderTurnMessage();
});

// Disable the board if the opponent leaves
socket.on('opponent left', function () {
  $('#messages').text('Your opponent left the game.');
  //$('.board button').attr('disabled', true);
  $('.sqr').attr('disabled', true);
});

$(function () {
  $('.gameBoard button').attr('disabled', true);
  //$('.board > button').on('click', playMove);
  $(".sqr").on("click", playMove);
});


writeEvent = function (text) {
  document.getElementById("events").innerText = text
}

socket.on('message', function (text) {
  writeEvent(text);
});