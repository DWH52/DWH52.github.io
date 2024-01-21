let pickedColor = 'white';

// Draw once on initial load.
function setup() 
{
  createCanvas(windowWidth, windowHeight);
  background('white');
  // sets the selected color, white by default.
  mouseClicked();
  // draws the line following mouse stroke with selected color.
  mouseDragged();
  
}

// Drawn constantly during runtime
function draw() 
{
  // Creates the color panel to pick from.
  colorPanel();
}

/*
  function made for scalability 
  (redundant for our example, but can be expanded in future)
*/
function colorPanel()
{
  stroke('black');
  strokeWeight(1);
  for(i = 1; i <= 10; i++)
  {
    let color = 'white';
    if(i == 1)
    {
      color = 'red';
      new ColorBox(i,color);
    }
    else if (i == 2)
    {
      color = 'orange';
      new ColorBox(i,color);
    }
    else if (i == 3)
    {
      color = 'yellow';
      new ColorBox(i,color);
    }
    else if (i == 4)
    {
      color = 'green';
      new ColorBox(i,color);
    }
    else if (i == 5)
    {
      color = 'cyan';
      new ColorBox(i,color);
    }
    else if (i == 6)
    {
      color = 'blue';
      new ColorBox(i,color);
    }
    else if (i == 7)
    {
      color = 'magenta';
      new ColorBox(i,color);
    }
    else if (i == 8)
    {
      color = 'brown';
      new ColorBox(i,color);
    }
    else if (i == 9)
    {
      color = 'white';
      new ColorBox(i,color);
    }
    else if (i == 10)
    {
      color = 'black';
      new ColorBox(i,color);
    }
    else 
    {
      console.log('This should never occur');
    }
  }
}

/* Class made to construct the color panel */
class ColorBox 
{
  constructor(position,color)
  {
    rectMode(CENTER);
    fill(color);

    rect(20,20*position,20,20);
  }
}

// checks to make sure it is within the color panel, then if so selects color from pixel.get
function mouseClicked()
{
  if((mouseX < 30 && mouseX > 10)&&(mouseY < 210 && mouseY > 10))
  {
    pickedColor = get(mouseX,mouseY)
  }
}

// checks to make sure it doesn't interfere with color panel.
function mouseDragged()
{
  if(mouseX > 30)
  {
    strokeWeight(5);
    stroke(pickedColor);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}