// Dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app); //http.createServer(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function () {
  console.log('Flappy Bird server Starting on port 5000');
});

server.on('error', function (err) {
  console.error('Server error: ', err);
})



var players = [];
var scores = [];
var connectedPlayers = [];
var remainTriesPlayers = [];

io.on('connection', function (socket) {
  console.log('Someone connected');
  socket.emit('message', "Hi, you are connected to the game, please enter your name and press the ENTER button");

  socket.on('message', (text) => {
    socket.emit('message', text);
  });

  function checkExist(array, name) {
    for (var key in array) {
      if (array[key] == name)
        return 1;
    }
    return 0;
  };

  socket.on('new player start', function (playerName) {
    if (checkExist(players, playerName) === 0) {
      players[socket.id] = playerName;
      connectedPlayers[connectedPlayers.length] = playerName;
      remainTriesPlayers[remainTriesPlayers.length] = playerName;


      console.log(playerName + " is start to play")
      io.emit('refresh leaderboard', sortScoreArray(scores));
      io.emit('new player connected');
    }
  });

  socket.on('player end game', function (score, numOfTries) {
    if (players[socket.id] in scores) {
      if (scores[players[socket.id]] < score && numOfTries >= 0) {
        scores[players[socket.id]] = score;
      }
    } else {
      scores[players[socket.id]] = score;
    }
    console.log('the player ' + players[socket.id] + ' end the game with ' + score + ' points')
    io.emit('refresh leaderboard', sortScoreArray(scores));
  });


  socket.on('disconnect', function () {
    console.log(players[socket.id] + ' Got disconnect');
    idx = connectedPlayers.indexOf(players[socket.id], 0);
    connectedPlayers.splice(idx, 1);

    remainTriesPlayers.splice(players[socket.id], 1);

    if (connectedPlayers.length == 0) {
      players = [];
      scores = [];
      onnectedPlayers = [];
      remainTriesPlayers = [];
      console.log("There's no any players connected!");
    }

  });

  socket.on('finish tries', function () {

    idx = remainTriesPlayers.indexOf(players[socket.id], 0);
    remainTriesPlayers.splice(idx, 1);

    console.log(players[socket.id] + ' finish his/her tries');
    if (remainTriesPlayers.length === 0) {
      results = sortScoreArray(scores);
      console.log("All players done their tries");
      console.log("THE WINNER IS " + results[0].playerName + " WITH " + results[0].score + " POINTS!")
      io.emit('all players end tries', "THE WINNER IS \n" + results[0].playerName + " \n " + results[0].score + " POINTS!")
    }
  });

});



function returnArrayOfScoreObjectsFromArray(scores) {
  var returnObjectArray = [];

  for (var key in scores) {
    tempObj = new Score(key, scores[key])
    returnObjectArray.push(tempObj);
  }
  return returnObjectArray;
};


function Score(playerName, score) {
  this.playerName = playerName;
  this.score = score;
};


function sortScoreArray(scores) {
  arrayOfScoreObjects = returnArrayOfScoreObjectsFromArray(scores);
  if (arrayOfScoreObjects.length > 1)
    arrayOfScoreObjects.sort(function (a, b) {
      return b.score - a.score;
    });

  return arrayOfScoreObjects;

};


setInterval(function () {
  io.sockets.emit('state', players);
}, 1000 / 60);