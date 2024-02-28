const synth = new Tone.PolySynth().toDestination();
let notes = ["A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4"];
let displayText = [];
let userInput = [];
function setup() 
{
  createCanvas(400, 400);
  rectMode(CENTER);
  textAlign(CENTER);
  
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
  
}

function keyPressed()
{
  if( key == '1')
  {
    synth.triggerAttack("A3", "8n");
    userInput.push("A3");
  }
  if(key == '2')
  {
    synth.triggerAttack("B3", "8n");
    userInput.push("B3");
  }
  if(key == '3')
  {
    synth.triggerAttack("C4", "8n");
    userInput.push("C4");
  }
  if(key == '4')
  {
    synth.triggerAttack("D4", "8n");
    userInput.push("D4");
  }
  if(key == '5')
  {
    synth.triggerAttack("E4", "8n");
    userInput.push("E4");
  }
  if(key == '6')
  {
    synth.triggerAttack("F4", "8n");
    userInput.push("F4");
  }
  if(key == '7')
  {
    synth.triggerAttack("G4", "8n");
    userInput.push("G4");
  }
  if(key == '8')
  {
    synth.triggerAttack("A4", "8n");
    userInput.push("A4");
  }
}

function keyReleased()
{
  if( key == '1')
  {
    synth.triggerRelease("A3", "+0.03");
    userInput.pop("A3");
  }
  if(key == '2')
  {
    synth.triggerRelease("B3", "+0.03");
    userInput.pop("B3");
  }
  if(key == '3')
  {
    synth.triggerRelease("C4", "+0.03");
    userInput.pop("C4");
  }
  if(key == '4')
  {
    synth.triggerRelease("D4", "+0.03");
    userInput.pop("D4");
  }
  if(key == '5')
  {
    synth.triggerRelease("E4", "+0.03");
    userInput.pop("E4");
  }
  if(key == '6')
  {
    synth.triggerRelease("F4", "+0.03");
    userInput.pop("F4");
  }
  if(key == '7')
  {
    synth.triggerRelease("G4", "+0.03");
    userInput.pop("G4");
  }
  if(key == '8')
  {
    synth.triggerRelease("A4", "+0.03");
    userInput.pop("A4");
  }
}
