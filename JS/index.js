(function() {
  // get the context
  var pixelSize = 36;
  var movementSpeed = 2;
  var myScore = 0;
  var seconds =16;
  var mySound;
  var gameMusic;
  var cont = false;
  var myGamePiece;
  var setScale = false;
  var mid = setSize/pixelSize;
  var translateY = -225;
  var translateX = -225;

  const canvas= document.getElementById("myCanvas");
  const context = canvas.getContext("2d");

  context.fillStyle = "#ff0000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  var setSize = 900;
  canvas.width = setSize;
  canvas.height = setSize;

  

  let playerImg = new Image();
  playerImg.src = 'images/openC.png';
  
  let oilSlick = new Image();
  oilSlick.src = 'images/oil.png';

  let closedEye = new Image();
  closedEye.src = 'images/closeC.png';

  let grass = new Image();
  grass.src = 'images/pixelGrass.png'
  let brick = new Image();
  brick.src ='images/walls.png';
  
  var gameSpace = {
   
    
    start: function() {
     
      
      this.interval = setInterval(updateGameArea, 20);
      
      
     
      MapGeneration();
      this.map = map;
      mySound = new sound("music/gameOver.mp3");
      gameMusic = new sound("music/thememusic1.mp3");
  
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
      context.clearRect(0, 0, canvas.width, canvas.height);
    },
    moveBox: function() {
      //context.clearRect()
      oils = [];  
      walls = [];
      x = 0;
      y = 0;
      for (var i = 0; i < 25; i++) {
        for (var j = 0; j < 25; j++) {
          if (map[i][j] == 1) {
            var myWall = new Wall(x, y);
            walls.push(myWall);
            context.beginPath();
            // context.rect(x, y, pixelSize - 1, pixelSize - 1);
            // context.fillStyle = "#5e10ec";

            context.drawImage(brick,x, y, pixelSize - 1, pixelSize - 1);
          } 
          else if(map[i][j] == 3){
            var myOil = new Oil(x,y);
            oils.push(myOil);
            context.beginPath();
            context.drawImage(oilSlick,x, y, pixelSize - 1, pixelSize - 1);

          }    
          else if(map[i][j] == 0){
            context.beginPath();
            context.drawImage(grass,x, y, pixelSize - 1, pixelSize - 1);

          }       
            
          context.fill();
          x += pixelSize;
        }

        y += pixelSize;
        x = 0;
      }
     
      // context.fillStyle = "#ff0000";
      // context.rect(myPlayer.getX(), myPlayer.getY(), pixelSize - 4, pixelSize - 4);
      if(seconds % 2 ==0){
        context.drawImage(playerImg,myPlayer.getX(), myPlayer.getY(), pixelSize - 4, pixelSize - 4);
        context.fill();
      }
      else{ 
        context.drawImage(closedEye,myPlayer.getX(), myPlayer.getY(), pixelSize - 4, pixelSize - 4);
        context.fill();
      }
      
      
    }
  };
  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
 }
  var x = 0;
  var y = 0;

  var dx = 0;
  var dy = 0;

  var map = new Array(27).fill(null).map(() => new Array(27).fill(null));

  var walls = [];

  
  function MapGeneration() {
    //324 available spaces inside (18 x 18)
    //border
    var x = 25;
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
        } 
        else if(randomNumber == 3){
          var newR = Math.floor(Math.random() * 11); 
          if(newR == 3){
            map[i][j] = 3;
          }
          else{
            map[i][j] = 0;
          }
        }
        else {
          map[i][j] = 0;
        }
        

      }
    }
       if(map[12][12] == 1){
          map[12][12]=0;
       }

   // getTile: function(,)
  }
  
  
  //top LEFT of block = walls[i].getX
  //top RIGHT of block = walls[i].getX + wall width
  //top of block = area between top left and top right so walls[i].getX() < x < walls[i].getX + wall width
  // whole block = area between top of the block and height of the block. walls[i].getX() < x < walls[i].getX + wall width && walls[i].getY < x < walls[i].getY + wall height

  // x is any part of the player

  
  // whole of box = myleft < walls[i].getX() < myright && mytop < y < mybottom
  var countdown = setInterval(function() {
    
    if(cont == true){
      seconds--;
    }
    document.getElementById("head3").textContent ="Time : "+ seconds;
    if (seconds <= 0) clearInterval(countdown);
  }, 1000);
  var ifConnected = window.navigator.onLine;
  if (ifConnected) {
    document.getElementById('wifiSymbol').src='images/wifi.png';
  } else {
    document.getElementById('wifiSymbol').src='images/nowifi.png';
  } 
  
  function collisionCheck(dx, dy) {
    
    if(myPlayer.getX() > 900 || myPlayer.getX() < 0||myPlayer.getY()>900||myPlayer.getY()<0){
      console.log("Out of maze");
      MapGeneration();
      myPlayer.setX(432);
      myPlayer.setY(432);
      myScore+=seconds;
      console.log(myScore);
      document.getElementById("head2").innerHTML = "Score : " + myScore;
      translateX = -225
      translateY = -225
      seconds = 16; 

    }
    for (var i = 0; i < walls.length; i++) {
      var myleft = myPlayer.getX();
      var myright = myPlayer.getX() + pixelSize;
      var mytop = myPlayer.getY();
      var mybottom = myPlayer.getY() + pixelSize;

      if (
        walls[i].getX() < myPlayer.getX() + pixelSize &&
        walls[i].getX() + pixelSize > myPlayer.getX() &&
        walls[i].getY() < myPlayer.getY() + pixelSize &&
        walls[i].getY() + pixelSize > myPlayer.getY()
      ) {
        //console.info("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");

        if (dx > 0) {
          myPlayer.changeSpeedX(-movementSpeed);
          translateX += 2;
        }
        if (dx < 0) {
          myPlayer.changeSpeedX(movementSpeed);
          translateX -= 2;
        }
        if (dy > 0) {
          myPlayer.changeSpeedY(-movementSpeed);
          translateY += 2;
        }
        if (dy < 0) {
          myPlayer.changeSpeedY(movementSpeed);
          translateY -= 2;
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
  class Oil extends Node {
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
    getX(){
      return this.xCord;
    }
    getY(){
      return this.yCord;
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

  var tempX = pixelSize*12;//Math.floor((createArray/2));
  var tempY = pixelSize*12;//Math.floor((createArray/2));
  var myPlayer = new Player(tempX, tempY, 0);

  function updateGameArea() {
   
    document.getElementById("head2").style.textShadow = "2px 2px 1px #5e10ec";

  
    
  
    

    if(seconds !=0){
      //gameMusic.play();
      document.querySelector('.close').addEventListener('click',function(){
        document.querySelector('.op-modal').style.display = 'none';
        cont = true;
      });

      gameSpace.moveBox();
      gameSpace.clear();
     
      if (seconds <=5){ 
        if(seconds %2!=0){
          document.querySelector('.oft').style.display = 'flex';
         
        }
        else{
          document.querySelector('.oft').style.display = 'none';
        }
      }else{
        document.getElementById("head3").style.color = "#ff3545";
        document.getElementById("head3").style.textShadow = "2px 2px 1px #5e10ec";
        document.querySelector('.oft').style.display = 'none';

      }
  
      if (gameSpace.keys && gameSpace.keys[37]) { //left
        myPlayer.changeSpeedX(-movementSpeed);
        collisionCheck(-movementSpeed, 0);
        translateX += 2; 
      }
      if (gameSpace.keys && gameSpace.keys[39]) { //right
        myPlayer.changeSpeedX(movementSpeed);
        collisionCheck(movementSpeed, 0);
        translateX -= 2;
      }
      if (gameSpace.keys && gameSpace.keys[38]) { //up
        myPlayer.changeSpeedY(-movementSpeed);
        collisionCheck(0, -movementSpeed);
        translateY += 2;
      }
      if (gameSpace.keys && gameSpace.keys[40]) { //down
        myPlayer.changeSpeedY(movementSpeed);
        collisionCheck(0, movementSpeed);
        translateY -= 2;
      }
     
      gameSpace.moveBox();
      context.restore();
    }
    

    
    else if(seconds == 0){
      document.querySelector('.oft').style.display = 'none';
      gameMusic.stop();
      mySound.play();
      document.querySelector('.bg-modal').style.display = 'flex';
      document.getElementById("head4").innerHTML = "You scored : " + myScore + "!";
      if(typeof(Storage)!=="undefined"){

        if(localStorage.getItem("highScore")==0){
          localStorage.setItem("highScore", myScore);
        }
                
        if(localStorage.getItem("highScore")<myScore){
          localStorage.setItem("highScore", myScore);
          document.getElementById("head4").innerHTML = "Nice! thats a high score";
        }
        document.getElementById("head6").innerHTML = "Your high score : " + localStorage.getItem("highScore");

      }
      
      document.querySelector('.close').addEventListener('click',function(){
        document.querySelector('.bg-modal').style.display = 'none';
      });
      
    }
    if(setScale == false){
      context.scale(2,2);
      setScale = true;
    }
    context.save();
    context.translate(translateX ,translateY);
    

  }
  
  
  

  if(document.getElementById("serverStat").src == "https://bet.sbgcdn.com/static/mbet/img/content/logos/skybet-rebrand.png"){
    document.getElementById("serverSymbol").src='images/serverON.png';
  }
  console.log(myPlayer.getX(), myPlayer.getY());
  //myPlayer.setX(25*49);
  //myPlayer.setY(25*49);
  
  
  gameSpace.start();
  


})();


