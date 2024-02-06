let spriteSheets = [];
let spriteAnimation = [];


function preload()
{
  spriteSheets = [loadImage("assets/Bug.png"),loadImage("assets/BugSquished.png"),loadImage("assets/BugDead.png")];
}

function setup() 
{
  createCanvas(800, 800);
  
  imageMode(CENTER);
  angleMode(DEGREES);
  

  spriteAnimation[0] = new SpriteMovementAnimation(spriteSheets[0],32,32,8);
}

function draw() 
{
  background(220);
  spriteAnimation[0].draw();
  

}

function keyPressed()
{
  // allow each sprite to react to key presses
  for(i = 0; i <= 2; i++)
  {
    spriteAnimation[i].keyPressed();
  }
}

function keyReleased()
{
  // allow each sprite to react to key releases
  for(i = 0; i <= 2; i++)
  {
    spriteAnimation[i].keyReleased();
  }
}

class SpriteMovementAnimation
{
  constructor(spritesheet, spriteWidth, spriteHeight, animationLength)
  {
    this.spritesheet = spritesheet; 
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.displayX = random(40,width-40);
    this.displayY = random(40,height-40);
    this.animationLength = animationLength;
    this.row = 0;                                 // row of the sprite sheet to pull frame from
    this.column = 0;                              // column of the sprite sheet to pull frame from
    this.currentFrame = 0;
    this.moving = 1;
    this.directionMoving = 1;
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
    
    scale(this.directionMoving);
    

    image(this.spritesheet,this.displayX,this.displayY,this.spriteWidth,this.spriteHeight,this.column*this.spriteWidth,this.row*this.spriteHeight,this.spriteWidth,this.spriteHeight);
    pop();
    
    //Creates the flow to actual animation. Adjusting the modulo variable to be lower increases the animation rate, higher numbers reduce the animation rate.
    if (frameCount % 12 === 0)
    {
      this.currentFrame++;
      
    }
  
    // Added side wall-collision so that sprites stay on the display.
    if(this.displayX <= 10 )
    {
      this.moving = 0;
      this.displayX = 11;
      this.moving = 1;
    }
    if(this.displayX >= (width-10))
    {
      this.moving = 0;
      this.displayX = width-11;
      this.moving = -1;
    }
    this.displayX += this.moving;
  }

}