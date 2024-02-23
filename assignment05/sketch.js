//const synth = new Tone.Synth().toDestination();
//some changes
function preload()
{
  soundFX = new Tone.Players(
    {
      movieBoom : "assets/sounds/CinematicBoom.wav",
      artillery : "assets/sounds/Artillery.wav",
      war: "assets/sounds/War.wav",
      m16: "assets/sounds/M16.mp3",
      breathingHeavy: "assets/sounds/HeavyBreathing.wav",
      gulls: "assets/sounds/GullsByTheSea.wav",
      hz700: "assets/sounds/700hz.mp3",
    }
  ).toDestination();
}

function setup() 
{
  createCanvas(400, 400);

  button1 = createButton('Movie - Start Effect');
  button1.position(75, 25);
  button1.mousePressed(() => soundFX.player('movieBoom').start());

  button2 = createButton('Artillery');
  button2.position(75, 50);
  button2.mousePressed(()=> soundFX.player('artillery').start());

  button3 = createButton('War');
  button3.position(75,75);
  button3.mousePressed(() => soundFX.player('war').start());

  button4 = createButton('M16 - Burst');
  button4.position(75,100);
  button4.mousePressed(() => soundFX.player('m16').start());

  button5 = createButton('Heavy Breathing');
  button5.position(75,125);
  button5.mousePressed(() => soundFX.player('breathingHeavy').start());

  button6 = createButton('Beach Background');
  button6.position(75,150);
  button6.mousePressed(() => soundFX.player('gulls').start());
/*
  button7 = createButton('700hz');
  button7.position(75,175);
  button7.mousePressed(() => soundFX.player('hz700').start());
  */
}

function draw()
{
  background(220);
  text("PTSD, an interactive experience", 100, 20);
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
