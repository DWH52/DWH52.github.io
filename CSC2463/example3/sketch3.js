function setup(){
    createCanvas(300, 150);
    background('black');
    rectMode(CENTER);
}

function draw(){
    //EXAMPLE 3
    noStroke();
    fill('yellow');
    ellipse(75,75,100,100);
    fill('black');
    triangle(0,10,0,150,75,75);
    
    fill('red');
    rect(225,100,100,50);
    ellipse(225,75,100,100);

    fill('white');
    ellipse(200,75,30,30);
    ellipse(250,75,30,30);
    fill('blue');
    ellipse(200,75,15,15);
    ellipse(250,75,15,15);

}

