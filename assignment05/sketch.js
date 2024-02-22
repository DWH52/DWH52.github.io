//const synth = new Tone.Synth().toDestination();
//some changes
function preload()
{
  soundFX = new Tone.Players(
    {
      rock : "assets/sounds/rockIntroTest.mp3",
      base : "assets/sounds/baseDrum.mp3",
      eSnare: "assets/sounds/electricSnare.mp3",
      tSnare: "assets/sounds/tightSnare.mp3",
      hz500: "assets/sounds/500hz.mp3",
      hz600: "assets/sounds/600hz.mp3",
      hz700: "assets/sounds/700hz.mp3",
    }
  ).toDestination();
}

function setup() 
{
  createCanvas(400, 400);

  button1 = createButton('Rock');
  button1.position(75, 25);
  button1.mousePressed(() => soundFX.player('rock').start());
/*
  button2 = createButton('Base Drum');
  button2.position(75, 50);
  button2.mousePressed(()=> soundFX.player('base').start());

  button3 = createButton('Electronic Snare');
  button3.position(75,75);
  button3.mousePressed(() => soundFX.player('eSnare').start());

  button4 = createButton('Tight Snare');
  button4.position(75,100);
  button4.mousePressed(() => soundFX.player('tSnare').start());

  button5 = createButton('500hz');
  button5.position(75,125);
  button5.mousePressed(() => soundFX.player('hz500').start());

  button6 = createButton('600hz');
  button6.position(75,150);
  button6.mousePressed(() => soundFX.player('hz600').start());

  button7 = createButton('700hz');
  button7.position(75,175);
  button7.mousePressed(() => soundFX.player('hz700').start());
  */
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
