const synth1 = new Tone.PolySynth(Tone.Synth);
const synth2 = new Tone.PolySynth(Tone.AMSynth);

let notes = ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"];
let displayText = [];
let userInput = [];

let selectedOctave = 4;
let octaveSlider;
let instrumentSelect;

//effect chain
let volumeSlider;
let volume = new Tone.Volume(0);

let freeverbCheckbox;
let freeverbIsChecked = false;
let freeverbSlider;
let freeverb = new Tone.Freeverb();

synth1.connect(volume);
synth2.connect(volume);
volume.toDestination();


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
  volumeSlider.position(width*(1/2), 100);1
  volumeSlider.mouseMoved(() => volume.volume.value = volumeSlider.value());

  octaveSlider = createSlider(1, 8, selectedOctave, 1);
  octaveSlider.position(width*(1/2), 150);
  octaveSlider.mouseMoved(() => selectedOctave = octaveSlider.value());

  freeverbCheckbox = createCheckbox("Freeverb", false);
  freeverbCheckbox.position(width*(3/4) - 25, 250)

  freeverbSlider = createSlider(500,2000,500,500);
  freeverbSlider.position(width*(1/2), 200);
  freeverbSlider.mouseMoved(() => freeverb.dampening = freeverbSlider.value());
  freeverbSlider.hide();

 
  
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

  if(freeverbCheckbox.checked())
  {
    freeverbSlider.show();
    volume.connect(freeverb);
    freeverb.toDestination();
    text(`Freeverb: ${freeverbSlider.value()}`, width*(3/4), 200);
  }
  else
  {
    freeverbSlider.hide();
    freeverb.disconnect();
    volume.toDestination();
  }
  text(`Volume: ${volumeSlider.value()}`, width*(3/4), 100);
  text(`Octave: ${selectedOctave}`, width*(3/4), 150);
  
  notes = [`A${selectedOctave - 1}`, `B${selectedOctave - 1}`, `C${selectedOctave}`, `D${selectedOctave}`, `E${selectedOctave}`, `F${selectedOctave}`, `G${selectedOctave}`, `A${selectedOctave}`]
  
}

function keyPressed()
{
  Tone.start();
  if( keyCode == UP_ARROW && selectedOctave != 8)
  {
    selectedOctave++;
    octaveSlider.value(selectedOctave);
  }
  if(keyCode == DOWN_ARROW && selectedOctave != 1)
  {
    selectedOctave--;
    octaveSlider.value(selectedOctave);
  }
  if(instrumentSelect.selected() === 'Simple Synth')
  {
    if( key == '1')
    {
      synth1.triggerAttack(`A${selectedOctave - 1}`, "8n");
      userInput.push(`A${selectedOctave - 1}`);
    }
    if(key == '2')
    {
      synth1.triggerAttack(`B${selectedOctave - 1}`, "8n");
      userInput.push(`B${selectedOctave - 1}`);
    }
    if(key == '3')
    {
      synth1.triggerAttack(`C${selectedOctave}`, "8n");
      userInput.push(`C${selectedOctave}`);
    }
    if(key == '4')
    {
      synth1.triggerAttack(`D${selectedOctave}`, "8n");
      userInput.push(`D${selectedOctave}`);
    }
    if(key == '5')
    {
      synth1.triggerAttack(`E${selectedOctave}`, "8n");
      userInput.push(`E${selectedOctave}`);
    }
    if(key == '6')
    {
      synth1.triggerAttack(`F${selectedOctave}`, "8n");
      userInput.push(`F${selectedOctave}`);
    }
    if(key == '7')
    {
      synth1.triggerAttack(`G${selectedOctave}`, "8n");
      userInput.push(`G${selectedOctave}`);
    }
    if(key == '8')
    {
      synth1.triggerAttack(`A${selectedOctave}`, "8n");
      userInput.push(`A${selectedOctave}`);
    }
  }
  else if(instrumentSelect.selected() === 'AM Synth')
  {
    if( key == '1')
    {
      synth2.triggerAttack(`A${selectedOctave - 1}`, "8n");
      userInput.push(`A${selectedOctave - 1}`);
    }
    if(key == '2')
    {
      synth2.triggerAttack(`B${selectedOctave - 1}`, "8n");
      userInput.push(`B${selectedOctave - 1}`);
    }
    if(key == '3')
    {
      synth2.triggerAttack(`C${selectedOctave}`, "8n");
      userInput.push(`C${selectedOctave}`);
    }
    if(key == '4')
    {
      synth2.triggerAttack(`D${selectedOctave}`, "8n");
      userInput.push(`D${selectedOctave}`);
    }
    if(key == '5')
    {
      synth2.triggerAttack(`E${selectedOctave}`, "8n");
      userInput.push(`E${selectedOctave}`);
    }
    if(key == '6')
    {
      synth2.triggerAttack(`F${selectedOctave}`, "8n");
      userInput.push(`F${selectedOctave}`);
    }
    if(key == '7')
    {
      synth2.triggerAttack(`G${selectedOctave}`, "8n");
      userInput.push(`G${selectedOctave}`);
    }
    if(key == '8')
    {
      synth2.triggerAttack(`A${selectedOctave}`, "8n");
      userInput.push(`A${selectedOctave}`);
    }
  }
  
}

function keyReleased()
{  
  if( key == '1')
  {
    synth1.triggerRelease(`A${selectedOctave - 1}`, "+0.03");
    synth2.triggerRelease(`A${selectedOctave - 1}`, "+0.03");
    userInput.pop(`A${selectedOctave - 1}`);
  }
  if(key == '2')
  {
    synth1.triggerRelease(`B${selectedOctave - 1}`, "+0.03");
    synth2.triggerRelease(`B${selectedOctave - 1}`, "+0.03");
    userInput.pop(`B${selectedOctave - 1}`);
  }
  if(key == '3')
  {
    synth1.triggerRelease(`C${selectedOctave}`, "+0.03");
    synth2.triggerRelease(`C${selectedOctave}`, "+0.03");
    userInput.pop(`C${selectedOctave}`);
  }
  if(key == '4')
  {
    synth1.triggerRelease(`D${selectedOctave}`, "+0.03");
    synth2.triggerRelease(`D${selectedOctave}`, "+0.03");
    userInput.pop(`d${selectedOctave}`);
  }
  if(key == '5')
  {
    synth1.triggerRelease(`E${selectedOctave}`, "+0.03");
    synth2.triggerRelease(`E${selectedOctave}`, "+0.03");
    userInput.pop(`E${selectedOctave}`);
  }
  if(key == '6')
  {
    synth1.triggerRelease(`F${selectedOctave}`, "+0.03");
    synth2.triggerRelease(`F${selectedOctave}`, "+0.03");
    userInput.pop(`F${selectedOctave}`);
  }
  if(key == '7')
  {
    synth1.triggerRelease(`G${selectedOctave}`, "+0.03");
    synth2.triggerRelease(`G${selectedOctave}`, "+0.03");
    userInput.pop(`G${selectedOctave}`);
  }
  if(key == '8')
  {
    synth1.triggerRelease(`A${selectedOctave}`, "+0.03");
    synth2.triggerRelease(`A${selectedOctave}`, "+0.03");
    userInput.pop(`A${selectedOctave}`);
  }
  else
  {
    if(!keyIsPressed)
    {
      synth1.releaseAll();
      synth2.releaseAll();
    }
  }
}
