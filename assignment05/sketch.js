let soundFX = new Tone.Players(
  {
    movieBoom : "assets/sounds/CinematicBoom.wav",
    clock : "assets/sounds/clockTick.wav",
    rock: "assets/sounds/rockIntroTest.mp3",
    car: "assets/sounds/car.wav",
    schoolBell: "assets/sounds/schoolBell.wav",
    success: "assets/sounds/success.wav",
  }
);


let delaySlider;
let delay = new Tone.FeedbackDelay("8n", 0.5);

let volumeSlider;
let volume = new Tone.Volume(0);
//Effect Chain
soundFX.connect(volume);
volume.connect(delay);
delay.toDestination();

function setup() 
{
  createCanvas(400, 400);

  button1 = createButton('Movie - Start Effect');
  button1.position(25, 25);
  button1.mousePressed(() => soundFX.player('movieBoom').start());

  button2 = createButton('Clock Ticking');
  button2.position(25, 50);
  button2.mousePressed(()=> soundFX.player('clock').start());

  button3 = createButton('Car Start & Drive');
  button3.position(25,75);
  button3.mousePressed(() => soundFX.player('car').start());

  button4 = createButton('Rock');
  button4.position(25,100);
  button4.mousePressed(() => soundFX.player('rock').start());

  button5 = createButton('Success');
  button5.position(25,125);
  button5.mousePressed(() => soundFX.player('success').start());

  button6 = createButton('School Bells');
  button6.position(25,150);
  button6.mousePressed(() => soundFX.player('schoolBell').start());

  volumeSlider = createSlider(-20, 20, 0, 1);
  volumeSlider.position(250, 20);
  volumeSlider.mouseMoved(() => volume.volume.value = volumeSlider.value());
  
  delaySlider = createSlider(0, 1, 0, 0.05);
  delaySlider.position(250, 50);
  delaySlider.mouseMoved(() => delay.delayTime.value = delaySlider.value());
}

function draw()
{
  background(220);
  text(`Volume: ${volumeSlider.value()}`, 250, 20);
  text(`Delay: ${delaySlider.value()}`, 250, 50);
}


//const synth = new Tone.Synth().toDestination();
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
