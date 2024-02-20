const synth = new Tone.Synth().toDestination();

function preload()
{
  soundFX = new Tone.Players(
    {
      rock : "assets/sounds/rockIntroTest.mp3",
      base : "assets/sounds/baseDrum.mp3",
      eSnare: "assets/sounds/electricSnare.mp3",
      tSnare: "assets/sounds/tightSnare.mp3",
    }
  ).toDestination();
}

function setup() 
{
  createCanvas(400, 400);

  button1 = createButton('Rock');
  button1.position(75, 100);
  button1.mousePressed(() => soundFX.player('rock').start());
}

function draw()
{
  background(220);
}



/*function keyPressed() *** THIS IS FOR ASSIGNMENT 06
{
  if( key == '1')
  {
    synth.triggerAttackRelease("A3", "8n");
  }
  if(key == '2')
  {
    synth.triggerAttackRelease("B3", "8n");
  }
  if(key == '3')
  {
    synth.triggerAttackRelease("C4", "8n");
  }
  if(key == '4')
  {
    synth.triggerAttackRelease("D4", "8n");
  }
  if(key == '5')
  {
    synth.triggerAttackRelease("E4", "8n");
  }
  if(key == '6')
  {
    synth.triggerAttackRelease("F4", "8n");
  }
  if(key == '7')
  {
    synth.triggerAttackRelease("G4", "8n");
  }
}*/