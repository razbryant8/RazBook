// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app); //http.createServer(app);
var io = socketIO(server);

var game_port = 5001;

app.set('port', game_port);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});


server.listen(game_port, function () {
  console.log('XO server Starting on port ', game_port);
});

server.on('error', function (err) {
  console.error('Server error: ', err);
})

var players = {},
  unmatched;

function joinGame(socket) {

  // Add the player to our object of players
  players[socket.id] = {

    // The opponent will either be the socket that is
    // currently unmatched, or it will be null if no
    // players are unmatched
    opponent: unmatched,

    // The symbol will become 'O' if the player is unmatched
    symbol: 'X',

    // The socket that is associated with this player
    socket: socket,

    wins: 0
  };

  // Every other player is marked as 'unmatched', which means
  // there is no another player to pair them with yet. As soon
  // as the next socket joins, the unmatched player is paired with
  // the new socket and the unmatched variable is set back to null
  if (unmatched) {
    players[socket.id].symbol = 'O';
    players[unmatched].opponent = socket.id;
    unmatched = null;
  } else {
    unmatched = socket.id;
  }
}


function getOpponent(socket) {
  if (!players[socket.id].opponent)
    return null;
  return players[players[socket.id].opponent].socket;
}


io.on('connection', function (socket) {
  console.log("Connection established...", socket.id);
  joinGame(socket);

  // Once the socket has an opponent, we can begin the game
  if (getOpponent(socket)) {
    socket.emit('start game', {
      symbol: players[socket.id].symbol
    });
    getOpponent(socket).emit('start game', {
      symbol: players[getOpponent(socket).id].symbol
    });
  }

  // Listens for a move to be made and emits an event to both
  // players after the move is completed
  socket.on('play', function (data) {
    if (!getOpponent(socket)) {
      return;
    }
    console.log("Move made by : ", data);
    socket.emit('move made', data);
    getOpponent(socket).emit('move made', data);
  });

  // Emit an event to the opponent when the player leaves
  socket.on('disconnect', function () {
    console.log("disconnectd...", socket.id);
    if (getOpponent(socket)) {
      getOpponent(socket).emit('opponent left');
    }
  });

  socket.on('add win', function () {
    players[socket.id].wins = players[socket.id].wins + 1;
    socket.emit('get wins', players[socket.id].wins);
  });

  socket.on('reset game', function () {
    players[socket.id].socket.emit('reset game');
    players[players[socket.id].opponent].socket.emit('reset game');
  });
});