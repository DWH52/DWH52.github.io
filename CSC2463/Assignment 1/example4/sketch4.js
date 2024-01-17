function setup() {
    createCanvas(300,300);
    background('blue');
    rectMode(CENTER);
    
  }
  
  function draw() {
    
    stroke('white');
    strokeWeight(3);
    fill('green');
    ellipse(150,150,150,150);

    push();
    fill('red');
    translate(185,-60);
    rotate(0.95);
    star(150, 150, 27, 75, 5);
  }
  
  function star(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
  

