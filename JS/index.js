(function() {
  // get the context

  var gameSpace = {
    canvas: document.getElementById("myCanvas"),

    start: function() {
      this.canvas.width = 900;
      this.canvas.height = 900;
      this.context = this.canvas.getContext("2d");
      this.interval = setInterval(updateGameArea, 20);
      MapGeneration();
      this.map = map;

      startingPlayer();
      window.addEventListener("keydown", function(e) {
        e.preventDefault();
        gameSpace.keys = gameSpace.keys || [];
        gameSpace.keys[e.keyCode] = e.type == "keydown";
      });
      window.addEventListener("keyup", function(e) {
        gameSpace.keys[e.keyCode] = e.type == "keydown";
      });
    },
    stop: function() {
      clearInterval(this.interval);
    },
    clear: function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    moveBox: function() {
      //context.clearRect()
      walls = [];
      x = 0;
      y = 0;
      for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 50; j++) {
          if (map[i][j] == 1) {
            var myWall = new Wall(x, y);
            walls.push(myWall);
            this.context.beginPath();
            this.context.rect(x, y, 19, 19);
            this.context.fillStyle = "#1E9FA0";
          }

          this.context.fill();
          x += 20;
        }

        y += 20;
        x = 0;
      }
      this.context.fillStyle = "#ff0000";
      this.context.rect(myPlayer.getX(), myPlayer.getY(), 19, 19);
      this.context.fill();
    }
  };

  var x = 0;
  var y = 0;

  var dx = 0;
  var dy = 0;

  var map = new Array(52).fill(null).map(() => new Array(52).fill(null));

  var walls = [];

  function MapGeneration() {
    //324 available spaces inside (18 x 18)
    //border
    var x = 45;
    var outside = Math.floor(x / 2);
    var half = Math.floor(x / 2 + 1);
    var last = Math.floor(x - 1);
    var random = x - 1;

    for (var i = 0; i < outside; i++) {
      //top
      //map[row][column]

      map[0][i] = 1;
      map[0][i + half] = 1;
      //bottom

      map[last][i] = 1;
      map[last][i + half] = 1;
      //left
      map[i][0] = 1;
      map[i + half][0] = 1;
      //right
      map[i][last] = 1;
      map[i + half][last] = 1;
      //var myWall = new Wall(i*19, j*19);
      //walls.push(myWall);
    }
    for (var i = 1; i < random; i++) {
      for (var j = 1; j < random; j++) {
        var randomNumber = Math.floor(Math.random() * 10);

        if (randomNumber < 3) {
          map[i][j] = 1;
          //var myWall = new Wall(i*20, j*20);
          //walls.push(myWall);
        } else {
          map[i][j] = 0;
        }
      }
    }
    map[25][25] = "P";
  }
  //top LEFT of block = walls[i].getX
  //top RIGHT of block = walls[i].getX + wall width
  //top of block = area between top left and top right so walls[i].getX() < x < walls[i].getX + wall width
  // whole block = area between top of the block and height of the block. walls[i].getX() < x < walls[i].getX + wall width && walls[i].getY < x < walls[i].getY + wall height

  // x is any part of the player

  // whole of box = myleft < walls[i].getX() < myright && mytop < y < mybottom

  function collisionCheck(dx, dy) {
    for (var i = 0; i < walls.length; i++) {
      var myleft = myPlayer.getX();
      var myright = myPlayer.getX() + 20;
      var mytop = myPlayer.getY();
      var mybottom = myPlayer.getY() + 20;
      if (
        walls[i].getX() < myPlayer.getX() + 20 &&
        walls[i].getX() + 20 > myPlayer.getX() &&
        walls[i].getY() < myPlayer.getY() + 20 &&
        walls[i].getY() + 20 > myPlayer.getY()
      ) {
        //console.info("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");

        if (dx > 0) {
          myPlayer.changeSpeedX(-1);
        }
        if (dx < 0) {
          myPlayer.changeSpeedX(1);
        }
        if (dy > 0) {
          myPlayer.changeSpeedY(-1);
        }
        if (dy < 0) {
          myPlayer.changeSpeedY(1);
        }
      }
    }
  }

  class Node {
    constructor(xCord, yCord) {
      this.xCord = xCord;
      this.yCord = yCord;
    }

    getX() {
      return this.xCord;
    }
    getY() {
      return this.yCord;
    }
    setX(xCord) {
      this.xCord = xCord;
    }
    setY(yCord) {
      this.yCord = yCord;
    }
  }

  class Wall extends Node {
    constructor(xCord, yCord) {
      super(xCord, yCord);
    }
  }

  class Player extends Node {
    constructor(xCord, yCord, speedX, speedY) {
      super(xCord, yCord);
      this.speedX = speedX;
      this.speedY = speedY;
    }
    
    getSpeedX() {
      return this.speedX;
    }
    setSpeedX(speedX) {
      this.speedX = speedX;
    }
    getSpeedY() {
      return this.speedX;
    }
    setSpeedY(speedX) {
      this.speedX = speedX;
    }
    changeSpeedX(speedX) {
      this.setX(this.xCord + speedX);
    }
    changeSpeedY(speedY) {
      this.setY(this.yCord + speedY);
    }
  }

  class Door extends Node {
    constructor(xCord, yCord, doorNumber) {
      super(xCord, yCord);
    }
    getDoor() {
      return this.doorNumber;
    }
  }

  var tempX = 0;
  var tempY = 0;
  function startingPlayer() {
    for (var i = 0; i < 50; i++) {
      tempX = 0;
      for (var j = 0; j < 50; j++) {
        if (map[i][j] == "P") {
          myPlayer.setX(tempX);
          myPlayer.setY(tempY);
        }
        tempX += 20;
      }
      tempY += 20;
    }
  }

  function updateGameArea() {
    gameSpace.moveBox();
    gameSpace.clear();
    //gameSpace.speed = 0;
    if (gameSpace.keys && gameSpace.keys[37]) {
      myPlayer.changeSpeedX(-1);
      collisionCheck(-1, 0);
    }
    if (gameSpace.keys && gameSpace.keys[39]) {
      myPlayer.changeSpeedX(1);
      collisionCheck(1, 0);
    }
    if (gameSpace.keys && gameSpace.keys[38]) {
      myPlayer.changeSpeedY(-1);
      collisionCheck(0, -1);
    }
    if (gameSpace.keys && gameSpace.keys[40]) {
      myPlayer.changeSpeedY(1);
      collisionCheck(0, 1);
    }
    gameSpace.moveBox();
  }
  var myPlayer = new Player(tempX, tempY, 0);

  
  //myPlayer.setX(25*49);
  //myPlayer.setY(25*49);

  gameSpace.start();
})();
