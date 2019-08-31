var socket = io();



writeEvent = function (text) {
  document.getElementById("events").innerText = text
}

socket.on('message', function (text) {
  writeEvent(text);
});


socket.on('refresh leaderboard', function (scores) {
  leaderBoardDiv = document.querySelector('#leaderBoardDiv');

  leaderBoardDiv.innerHTML = buildLeaderBoard(scores);

});


socket.on('all players end tries', function (message) {
  winnerDiv = document.querySelector('#winnersDiv');

  winnerDiv.innerText = message;

});

socket.on('new player connected', function () {
  winnerDiv = document.querySelector('#winnersDiv');

  winnerDiv.innerText = "";

});



function buildLeaderBoard(scores) {
  lb = '';
  var i = 1;
  for (var key in scores) {
    lb = lb + "<tr><th>" + i + "</th><th>" + scores[key].playerName + "</th>" + "<th>" + scores[key].score + "</th></tr>";
    i++;
  }

  return '<table>' + lb + '</table>';

}



onNameSubmitted = (e) => {
  e.preventDefault();
  input = document.querySelector('#nameTextBox')
  playerName = input.value;
  text = 'Welcome ' + playerName + ', You can start to play';
  input.value = '';
  input.disabled = true;

  strBtn = document.querySelector('#strBtn');
  strBtn.disabled = false;

  socket.emit('message', text);
  socket.emit('new player start', playerName);



};

document
  .querySelector('#name-Form')
  .addEventListener('submit', onNameSubmitted);


var myGamePiece;
var myObstacles = [];
var myScore;
var numOfTriesComp;
var numOfTries;
var notifyFinishTries;
const INITIAL_NUM_OF_TRIES = 2;
var _my_score = 0;



function init() {

  strBtn = document.querySelector('#strBtn');
  strBtn.disabled = true;

  accBtn = document.querySelector('#accBtn');
  accBtn.disabled = false;


  numOfTries = INITIAL_NUM_OF_TRIES;
  notifyFinishTries = 0;

  startGame();
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function startGame() {

  myGamePiece = new component(30, 30, getRandomColor(), 10, 120);
  myGamePiece.gravity = 0.1;
  myScore = new component("30px", "Consolas", "black", 280, 40, "text");
  numOfTriesComp = new component("20px", "Consolas", "black", 280, 80, "text");
  myGameArea.start();
}

var myGameArea = {
  canvas: document.getElementById("canvas"),
  start: function () {
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 10);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}



function component(width, height, color, x, y, type) {
  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0;
  this.update = function () {
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function () {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();

  }
  this.hitBottom = function () {
    var rockbottom = myGameArea.canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
    }
  }

  this.crashWith = function (otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    if (crash == true)
      socket.emit('player end game', _my_score, numOfTries);
    return crash;
  }
}

function resetGame() {
  myObstacles = [];
  myGameArea.frameNo = 0;
  numOfTries--;
}

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      resetGame();
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new component(10, height, "green", x, 0));
    myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
  }
  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].x += -1;
    myObstacles[i].update();
  }
  _my_score = myGameArea.frameNo;
  myScore.text = "SCORE: " + _my_score;
  myScore.update();

  numOfTriesComp.text = "Remains number of tries : " + numOfTries;
  if (numOfTries < 0) {
    numOfTriesComp.text = "dont have Remain tries";
    if (notifyFinishTries === 0) {
      socket.emit('finish tries');
      notifyFinishTries = 1;
    }
  }
  numOfTriesComp.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function accelerate(n) {
  myGamePiece.gravity = n;
}