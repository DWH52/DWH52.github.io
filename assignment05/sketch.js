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

let volumeSlider;
let volume = new Tone.Volume(0);

let delayNote = [0,"1n","2n","4n","8n","16n"]
let delayTempoSlider;
let delay = new Tone.FeedbackDelay(delayNote[0], 0);

let phaserFrequencySlider;
let phaser = new Tone.Phaser(
  {
    frequency: 0,
    octaves: 5,
    baseFrequency: 100
  }
)
//Effect Chain
soundFX.connect(volume);
volume.connect(delay);
delay.connect(phaser);
phaser.toDestination();

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

  delaySlider = createSlider(0, 1, 0, 0.2);
  delaySlider.position(250, 50);
  delaySlider.mouseMoved(() => delay.feedback.value = delaySlider.value());
  
  delayTempoSlider = createSlider(0, 5, 0, 1);
  delayTempoSlider.position(250, 80);
  delayTempoSlider.mouseMoved(() => delay.delayTime.value = delayNote[delayTempoSlider.value()]);

  phaserFrequencySlider = createSlider(0, 10, 0, 0.5);
  phaserFrequencySlider.position(250, 110);
  phaserFrequencySlider.mouseMoved(() => phaser.frequency.value = phaserFrequencySlider.value());
}

function draw()
{
  background(220);
  text(`Volume: ${volumeSlider.value()}`, 250, 20);
  text(`Delay: ${delaySlider.value()}`, 250, 50);
  text(`Delay Tempo: ${delayNote[delayTempoSlider.value()]}`, 250, 80);
  text(`Phaser Frequency: ${phaserFrequencySlider.value()}`, 250, 110);
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
