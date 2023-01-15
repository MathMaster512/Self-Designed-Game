var goldCoin, goldCoinImg;
var flyBot, flyBotAnimation;
var background1, background1Img;
var emoji;
var score;
var spikes, spikesImg;
var goldCoinGroup, spikesGroup;
var PLAY = 1
var END = 0;
var gameState = PLAY;
var die;
var restart, restartImg;
var checkpoint;

function preload() {
  //background2Img = loadImage("bk1.png");
  //background3Img = loadImage("bk2.png");
  //background4Img = loadImage("bk3.png");
  background1Img = loadImage("assets/bk.png");

  goldCoinImg = loadImage("assets/goldCoin.png");

  emoji = loadImage("assets/Emojil.png");

  spikesImg = loadImage("assets/spike.png");

  flyBotAnimation = loadAnimation("assets/flyBot_0.png", "assets/flyBot_1.png");

  restartImg = loadImage("assets/restart.png");

  die = loadSound("assets/die.mp3");

  checkpoint = loadSound("assets/jump.mp3");
}


function setup() {
  createCanvas(800, 400);

  background1 = createSprite(120, 100, 600, 20);
  background1.addImage("background1", background1Img);
  //background1.scale = 0.4;

  flyBot = createSprite(80, 326, 20, 20);
  flyBot.addAnimation("flyBot", flyBotAnimation);
  flyBot.scale = 0.35
  flyBot.velocityY = -2.5;

  restart = createSprite(400, 200, 20, 20);
  restart.addImage("restart", restartImg);
  restart.visible = false;

  background1.velocityX = -1;
  spikesGroup = new Group();

  goldCoinGroup = new Group();
}

function draw() { 
  background("white");
  text("Score: "+score, 710, 30);
 // score+= Math.round(frameRate()/60);
  if(score === undefined) {
    score = 0;
  }

  if(gameState === PLAY) {
  spawnCoins();
  spawnSpikes();
  //score+= Math.round(frameRate()/100)
  //randomBackground();
  //text(mouseX+","+mouseY,mouseX,mouseY);
  if(background1.x<0) {
    background1.x = background1.width/2;
  }

  if(keyDown(DOWN_ARROW) || keyCode === 115) {
    flyBot.y+=7.5;
  }
 
  if(flyBot.y>325) {
    flyBot.y = 325;
  }
  if(spikesGroup.isTouching(flyBot)) {
    gameState = END
  }
  for(i=0; i<goldCoinGroup.length; i++) {
    goldCoinGroup[i].displace(goldCoinGroup)
  }
  flyBot.collide(goldCoinGroup,removeGoldCoins)
  /*if(goldCoinGroup.collide(flyBot)) {
    score+=1;
      //flyBot.overlap(goldCoinGroup);
      //flyBot.update();
  }*/

  if(flyBot.y<35) {
    flyBot.y = 35;
  }

  if (score%1000 === 0 && score>0) {
    checkpoint.play();
   }
  }

  else if(gameState === END) {
    gameOver();
    if(mousePressedOver(restart)) {
      reset();
    }
  }

  createEdgeSprites();
  drawSprites();
}


function spawnCoins() {
  if(frameCount%100 === 0) {
    goldCoin = createSprite(100, 300, 20, 20);
    goldCoin.addImage("goldCoin", goldCoinImg);
    goldCoin.scale = 0.05;
    goldCoinGroup.add(goldCoin);
    goldCoin.y = Math.round(random(50, 300));
    goldCoin.x = 795;
    goldCoin.lifetime = 800;
    goldCoin.velocityX = -1;
  }
}

function spawnSpikes() {
  if (frameCount%75 === 0) {
    spikes = createSprite(200, 200, 10, 10);
    spikes.addImage("spikes", spikesImg);
    spikes.scale = 0.15;
    spikesGroup.add(spikes);
    spikes.y = Math.round(random(5, 340));
    spikes.x = 795
    spikes.lifetime = 800;
    spikes.velocityX = -1
  }
}

/*function randomBackground() {
 if(frameCount%400 === 0) {
  var rand = Math.round(random(1,3));
  switch(rand){
    case 1: background2.visible = true;
    break;
    case 2: background3.visible = true;
    break;
    case 3: background4.visible = true;
    break;
    default: break;
  } 
} 
}*/

function gameOver() {
  background1.velocityX = 0;
  flyBot.velocityY = 0;
  spikesGroup.setVelocityXEach(0);
  goldCoinGroup.setVelocityXEach(0);
  spikesGroup.setLifetimeEach(-1);
  goldCoinGroup.setLifetimeEach(-1)
  die.play();
  restart.visible = true;
}

function reset() {
  gameState = PLAY;
  score = 0;
  goldCoinGroup.destroyEach();
  spikesGroup.destroyEach();
  score = 0;
  restart.visible = false;
  flyBot.velocityY = -2.5
  flyBot.x = 80;
  flyBot.y = 326;
}

function removeGoldCoins(sprite,obstacle) {
  obstacle.remove();
}