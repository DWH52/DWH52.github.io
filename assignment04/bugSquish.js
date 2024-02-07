let spriteSheets = [];
let spriteAnimation = [];

let numberOfAnimations = 5;

function preload()
{
  spriteSheets = [loadImage("assets/Bug.png"),loadImage("assets/BugSquished.png"),loadImage("assets/BugDead.png")];
}

function setup() 
{
  createCanvas(800, 800);
  
  imageMode(CENTER);
  angleMode(DEGREES);
  
  for(i = 0; i < numberOfAnimations; i++)
  {
    spriteAnimation[i] = new SpriteMovementAnimation(spriteSheets[0],32,32,8, random([1,4]));
  }
}

function draw() 
{
  background(220);
  for(i = 0; i < numberOfAnimations; i++)
  {
    spriteAnimation[i].draw();
  }

}

function mousePressed()
{
  for(i = 0; i < spriteAnimation.length; i++)
  {
    let contains = spriteAnimation[i].ifContainsSprite(mouseX, mouseY);
    if(contains)
    {
      spriteAnimation[i].spritesheet = spriteSheets[2];
      spriteAnimation[i].stop();
    }
  }
}



class ScoreBoard
{
  constructor()
  {

  }

  draw()
  {

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
    this.displayY = random(40,height-40);
    this.animationLength = animationLength;
    this.row = 0;                                 // row of the sprite sheet to pull frame from
    this.column = 0;                              // column of the sprite sheet to pull frame from
    this.currentFrame = 0;
    this.direction = random([-1,1]);
    this.moving = this.direction;
    this.speed = speed;
    this.up_down = random([true,false]);
    
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
    
    if (frameCount % (32/this.speed) === 0)
    {
      this.currentFrame++;
    }
  
    // Added side wall-collision so that sprites stay on the display.
    if((this.displayX > (width - 10)) || (this.displayX < 10))
    {
      this.moving *= -1;
      this.direction *= -1; //flips the direction of movement
    }
    if((this.displayY > (height - 10)) || (this.displayY < 10))
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

  stop()
  {
    this.moving = 0;
    this.spritesheet = spriteSheets[1];
  }
}