let canvas;
let port, connectButton;
let analogDimmer = 0;
let bulbStroke;
let nightMode = true;

function setup() {
  port = createSerial(); // Be sure to install webserial api lib.
  canvas = createCanvas(400, 400);
  rectMode(CENTER);

  connectButton = createButton("Connect");
  connectButton.mousePressed(connect);
  
  
}

function draw() {
  if(nightMode)
    {
      background('black')
      bulbStroke = 'white';
      let message = '0\n';
      port.write(message);
      analogDimmer = 0;
      noStroke();
      fill(130,130,130);
      rect(200,195, 40, 50);
      stroke(bulbStroke);
      fill(255,255,0, analogDimmer);
      circle(200,125,100);
      canvas.mouseClicked(nightModeToggle)
    }
  else
    {
      background('white');
      bulbStroke = 'black';
      let message = '1\n';
      port.write(message);
      
      analogDimmer = port.readUntil('\n');
      
      analogDimmer = parseInt(analogDimmer);
      console.log(analogDimmer);
      noStroke();
      fill(130,130,130);
      rect(200,195, 40, 50);
      stroke(bulbStroke);
      fill(255,255,0, analogDimmer);
      circle(200,125,100);
      canvas.mouseClicked(nightModeToggle)
    }
    if(frameCount % 300 == 0)
    {
      port.clear();
    }
}

function connect() // On personal machine make the library available
{
  if (!port.opened()) {
    port.open('Arduino', 4800);
  } else {
    port.close();
  }
}

function nightModeToggle()
{
  nightMode = !nightMode;
}