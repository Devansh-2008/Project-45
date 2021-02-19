var monkey, monkey_running;
var banana, bananaImage, bananaGroup;
var obstacle, obstacleImage, obstacleGroup;
var rockGroup,rock;
var score = 0;
var ground;
var gameOver, gameOverImage;
var jungle, jungleImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var touch = 0;

function preload() {
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("Image for wjr.png");
  obstacleImage = loadImage("stone.png");
  jungleImage = loadImage("jungle.jpg");
  gameOverImage = loadImage("Game Over.JPG");
   prisonImg=loadImage("prisonImage.jpg")
  bulletSound = loadSound("bullet.wav")
  backgroundM = loadSound("gameBackground.wav")
}

function setup() {
  createCanvas(displayWidth,displayHeight);
backgroundM.loop()
  monkey = createSprite(60, 80);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(600, 500, 100, 10);
  //ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  jungle = createSprite(100, 250, 12000, 600);
  jungle.addImage(prisonImg);
  //jungle.velocityX = -5;
jungle.scale= 1.5
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  bulletGroup = createGroup();
  rockGroup = createGroup();
}

function draw() {
  background("white");
  camera.position.x = monkey.x;
  camera.position.y = monkey.y;
   
  monkey.depth = jungle.depth;
  monkey.depth = monkey.depth + 1;

  food.depth = jungle.depth;
  food.depth = food.depth + 1;
                           
  obstacles.depth = jungle.depth;
  obstacles.depth = obstacles.depth + 1;
camera.position.x = monkey.x
  camera.position.y = monkey.y
  monkey.collide(ground);
  if (gameState === PLAY) {
    if (keyDown("space") && monkey.y >= 300) {
      monkey.velocityY = -20;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
jungle.velocityX = -1
    if (jungle.x < 10) {
      jungle.x = 600
    }
  food();
    obstacles();
    Rock();
      
    if(keyDown("UP_ARROW")){
       if(frameCount%20===0){
        bullets()
         bulletSound.play()
       }
    }
    
    if(bulletGroup.isTouching(obstacleGroup)) {
      obstacle.scale = 0.1;
      if(bulletGroup.isTouching(obstacleGroup)) {
            obstacle.destroy();      
     score = score + 2;
      }
    
    }
    
    
  
  //if (obstacleGroup.isTouching(monkey)) {
   // obstacleGroup.destroyEach();
   // touch = touch + 1;
    //switch (touch) {
     // case 1:
       // monkey.scale = 0.1;
      //  break;
      //case 2:
      //  gameState = END;
      // break;
     // default:
        //break;
 //   }
  //}
  }

  if (gameState === END) {
    gameOver = createSprite(300, 300);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.8;

    ground.velocityX = 0;
    monkey.destroy();
    jungle.destroy();
    bananaGroup.destroyEach();
  }

  drawSprites();

  stroke("black");
  textSize(30);
  fill("purple");
  text("Score: " + score, 10, 30);
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, 300);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.velocityX = -5;
    banana.lifetime = 130;
    bananaGroup.add(banana);
  }
}


function bullets(){
  
    var bullet=createSprite(10,371,15,10);
    bullet.x=monkey.x;
    bullet.y = monkey.y;
  bullet.shapeColor = "red";
    bullet.velocityX=3;
    bulletGroup.add(bullet);
}

function obstacles() {
  if (frameCount % 200 === 0) {
    obstacle = createSprite(600, 470);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -10;
    obstacle.lifetime = 60;
    obstacleGroup.add(obstacle);
  }
}

function Rock() {
  if (frameCount % 300 === 0) {
    rock = createSprite(600, 400);
    rock.addImage(obstacleImage);
  rock.scale = 0.15;
    rock.velocityX = -10;
    rock.lifetime = 60;
    rockGroup.add(rock);
  }
}