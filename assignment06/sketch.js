const synth1 = new Tone.PolySynth(Tone.Synth);
const synth2 = new Tone.PolySynth(Tone.AMSynth);

let notes = ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"];
let displayText = [];
let userInput = [];

let octave = {
  0 : 3,
  12 : 4,
  24 : 5,
}

let selectedOctave;

let instrumentSelect;

let volumeSlider;
let volume = new Tone.Volume(0);

let pitchSlider;
let pitchShift = new Tone.PitchShift();

synth1.connect(volume);
synth2.connect(volume);
volume.connect(pitchShift);
pitchShift.toDestination();

function setup() 
{
  createCanvas(400, 400);
  rectMode(CENTER);
  textAlign(CENTER);
  
  instrumentSelect = createSelect();
  instrumentSelect.position(100,0);
  instrumentSelect.option('Simple Synth');
  instrumentSelect.option('AM Synth');
  instrumentSelect.selected('Simple Synth');

  volumeSlider = createSlider(-20, 20, 0, 1);
  volumeSlider.position(width*(1/2), height-100);
  volumeSlider.mouseMoved(() => volume.volume.value = volumeSlider.value());

  pitchSlider = createSlider(-12, 12, 0, 12);
  pitchSlider.position(width*(1/2), height-50);
  pitchSlider.mouseMoved(() => pitchShift.pitch = pitchSlider.value());
}

function draw()
{
  background(220);
  stroke("black");
  strokeWeight(1);
  rect(50, 200, width/4, height);
  noStroke();
  for(i = 0; i < notes.length; i++ )
  {
    displayText[i] = text(`${i+1} = ${notes[i]}`, (width/8), 40*(i+1));
  }
  if(userInput != null)
  {
    stroke("black");
    text("Currently Playing:", (width*(1/4) + 150), 30);
    text(`${userInput}`, ((width/4) + 150), 50);
  }

  text(`Volume: ${volumeSlider.value()}`, width*(3/4), height-100);
  text(`Pitch: ${octave[pitchSlider.value()+12]}`, width*(3/4), height-50);
  selectedOctave = octave[pitchSlider.value()+12];
  notes = [`A${selectedOctave}`, "B3", "C4", "D4", "E4", "F4", "G4", "A4"]
  
}

function keyPressed()
{
  if(instrumentSelect.selected() === 'Simple Synth')
  {
    if( key == '1')
    {
      synth1.triggerAttack(`A${selectedOctave}`, "8n");
      userInput.push(`A${selectedOctave}`);
    }
    if(key == '2')
    {
      synth1.triggerAttack("B3", "8n");
      userInput.push("B3");
    }
    if(key == '3')
    {
      synth1.triggerAttack("C4", "8n");
      userInput.push("C4");
    }
    if(key == '4')
    {
      synth1.triggerAttack("D4", "8n");
      userInput.push("D4");
    }
    if(key == '5')
    {
      synth1.triggerAttack("E4", "8n");
      userInput.push("E4");
    }
    if(key == '6')
    {
      synth1.triggerAttack("F4", "8n");
      userInput.push("F4");
    }
    if(key == '7')
    {
      synth1.triggerAttack("G4", "8n");
      userInput.push("G4");
    }
    if(key == '8')
    {
      synth1.triggerAttack("A4", "8n");
      userInput.push("A4");
    }
  }
  else if(instrumentSelect.selected() === 'AM Synth')
  {
    if( key == '1')
    {
      synth2.triggerAttack("A3", "8n");
      userInput.push("A3");
    }
    if(key == '2')
    {
      synth2.triggerAttack("B3", "8n");
      userInput.push("B3");
    }
    if(key == '3')
    {
      synth2.triggerAttack("C4", "8n");
      userInput.push("C4");
    }
    if(key == '4')
    {
      synth2.triggerAttack("D4", "8n");
      userInput.push("D4");
    }
    if(key == '5')
    {
      synth2.triggerAttack("E4", "8n");
      userInput.push("E4");
    }
    if(key == '6')
    {
      synth2.triggerAttack("F4", "8n");
      userInput.push("F4");
    }
    if(key == '7')
    {
      synth2.triggerAttack("G4", "8n");
      userInput.push("G4");
    }
    if(key == '8')
    {
      synth2.triggerAttack("A4", "8n");
      userInput.push("A4");
    }
  }
  
}

function keyReleased()
{
  if( key == '1')
  {
    synth1.triggerRelease(`A${selectedOctave}`, "+0.03");
    synth2.triggerRelease(`A${selectedOctave}`, "+0.03");
    userInput.pop(`A${selectedOctave}`);
  }
  if(key == '2')
  {
    synth1.triggerRelease("B3", "+0.03");
    synth2.triggerRelease("B3", "+0.03");
    userInput.pop("B3");
  }
  if(key == '3')
  {
    synth1.triggerRelease("C4", "+0.03");
    synth2.triggerRelease("C4", "+0.03");
    userInput.pop("C4");
  }
  if(key == '4')
  {
    synth1.triggerRelease("D4", "+0.03");
    synth2.triggerRelease("D4", "+0.03");
    userInput.pop("D4");
  }
  if(key == '5')
  {
    synth1.triggerRelease("E4", "+0.03");
    synth2.triggerRelease("E4", "+0.03");
    userInput.pop("E4");
  }
  if(key == '6')
  {
    synth1.triggerRelease("F4", "+0.03");
    synth2.triggerRelease("F4", "+0.03");
    userInput.pop("F4");
  }
  if(key == '7')
  {
    synth1.triggerRelease("G4", "+0.03");
    synth2.triggerRelease("G4", "+0.03");
    userInput.pop("G4");
  }
  if(key == '8')
  {
    synth1.triggerRelease("A4", "+0.03");
    synth2.triggerRelease("A4", "+0.03");
    userInput.pop("A4");
  }
}
