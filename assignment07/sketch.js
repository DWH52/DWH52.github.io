/*
BACKUP IF I CANNOT GET MODULATION TO WORK HOW I WANT IT TO.
let coinSFX1 = new Tone.Synth();
coinSFX1.volume.value = -10;
let coinSFX2 = new Tone.Synth();
coinSFX2.volume.value = -10;
const bitCrush = new Tone.BitCrusher(16).toDestination();
bitCrush.wet = 1;
const coinDelay = new Tone.Delay("16n")
coinSFX1.connect(bitCrush).toDestination();
coinSFX2.connect(coinDelay);
coinDelay.connect(bitCrush).toDestination();
*/

const squareWave1 = new Tone.Synth({
  oscillator: {
    type: "square"
  },
  envelope: {
    attack : .01,
    decay : 0.2,
    sustain : 0.5,
    release : 0.2,
  },
  volume : -15,
});

const squareWave2 = new Tone.Synth({
  oscillator: {
    type: "square"
  },
  envelope: {
    attack : .01,
    decay : 0.5,
    sustain : 0.5,
    release : 0.5,
  },
  volume : -15,
});

const bitCrush = new Tone.BitCrusher(16);
bitCrush.wet = .75;
const coinDelay = new Tone.Delay("16n");
squareWave1.chain(bitCrush, Tone.Destination);
squareWave2.chain(bitCrush, coinDelay, Tone.Destination);


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
  //coinSFX1.triggerAttackRelease("B5", "16n");
  //coinSFX2.triggerAttackRelease("E6", "8n");
  squareWave1.triggerAttackRelease("B5", "16n");
  squareWave2.triggerAttackRelease("E6", "8n");
}
