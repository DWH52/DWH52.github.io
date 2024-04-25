//Global Variables
let squishSound;
let mainMusic;

let spriteSheets = [];
let spriteAnimation = [];

let gameFont;
let numberOfAnimations;
let timeRemaining;
let initialSpeed = 1;
let score = 0;
let gameCount = 0;
let gameOver = true;
let isPaused = false;

let port;
let connected = false;
let joyX = 0, joyY = 0, sw = 0, auxButton = 0;
let connectButton;
let circleX, circleY;
let controlSpeed = 4;

let previousSW = 0;
let previousAux = 0;


//END OF GLOBAL VARIABLES

//Core Program Functions
function preload()
{
  squishSound = new Tone.Player("assets/sounds/crunch.mp3");
  squishSound.toDestination();
  mainMusic = new Tone.Player("assets/sounds/bitBeatsSix.mp3");
  mainMusic.loop = true;
  mainMusic.toDestination();
  spriteSheets = [loadImage("assets/Bug.png"),loadImage("assets/BugSquished.png"),loadImage("assets/BugDead.png")];
  gameFont = loadFont("assets/PressStart2P-Regular.ttf");
}

function setup() 
{
  port = createSerial();
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);
  textFont(gameFont);

  circleX = width / 2;
  circleY = height / 2;

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);
  connectButton.position(20,20);
  connectButton.hide();

  for(i = 0; i < numberOfAnimations; i++)
  {
    spriteAnimation[i] = new SpriteMovementAnimation(spriteSheets[0],32,32,8, (random([1,4])*initialSpeed));
  }
}

function draw() 
{ 
  //port.write('0');
  if(frameCount % 300 == 0)
    {
      port.clear();
    }
  let str = port.readUntil("\n");
  let values = str.split(",");
  auxButton = values[3];
  let auxButtonDiff = previousAux + auxButton;

  if(!connected)
  {
    connectButton.show();
  }
  else
  {
    connectButton.hide();
  }
  console.log(`values : ${values}`)

    if(gameOver)
    {   
        background(0);
        fill(255,255,255);
        textSize(24);
        notPlaying();
        if(auxButtonDiff == 1)
        {
          buttonPressed();
        }
    }
    else
    {   
        background(29,132,32);
        fill(0);
        textStyle('bold');
        playing(values);
    }
}
//END OF CORE PROGRAM FUNCTIONS

//Gamestates
function playing(values)
{
    if(!isPaused)
    {
        gameCount += 1;
        if (values.length > 2) 
        {
          joyX = values[0];
          joyY = values[1];
          sw = Number(values[2]);
      
          if (joyX > 0) {
            circleX += (controlSpeed + (abs(joyX)*0.01));
          } else if (joyX < 0) {
            circleX -= (controlSpeed + (abs(joyX)*0.01));
          }
      
          if (joyY > 0) {
            circleY += (controlSpeed + (abs(joyY)*0.01));
          } else if (joyY < 0) {
            circleY -= (controlSpeed + (abs(joyY)*0.01));
          }
        }
      
        if (previousSW - sw != 0) {
          smashPressed();
        }
        console.log(sw);

        for(i = 0; i < numberOfAnimations; i++)
        {
            spriteAnimation[i].draw();
        }

        push();
        blendMode(REMOVE);
        fill(0,0,0,50);
        circle(circleX, circleY, 50);
        blendMode(BLEND);
        fill(0);
        rect((windowWidth/2),50,windowWidth,100);
        fill(255,255,255);
        textSize(18);
        text("Score: " + score, (width/4), 60);
        textSize(22);
        text("Bug Squisher", (width/2) - 40, 60);
        textSize(18);
        text("Time Remaining: " + ceil(timeRemaining), width-(width/4),60);
        timeRemaining -= (deltaTime/1000);
        if(timeRemaining <= 0)
        {
            gameOver = true;
        }
        pop();

        previousSW = sw;

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
      mainMusic.stop();
      text("Game Over. Score: " + score , windowWidth/2,(windowHeight/2)-100);
      textStyle("bold");
      text("Press Button to Play Again.", windowWidth/2,(windowHeight/2)+100);
      
    }
    else
    {
      mainMusic.stop();
      push();
      textSize(24);
      text("Welcome to Bug Squisher!", windowWidth/2,(windowHeight/2)-100);
      textSize(16);
      text("Hover Over and Smash Bugs to Squish Them. Each One Dead is a Point!", windowWidth/2,(windowHeight/2)-50);
      text("Controls-", windowWidth/2,(windowHeight/2))
      text("Joystick/Joystick Button: Move Cursor / Squish Bug.", windowWidth/2,(windowHeight/2)+50);
      textStyle("bold");
      text("Press Button to Play.", windowWidth/2,(windowHeight/2)+100);
      pop();
    }
}
//END OF GAMESTATES

//Keyboard & Mouse Controls
function buttonPressed()
{
    //if(key === ' ') //Spacebar to Play
    //{
        if(gameOver)
        {
          Tone.Transport.start();
          mainMusic.playbackRate = 1;
          mainMusic.start();
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
    //}
    /*if(keyCode === ESCAPE) //Pause Button
    {
      if(!gameOver)
      {
        mainMusic.stop();
        //Tone.Transport.pause();
        isPaused = !isPaused;
      }
      if(!isPaused)
      {
        //Tone.Transport.start("+0", Tone.Transport.position);
        mainMusic.start();
      }
    }*/
}

function smashPressed()
{
  if(!isPaused && !gameOver)
  {  
    for(i = 0; i < numberOfAnimations; i++)
    {
        let contains = spriteAnimation[i].ifContainsSprite(circleX, circleY);
        if(contains)
        {
            if(spriteAnimation[i].isDead == false)
            {
              squishSound.stop();
              squishSound.start();
              score += 1;
              
              spriteAnimation[i].spritesheet = spriteSheets[2];
              spriteAnimation[i].kill();
              initialSpeed *= 1.05;
              mainMusic.playbackRate = mainMusic.playbackRate *= 1.02;
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
    let insideX = ((x + 20 >= this.displayX - this.spriteWidth / 2) && (x - 20 <= this.displayX + this.spriteWidth / 2));
    let insideY = ((y + 20 >= this.displayY - this.spriteHeight / 2) && (y - 20 <= this.displayY + this.spriteHeight / 2));
    return (insideX && insideY);
  }

  kill()
  {
    this.moving = 0;
    this.spritesheet = spriteSheets[1];
    this.isDead = true;

    let message = `${(score % 3) + 1}\n`;
    port.write(message);
  }
}

function connect() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
    connected = true;
  } else {
    port.close();
    connected = false;
  }
}
