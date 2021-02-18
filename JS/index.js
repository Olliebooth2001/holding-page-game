// function showNotification(){
//   const notification = new Notification("New message from dcode!",{
//     body: "heya mate how are ya?",
//     icon: "images/maze.png"

//   });
// }

// console.log(Notification.permission);
// if(Notification.permission === "granted"){
//     showNotification();
  
// }else if(Notification.permission!=="denied"){
//   Notification.requestPermission().then(permission=>{
//      if(permission === "granted"){
//        showNotification();
//       }

//   });
// }
(function() {
  // get the context
  var pixelSize = 36;
  var movementSpeed = 2;
  var myScore = 0;
  var seconds = 500;
  var mySound;
  var gameMusic;
  var cont = false;
  var myGamePiece;
  var setScale = false;
  var mid = setSize/pixelSize;
  var translateY = -225;
  var translateX = -225;
  var canvasDeficit = 300;
  var moving = false;
  var spikesActive = false;

  var coinActive = false;

  const canvas= document.getElementById("myCanvas");
  const context = canvas.getContext("2d");


  var setSize = 1350;
  canvas.width = setSize;
  canvas.height = setSize;

  

  let playerImg = new Image();
  playerImg.src = 'images/playerFlat.png';

  let Right = new Image();
  Right.src = 'images/playerLeft.png';

  let Left = new Image();
  Left.src = 'images/playerRight.png';

  let Down = new Image();
  Down.src = 'images/playerDown.png';

  let closedEye = new Image();
  closedEye.src = 'images/closeC.png';

  let spikeUp = new Image();
  spikeUp.src = 'images/spikesUp.png';
  let spikeDown = new Image();
  spikeDown.src = 'images/spikesDown.png';

  
  let getOut = new Image();
  getOut.src = 'images/exit.png';
  let getOut2 = new Image();
  getOut2.src = 'images/exit2.png';
  
  let coin1 = new Image();
  coin1.src = 'images/coin1.png';
  let coin2 = new Image();
  coin2.src = 'images/coin2.png';
  let coin3 = new Image();
  coin3.src = 'images/coin3S.png';


 

  let grass = new Image();
  grass.src = 'images/pixelGrass.png'

  let brick = new Image();
  brick.src ='images/walls.png';
  
  var gameSpace = {
   
    
    start: function() {
     
      
      this.interval = setInterval(updateGameArea, 20);

      coinActive = false;
      spikesActive = false;

      
     
      MapGeneration();
      this.map = map;
      mySound = new sound("music/gameOver.mp3");
      gameMusic = new sound("music/thememusic1.mp3");
      coin = new sound("music/coin.wav");
      levelComplete = new sound("music/WinSound.wav");
      spikeNoise = new sound("music/spikeNoise.mp3");


  
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
      spikes = [];
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

            context.drawImage(brick,x + canvasDeficit , y + canvasDeficit, pixelSize - 1, pixelSize - 1);
          } 
          else if(map[i][j] == 3){
            var myOil = new Oil(x,y);
            if(oils.length <1){
              oils.push(myOil);
              if(!coinActive){
                if(seconds%2==0){
                  context.beginPath();
                  context.drawImage(coin1,x + canvasDeficit, y + canvasDeficit, pixelSize - 1, pixelSize - 1);
                }
                else if(seconds%2==1){
                  context.beginPath();
                  context.drawImage(coin3,x + canvasDeficit, y + canvasDeficit, pixelSize - 1, pixelSize - 1);
                }
              }
              else{
                context.beginPath();
                context.drawImage(grass,x + canvasDeficit, y  + canvasDeficit, pixelSize - 1, pixelSize - 1);
              }
            }
            else{
              context.beginPath();
              context.drawImage(grass,x + canvasDeficit, y  + canvasDeficit, pixelSize - 1, pixelSize - 1);
            }

            
          }   
          else if(map[i][j] == 4){
            var spike = new Spikes(x,y);
            spikes.push(spike);
            if(seconds % 3 == 0){
              context.beginPath();
              context.drawImage(spikeUp,x + canvasDeficit, y + canvasDeficit, pixelSize - 1, pixelSize - 1);
              spikesActive = true;
            }
            else{
              context.beginPath();
              context.drawImage(spikeDown,x + canvasDeficit, y + canvasDeficit, pixelSize - 1, pixelSize - 1);
              spikesActive = false;
            }
          }
          else if(map[i][j] == 0){
            context.beginPath();
            context.drawImage(grass,x + canvasDeficit, y  + canvasDeficit, pixelSize - 1, pixelSize - 1);
          }      
          else if(map[i][j] == null){
            if(seconds % 2 == 0){
              context.beginPath();
              context.drawImage(getOut,x + canvasDeficit, y + canvasDeficit, pixelSize - 1, pixelSize - 1);
            }
            else{
              context.beginPath();
              context.drawImage(getOut2,x + canvasDeficit, y + canvasDeficit, pixelSize - 1, pixelSize - 1);
            }
          }    
            
          context.fill();
          x += pixelSize;
        }

        y += pixelSize;
        x = 0;
      }
      if(moving){
        if(seconds % 2 ==0){
          context.drawImage(playerImg,myPlayer.getX()+ canvasDeficit, myPlayer.getY() + canvasDeficit, pixelSize - 4, pixelSize - 4);
          context.fill();
        }
        else{ 
          context.drawImage(closedEye,myPlayer.getX() + canvasDeficit, myPlayer.getY() + canvasDeficit, pixelSize - 4, pixelSize - 4);
          context.fill();
        }
      }
      else{ 
        context.drawImage(closedEye,myPlayer.getX() + canvasDeficit, myPlayer.getY() + canvasDeficit, pixelSize - 4, pixelSize - 4);
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

  var map = new Array(26).fill(null).map(() => new Array(26).fill(null));

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
          var newR = Math.floor(Math.random() * 15); 
          if(newR == 3){
            map[i][j] = 3;
          }
          else{
            map[i][j] = 0;
          }
        }
        else if(randomNumber == 4){
          var newR = Math.floor(Math.random() * 3); 
          if(newR == 2){
            map[i][j] = 4;
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
       
      for(var i = 11;i<13;i++){
          map[i][12] = 0;
          map[i][11] = 0;
          map[i][13] = 0;
          map[11][i] = 0;
          map[12][i] = 0;
          map[13][i] = 0;
          map[12][12] = 0;

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
    
    if(myPlayer.getX() > 850 || myPlayer.getX() < 5 ||myPlayer.getY()>850 ||myPlayer.getY()<5){
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
      coinActive = false;
      levelComplete.play();
    }
    for (var i = 0; i < spikes.length; i++) {
      var myleft = myPlayer.getX();
      var myright = myPlayer.getX();
      var mytop = myPlayer.getY();
      var mybottom = myPlayer.getY();

      if (
        spikes[i].getX() < myPlayer.getX() + pixelSize &&
        spikes[i].getX() + pixelSize > myPlayer.getX() &&
        spikes[i].getY() < myPlayer.getY() + pixelSize &&
        spikes[i].getY() + pixelSize > myPlayer.getY()
      ) {

        if (dx > 0) {
          if(spikesActive == true){
            spikeNoise.play()
            seconds = 0;
          }
        }
        if (dx < 0) {
          if(spikesActive == true){
            spikeNoise.play()
            seconds = 0;
          }
        }
        if (dy > 0) {
          if(spikesActive == true){
            spikeNoise.play()
            seconds = 0;
          }
        }
        if (dy < 0) {
          if(spikesActive == true){
            spikeNoise.play()
            seconds = 0;
          }
        }
      }
    }
    for (var i = 0; i < oils.length; i++) {
      var myleft = myPlayer.getX();
      var myright = myPlayer.getX() + pixelSize;
      var mytop = myPlayer.getY();
      var mybottom = myPlayer.getY() + pixelSize;

      if (
        oils[i].getX() < myPlayer.getX() + pixelSize &&
        oils[i].getX() + pixelSize > myPlayer.getX() &&
        oils[i].getY() < myPlayer.getY() + pixelSize &&
        oils[i].getY() + pixelSize > myPlayer.getY()
      ) {

        if (dx > 0) {
          if(coinActive == false){
            seconds +=5;
            coin.play();
            coinActive = true;
          }
        }
        if (dx < 0) {
          if(coinActive == false){
            seconds +=5;
            coin.play();
            coinActive = true;
          }
        }
        if (dy > 0) {
          if(coinActive == false){
            seconds +=5;
            coin.play();
            coinActive = true;
          }
        }
        if (dy < 0) {
          if(coinActive == false){
            seconds +=5;
            coin.play();
            coinActive = true;
          }
        }
      }
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
  class Spikes extends Node {
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
        moving = true;
      }
      if (gameSpace.keys && gameSpace.keys[39]) { //right
        myPlayer.changeSpeedX(movementSpeed);
        collisionCheck(movementSpeed, 0);
        translateX -= 2;
        moving = true;

      }
      if (gameSpace.keys && gameSpace.keys[38]) { //up
        myPlayer.changeSpeedY(-movementSpeed);
        collisionCheck(0, -movementSpeed);
        translateY += 2;
        moving = true;

      }
      if (gameSpace.keys && gameSpace.keys[40]) { //down
        myPlayer.changeSpeedY(movementSpeed);
        collisionCheck(0, movementSpeed);
        translateY -= 2;
        moving = true;

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
      context.scale(3,3);
      setScale = true;
    }
    context.save();
    context.translate(translateX - canvasDeficit, translateY - canvasDeficit);
    
    //console.log(myPlayer.getX(), myPlayer.getY());
  }
  
  
  

  if(document.getElementById("serverStat").src == "https://bet.sbgcdn.com/static/mbet/img/content/logos/skybet-rebrand.png"){
    document.getElementById("serverSymbol").src='images/serverON.png';
  }
  console.log(myPlayer.getX(), myPlayer.getY());
  //myPlayer.setX(25*49);
  //myPlayer.setY(25*49);
  
  
  gameSpace.start();
  


})();

