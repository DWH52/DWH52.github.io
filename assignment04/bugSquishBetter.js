//Global Variables
let bug;
let deadBug;
let squishedBug;

let timeRemaining = 30;
let score = 0;
let gameCount = 0;
let gameOver = true;
let isPaused = false;
//END OF GLOBAL VARIABLES

//Core Program Functions
function preload()
{
   bug = loadImage("/assets/Bug.png");
   deadBug = loadImage("/assets/BugDead.png");
   squishedBug = loadImage("/assets/BugSquished.png");
}

function setup() 
{
  createCanvas(800, 800);
  imageMode(CENTER);
  textAlign(CENTER);
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
        push();
        image(bug, 400,400);
        pop();
    
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
        text("Time Remaining: " + ceil(timeRemaining), 400, 400); 
        text("Game Paused.", 400,350);
        textStyle("bold");
        text("Press ESCAPE to Resume.", 400,450);
        
    }
}

function notPlaying()
{
    if(gameCount != 0)
    {
        text("Game Over. Score: " + score , 400,350);
        textStyle("bold");
        text("Press SPACEBAR to Play Again.", 400,450);
    }
    else
    {
        text("Welcome to Bug Squisher!", 400,350);
        text("Click On Bugs to Squish Them. Each One Dead is a Point!", 400, 375);
        text("Controls: CLICK - Squish a Bug, ESCAPE - Pause the Game.", 400, 400);
        textStyle("bold");
        text("Press SPACEBAR to Play.", 400,450);
    }
}
//END OF GAMESTATES

//Keyboard Controls
function keyPressed()
{
    if(key === ' ') //Spacebar to Play
    {
        if(gameOver)
        { 
            timeRemaining = 30;
            score = 0;
            gameOver = false;
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


//Scoreboard