var obsTop1, obsTop2, obstacleTop, obstacleTopGroup;
var obsBottom1,obsBottom2,obsBottom3, obstacleBottom, obstacleBottomGroup;
var balloonImg, balloon;
var bgImg, bg;
var gameOverImg, gameOver; 
var restartImg, restart;
var jumpSound;
var dieSound;
var topGround, bottomGround;
var gameState = "play";
var score = 0;
var bar, barGroup;

function preload(){
    obsTop1 = loadImage("assets/obsTop1.png");
    obsTop2 = loadImage("assets/obsTop2.png");

    obsBottom1 = loadImage("assets/obsBottom1.png");
    obsBottom2 = loadImage("assets/obsBottom2.png");
    obsBottom3 = loadImage("assets/obsBottom3.png");

    bgImg = loadImage("assets/bg.png")
    
    balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png");

    gameOverImg = loadImage("assets/gameOver.png");
    restartImg = loadImage("assets/restart.png");

    jumpSound = loadSound("assets/jump.mp3");
    dieSound = loadSound("assets/die.mp3");
}

function setup(){

    createCanvas(800,600);
    bg = createSprite(165,400);
    bg.addImage(bgImg);
    bg.scale = 1.2;

    balloon = createSprite(100,200);
    balloon.addAnimation("balloon", balloonImg);   
    balloon.scale = 0.3;

    topGround = createSprite(400,10, 800, 10);
    topGround.visible = false;
    bottomGround = createSprite(400, 590, 800,10);
    bottomGround.visible = false;

    obstacleTopGroup = new Group();
    obstacleBottomGroup = new Group();
    barGroup = new Group();

    gameOver = createSprite(350,200);
    gameOver.addImage(gameOverImg);
    //gameOver.scale = 0.5;
    gameOver.visible = false;

    restart = createSprite(300,300);
    restart.addImage(restartImg);
    //restart.scale = 0.5;
    restart.visible = false;
}

function draw(){
    background(0);
    if(gameState === "play"){

        if(keyDown("SPACE")){
            balloon.velocityY = -6;
            jumpSound.play();
        }

        balloon.velocityY += 2;
        Bar();
        spawnObsTop();
        spawnObsBot();

        if(obstacleTopGroup.isTouching(balloon)||
           obstacleBottomGroup.isTouching(balloon)||
           balloon.isTouching(topGround)||
           balloon.isTouching(bottomGround)){
            gameState = "end";
            dieSound.play();
        }
    }

    if(gameState === "end"){
        gameOver.visible = true;
        restart.visible = true;
        balloon.setVelocity(0,0);
        obstacleTopGroup.setVelocityXEach(0);
        obstacleBottomGroup.setVelocityXEach(0);

        obstacleTopGroup.setLifetimeEach(-1);
        obstacleBottomGroup.setLifetimeEach(-1);
        balloon.y = 200;

        if(mousePressedOver(restart)){
            reset();
        }

    }
        drawSprites();
        Score();
}

function reset(){
    gameState = "play";
    gameOver.visible = false;
    restart.visible = false;
    obstacleTopGroup.destroyEach();
    obstacleBottomGroup.destroyEach();
    score = 0;
}

function spawnObsTop(){
    if(frameCount%60 === 0){
        obstacleTop = createSprite(400,50);
        obstacleTop.scale = 0.1;
        obstacleTop.velocityX = -4;

                            //min and max
        obstacleTop.y = random(10,150);

        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obstacleTop.addImage(obsTop1); break;
            case 2: obstacleTop.addImage(obsTop2); break;
            default : break;
        }
        obstacleTop.lifetime = 200;
        balloon.depth = obstacleTop.depth+1;

        obstacleTopGroup.add(obstacleTop);
    }
}

function spawnObsBot(){
    if(frameCount%80 === 0){
        obstacleBottom = createSprite(800,510);
        obstacleBottom.scale = 0.1;
        obstacleBottom.velocityX = -4;

        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: obstacleBottom.addImage(obsBottom1); break;
            case 2: obstacleBottom.addImage(obsBottom2); break;
            case 3: obstacleBottom.addImage(obsBottom3); break;
            default : break;
        }
        obstacleBottom.lifetime = 200;
        balloon.depth = obstacleBottom.depth+1;

        obstacleBottomGroup.add(obstacleBottom);
    
    }
}

function Bar(){
    if(frameCount%80 === 0){
        bar = createSprite(400,200,10,800);
        bar.velocityX = -4;
        bar.lifetime = 100;
        barGroup.add(bar);
        bar.visible = false;
        
    }
}

function Score(){
    if(barGroup.isTouching(balloon)){
        score += 1;
    }
    textSize(30);
    fill("yellow");
    text("Score : " + score, 650,50);
}