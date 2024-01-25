// declarations
let spriteSheet1;
let spriteSheet2;
let spriteSheet3;

let spriteAnimation1;
let spriteAnimation2;
let spriteAnimation3;


function preload()
{
  spriteSheet1 = loadImage("pixelArt/spelunkyGuy.png");
  spriteSheet2 = loadImage("pixelArt/spelunkyGreenGirl.png");
  spriteSheet3 = loadImage("pixelArt/spelunkyRobot.png");

}

function setup() 
{
  createCanvas(windowWidth-5, windowHeight-5);
  imageMode(CENTER);
  // Random coordinates with constraints so that the sprites do not
  // load off the display area.
  let randX1 = random(40,width-40);
  let randX2 = random(40,width-40);
  let randX3 = random(40,width-40);
  let randY1 = random(40,height-40);
  let randY2 = random(40,height-40);
  let randY3 = random(40,height-40);

  // creation of each sprite image
  spriteAnimation1 = new SpriteWalkingAnimation(spriteSheet1,80,80,randX1,randY1,9);
  spriteAnimation2 = new SpriteWalkingAnimation(spriteSheet2,80,80,randX2,randY2,9);
  spriteAnimation3 = new SpriteWalkingAnimation(spriteSheet3,80,80,randX3,randY3,9);
}

function draw() 
{
  background(220);
  // draw each instance of the animated sprites
  spriteAnimation1.draw();
  spriteAnimation2.draw();
  spriteAnimation3.draw();
}


function keyPressed()
{
  // allow each sprite to react to key presses
  spriteAnimation1.keyPressed();
  spriteAnimation2.keyPressed();
  spriteAnimation3.keyPressed();
}

function keyReleased()
{
  // allow each sprite to react to key releases
  spriteAnimation1.keyReleased();
  spriteAnimation2.keyReleased();
  spriteAnimation3.keyReleased();
}

class SpriteWalkingAnimation
{
  constructor(spritesheet, spriteWidth, spriteHeight, displayX, displayY, animationLength)
  {
    this.spritesheet = spritesheet;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.displayX = displayX;
    this.displayY = displayY;
    this.row = 0; 
    this.column = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.directionMoving = 1;
  }

  draw()
  {
    this.row = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
    push();
    translate(this.displayX,this.displayY);
    scale(this.directionMoving,1);

    image(this.spritesheet,0,0,this.spriteWidth,this.spriteHeight,this.row*this.spriteWidth,this.column*this.spriteHeight,this.spriteWidth,this.spriteHeight);
    pop();

    if (frameCount % 7 === 0)
    {
      this.currentFrame++;
    }
  
    // Added wall-collision so that sprites stay on the display.
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