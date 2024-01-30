// declarations
let spriteSheets = [];
let spriteAnimation = [];


function preload()
{
  spriteSheets = [loadImage("pixelArt/spelunkyGuy.png"), loadImage("pixelArt/spelunkyGreenGirl.png"), loadImage("pixelArt/spelunkyRobot.png")];
}

function setup() 
{
  createCanvas(windowWidth-5, windowHeight-5);
  imageMode(CENTER);
  // Random coordinates with constraints so that the sprites do not
  // load off the display area.
  let randX = [random(40,width-40), random(40,width-40), random(40,width-40)];
  let randY = [random(40,height-40), random(40,height-40), random(40,height-40)];

  // creation of each sprite image
  for(i = 0; i <= 2; i++)
  {
    spriteAnimation[i] = new SpriteMovementAnimation(spriteSheets[i],80,80,randX[i],randY[i],9);
  }
}

function draw() 
{
  background(220);
  // draw each instance of the animated sprites
  for(i = 0; i <= 2; i++)
  {
    spriteAnimation[i].draw();
  }
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
  constructor(spritesheet, spriteWidth, spriteHeight, displayX, displayY, animationLength)
  {
    this.spritesheet = spritesheet; 
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.displayX = displayX;
    this.displayY = displayY;
    this.animationLength = animationLength;
    this.row = 0;                                 // row of the sprite sheet to pull frame from
    this.column = 0;                              // column of the sprite sheet to pull frame from
    this.currentFrame = 0;
    this.moving = 0;
    this.directionMoving = 1;
  }

  draw()
  {
    // Checks if the target is moving. Initiating the condition.
    // Sets the row of the sprite sheet to the remainder
    // between the current frame and the animation length total
    // if the condition is met. Otherwise sets the row of the sprite
    // sheet to 0, where the idle/non-moving frames are.
    this.row = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;

    push();
    // Shifts the image, left or right based on the change to displayX/Y (The X and Y coordinate of the canvas)
    translate(this.displayX,this.displayY);
    // Draws the image either facing the right or left, depending on the direction.
    scale(this.directionMoving,1);

    image(this.spritesheet,0,0,this.spriteWidth,this.spriteHeight,this.row*this.spriteWidth,this.column*this.spriteHeight,this.spriteWidth,this.spriteHeight);
    pop();

    //Creates the flow to actual animation. Adjusting the modulo variable to be lower increases the animation rate, higher numbers reduce the animation rate.
    if (frameCount % 6 === 0)
    {
      this.currentFrame++;
    }
  
    // Added side wall-collision so that sprites stay on the display.
    if(this.displayX <= 20 )
    {
      this.moving = 0;
      this.displayX = 21;
    }
    if(this.displayX >= (width-20))
    {
      this.moving = 0;
      this.displayX = width-21;
    }
    this.displayX += this.moving;
  }

  keyPressed()
  {
    if(keyCode === RIGHT_ARROW)
    {
      this.moving = 2;
      this.directionMoving = 1;
      this.currentFrame = 1;
    }
    else if (keyCode === LEFT_ARROW)
    {
      this.moving = -2;
      this.directionMoving = -1;
      this.currentFrame = 1;
    }
  }

  keyReleased()
  {
    if(keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW)
    {
      this.moving = 0;
    }
  }
}