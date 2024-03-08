let chaChing = new Tone.PolySynth(Tone.AMSynth).toDestination();
//The way to create the Super Mario coin sound is by 
//playing an octave or 4th interval upwards at a fast 
//tempo. Use a square wave from a synthesizer and 
//edit the decay value (or release) to the desired 
//length. Place the synth in mono so that 
//only 1 note plays at a time.

function preload()
{
  eventImage = loadImage("assets/GoldCoin.png");
}

function setup() 
{
  Tone.start();
  createCanvas(400, 400);
  imageMode(CENTER);
  
}

function draw()
{
  background(220);
  if(mouseIsPressed)
  {
    image(eventImage,width/2,height/2,100,100);
  }
}

function mousePressed()
{
  chaChing.triggerAttackRelease(["A2","D3"], .5);
}
