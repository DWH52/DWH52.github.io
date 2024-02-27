const synth = new Tone.PolySynth().toDestination();
let notes = ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"];
let displayText = [];
function setup() 
{
  createCanvas(400, 400);
  
}

function draw()
{
  background(220);
  for(i = 0; i < notes.length; i++ )
  {
    displayText[i] = text(`${i+1} = ${notes[i]}`, 40*(i+1), 50);
  }
}

function keyPressed()
{
  if( key == '1')
  {
    synth.triggerAttack("A3", "8n");
  }
  if(key == '2')
  {
    synth.triggerAttack("B3", "8n");
  }
  if(key == '3')
  {
    synth.triggerAttack("C4", "8n");
  }
  if(key == '4')
  {
    synth.triggerAttack("D4", "8n");
  }
  if(key == '5')
  {
    synth.triggerAttack("E4", "8n");
  }
  if(key == '6')
  {
    synth.triggerAttack("F4", "8n");
  }
  if(key == '7')
  {
    synth.triggerAttack("G4", "8n");
  }
  if(key == '8')
  {
    synth.triggerAttack("A4", "8n");
  }
}

function keyReleased()
{
  fill(0,0,0);
  if( key == '1')
  {
    synth.triggerRelease("A3", "+0.03");
    
  }
  if(key == '2')
  {
    synth.triggerRelease("B3", "+0.03");
  }
  if(key == '3')
  {
    synth.triggerRelease("C4", "+0.03");
  }
  if(key == '4')
  {
    synth.triggerRelease("D4", "+0.03");
  }
  if(key == '5')
  {
    synth.triggerRelease("E4", "+0.03");
  }
  if(key == '6')
  {
    synth.triggerRelease("F4", "+0.03");
  }
  if(key == '7')
  {
    synth.triggerRelease("G4", "+0.03");
  }
  if(key == '8')
  {
    synth.triggerRelease("A4", "+0.03");
  }
}
