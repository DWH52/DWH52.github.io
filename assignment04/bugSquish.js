//Global Variables
let spriteSheets = [];
let spriteAnimation = [];

let numberOfAnimations;
let timeRemaining;
let initialSpeed = 1;
let score = 0;
let gameCount = 0;
let gameOver = true;
let isPaused = false;


//END OF GLOBAL VARIABLES

//Core Program Functions
function preload()
{
    spriteSheets = [loadImage("assets/Bug.png"),loadImage("assets/BugSquished.png"),loadImage("assets/BugDead.png")];
}

function setup() 
{
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    textAlign(CENTER);
    angleMode(DEGREES);
    rectMode(CENTER);

    for(i = 0; i < numberOfAnimations; i++)
    {
        spriteAnimation[i] = new SpriteMovementAnimation(spriteSheets[0],32,32,8, (random([1,4])*initialSpeed));
    }
}

function draw() 
{ 
    if(gameOver)
    {   
        background(0);
        fill(255,255,255);
        notPlaying();
    }
    else
    {   
        background(50,255,50);
        fill(0);
        textStyle('bold');
        playing();
    }
}
//END OF CORE PROGRAM FUNCTIONS

//Gamestates
function playing()
{
    if(!isPaused)
    {
        gameCount += 1;
        for(i = 0; i < numberOfAnimations; i++)
        {
            spriteAnimation[i].draw();
        }
        fill(0);
        rect((windowWidth/2),50,windowWidth,100);
        fill(255,255,255);
        text("Score: " + score, 100, 50);
        text("Time Remaining: " + ceil(timeRemaining), width-100,50);
        timeRemaining -= (deltaTime/1000);
        if(timeRemaining <= 0)
        {
            gameOver = true;
        }
    }
    else
    {
        background(0);
        fill(255,255,255);
        text("Time Remaining: " + ceil(timeRemaining), windowWidth/2,(windowHeight/2)); 
        text("Game Paused.", windowWidth/2,(windowHeight/2)-100);
        textStyle("bold");
        text("Press ESCAPE to Resume.", windowWidth/2,(windowHeight/2)+100); 
    }
}

function notPlaying()
{
    if(gameCount != 0)
    {
        text("Game Over. Score: " + score , windowWidth/2,(windowHeight/2)-100);
        textStyle("bold");
        text("Press SPACEBAR to Play Again.", windowWidth/2,(windowHeight/2)+100);
    }
    else
    {
        text("Welcome to Bug Squisher!", windowWidth/2,(windowHeight/2)-100);
        text("Click On Bugs to Squish Them. Each One Dead is a Point!", windowWidth/2,(windowHeight/2)-50);
        text("Controls: CLICK - Squish a Bug, ESCAPE - Pause the Game.", windowWidth/2,(windowHeight/2));
        textStyle("bold");
        text("Press SPACEBAR to Play.", windowWidth/2,(windowHeight/2)+50);
    }
}
//END OF GAMESTATES

//Keyboard & Mouse Controls
function keyPressed()
{
    if(key === ' ') //Spacebar to Play
    {
        if(gameOver)
        { 
            timeRemaining = 30;
            score = 0;
            gameOver = false;
            numberOfAnimations = 10;
            initialSpeed = 1;
            for(i = 0; i < numberOfAnimations; i++)
            {
                spriteAnimation[i] = new SpriteMovementAnimation(spriteSheets[0],32,32,8, (random([1,4])*initialSpeed));
            }
        }
    }
    if(keyCode === ESCAPE) //Pause Button
    {
        if(!gameOver)
        {
            isPaused = !isPaused;
        }
    }
}

function mousePressed()
{
  if(!isPaused && !gameOver)
  {  
    for(i = 0; i < numberOfAnimations; i++)
    {
        let contains = spriteAnimation[i].ifContainsSprite(mouseX, mouseY);
        if(contains)
        {
            if(spriteAnimation[i].isDead == false)
            {
                score += 1;
                
                spriteAnimation[i].spritesheet = spriteSheets[2];
                spriteAnimation[i].kill();
                initialSpeed *= 1.05;
                for(j = 0; j < 2; j++)
                {
                    spriteAnimation[numberOfAnimations] = new SpriteMovementAnimation(spriteSheets[0],32,32,8, (random([1,4])*initialSpeed));
                    numberOfAnimations++;
                }
            }
        }
    }
  }
}


class SpriteMovementAnimation
{
  constructor(spritesheet, spriteWidth, spriteHeight, animationLength, speed)
  {
    this.spritesheet = spritesheet; 
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.displayX = random(40,width-40);
    this.displayY = random(140,height-40);
    this.animationLength = animationLength;
    this.row = 0;                                 // row of the sprite sheet to pull frame from
    this.column = 0;                              // column of the sprite sheet to pull frame from
    this.currentFrame = 0;
    this.direction = random([-1,1]);
    this.moving = this.direction;
    this.speed = speed;
    this.up_down = random([true,false]);
    this.isDead = false;
    
  }

  draw()
  {
    // Checks if the target is moving. Initiating the condition.
    // Sets the row of the sprite sheet to the remainder
    // between the current frame and the animation length total
    // if the condition is met. Otherwise sets the row of the sprite
    // sheet to 0, where the idle/non-moving frames are.
    this.row = 0;
    this.column = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
    
    push();
    // Shifts the image, left or right based on the change to displayX/Y (The X and Y coordinate of the canvas)
    // Draws the image either facing the right or left, depending on the direction.
    translate(this.displayX,this.displayY);
    
    if(this.up_down)
    {
      scale(1,this.direction);
      rotate(180);
    }
    else
    {
      scale(this.direction,1);
      rotate(90);
    }
    image(this.spritesheet,0,0,this.spriteWidth,this.spriteHeight,this.column*this.spriteWidth,this.row*this.spriteHeight,this.spriteWidth,this.spriteHeight);
    pop();
    
    //Creates the flow to actual animation. Adjusting the modulo variable to be lower increases the animation rate, higher numbers reduce the animation rate.
    
    if (frameCount % 8 === 0)
    {
      this.currentFrame++;
    }
  
    // Added side wall-collision so that sprites stay on the display.
    if((this.displayX > (width - 10)) || (this.displayX < 10))
    {
      this.moving *= -1;
      this.direction *= -1; //flips the direction of movement
    }
    if((this.displayY > (height - 10)) || (this.displayY < 110))
    {
      this.moving *= -1;
      this.direction *= -1; //flips the direction of movement
    }
    if(this.up_down)
    {
      this.displayY += this.moving*this.speed;
    }
    else
    {
      this.displayX += this.moving*this.speed;
    }
  }

  ifContainsSprite(x,y)
  {
    let insideX = ((x >= this.displayX - this.spriteWidth / 2) && (x <= this.displayX + this.spriteWidth / 2));
    let insideY = ((y >= this.displayY - this.spriteHeight / 2) && (y <= this.displayY + this.spriteHeight / 2));
    return (insideX && insideY);
  }

  kill()
  {
    this.moving = 0;
    this.spritesheet = spriteSheets[1];
    this.isDead = true;
  }
}