// variables created to enable sketching all images to the same page
var firstBuffer;
var secondBuffer;
var thirdBuffer;
var fourthBuffer;

function setup()
{
    //sets up entire page
    createCanvas(300, 900);

    //sets up each individual image canvas
    firstBuffer = createGraphics(300, 150);
    secondBuffer = createGraphics(300,300);
    thirdBuffer = createGraphics(300,150);
    fourthBuffer = createGraphics(300,300);
}

function draw()
{
    // Draws each image
    drawFirstBuffer();
    drawSecondBuffer();
    drawThirdBuffer();
    drawFourthBuffer();

    //Buffers between images
    image(firstBuffer,0,0);
    image(secondBuffer,50,175);
    image(thirdBuffer,0,400);
    image(fourthBuffer,0,550);
}

function drawFirstBuffer()
{
    //Example 1
    firstBuffer.background('rgb(0,255,0)');
    firstBuffer.rectMode(CENTER);
    firstBuffer.ellipse(75,75,100,100);
    firstBuffer.rect(225,75,100,100);
}

function drawSecondBuffer()
{
    //Example 2
    secondBuffer.noStroke();
    secondBuffer.blendMode(ADD);
    
    // Circles made with equal but less than %100 alpha values to create translucent blending
    secondBuffer.fill(255, 182, 193, 100);
    secondBuffer.ellipse(100,75,100,100);
    
    secondBuffer.fill(152, 251, 152, 100);
    secondBuffer.ellipse(125,125,100,100);
    
    secondBuffer.fill(123, 104, 238, 100);
    secondBuffer.ellipse(75,125,100,100);
}

function drawThirdBuffer()
{
    //Example 3
    
    //setup for third image
    thirdBuffer.background('black');
    thirdBuffer.rectMode(CENTER);
    thirdBuffer.noStroke();

    //pacman -- alternatively could use arc(), hindsight.
    thirdBuffer.fill('yellow');
    thirdBuffer.ellipse(75,75,100,100);
    thirdBuffer.fill('black');
    thirdBuffer.triangle(0,10,0,150,75,75);
    
    //ghost - body
    thirdBuffer.fill('red');
    thirdBuffer.rect(225,100,100,50);
    thirdBuffer.ellipse(225,75,100,100);

    //ghost - eyes
    thirdBuffer.fill('white');
    thirdBuffer.ellipse(200,75,30,30);
    thirdBuffer.ellipse(250,75,30,30);
    thirdBuffer.fill('blue');
    thirdBuffer.ellipse(200,75,15,15);
    thirdBuffer.ellipse(250,75,15,15);
}

function drawFourthBuffer()
{
    //Example 4
    // Setup image theme (background and stroke weight & color)
    fourthBuffer.background('blue');
    fourthBuffer.rectMode(CENTER);
    fourthBuffer.stroke('white');
    fourthBuffer.strokeWeight(3);
    
    //Creation of Green Circle
    fourthBuffer.fill('green');
    fourthBuffer.ellipse(150,150,150,150);

    fourthBuffer.push();
    fourthBuffer.fill('red');
    /* This would be where the star function would go...
     IF I HAD ONE*/
    fourthBuffer.beginShape();
    fourthBuffer.vertex(230,125)
    fourthBuffer.vertex(175,125)
    fourthBuffer.vertex(150,70)
    fourthBuffer.vertex(125,125)
    fourthBuffer.vertex(70,125)
    fourthBuffer.vertex(115,165)
    fourthBuffer.vertex(100,215)
    fourthBuffer.vertex(150,185)
    fourthBuffer.vertex(200,215)
    fourthBuffer.vertex(185,165)
    fourthBuffer.endShape(CLOSE);
}

    /*
        I TRIED MY HARDEST TO GET THIS FUNCTION TO WORK -- 
            Had to settle for hardcoding the star.

        function star(x, y, radius1, radius2, npoints) 
        {
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
    */
