let playerCharacter;
let playerImage, levelImage, keyImage, gameFont;
let levelGraphic, headsUpDisplayGraphic;
let isPlaying;
let timeElapsed, recordedTime;
let keys, emptyKey1, emptyKey2, emptyKey3, redKey, blueKey, greenKey;
let redKeyCollected, greenKeyCollected, blueKeyCollected;
let gameCount;

function preload()
{
    
    playerImage = loadImage("assets/sprites/playerCharacter.png");
    levelImage = loadImage("assets/tilesets/indoorTileset.png");
    keyImage = loadImage("assets/sprites/keyArt.png");
    gameFont = loadFont("assets/fonts/PressStart2P-Regular.ttf");
    
}

function setup()
{
    createCanvas(400,600);
    imageMode(CENTER);
    textAlign(CENTER);
    textFont(gameFont);
    headsUpDisplayGraphic = createGraphics(400,100);
    levelGraphic = createGraphics(600,500); 
    
    isPlaying = false;
    redKeyCollected, greenKeyCollected, blueKeyCollected = false;
    createCharacter();
    createKeys();
    allSprites.rotationLock = true;
    gameCount = 0;
}

function draw()
{
    clear();
    emptyKey1.x = 220;
    emptyKey1.y = 50;
    emptyKey2.x = 220;
    emptyKey2.y = 80;
    emptyKey3.x = 250
    emptyKey3.y = 65;

    if(isPlaying)
    {
        redKey.visible = true;
        greenKey.visible = true;
        blueKey.visible = true;
        game();

    }
    else if(gameCount == 0)
    {
        menu();
        redKey.x = 220;
        redKey.y = 185;
        greenKey.x = 160;
        greenKey.y = 400;
        blueKey.x = 100;
        blueKey.y = 350;
        redKey.visible = false;
        greenKey.visible = false;
        blueKey.visible = false;
        playerCharacter.visible = false;
        redKeyCollected = false;
        blueKeyCollected = false;
        greenKeyCollected = false;
        //recordedTime = 0;
        timeElapsed = 0;
        gameCount = 0;
        
    }
    else
    {
        menu();
        playerCharacter.x = 30;
        playerCharacter.y = 475;
        redKey.x = random(15,385);
        redKey.y = random(120, 550);
        greenKey.x = random(15,385);
        greenKey.y = random(120, 550);
        blueKey.x = random(15,385);
        blueKey.y = random(120, 550);
        redKey.visible = false;
        greenKey.visible = false;
        blueKey.visible = false;
        playerCharacter.visible = false;
        redKeyCollected = false;
        blueKeyCollected = false;
        greenKeyCollected = false;
        timeElapsed = 0;
    }
    
}
function game()
{

    timeElapsed += deltaTime/1000;
    playerCharacter.visible = true;
    playerCharacter.overlap(redKey);
    playerCharacter.overlap(greenKey);
    playerCharacter.overlap(blueKey);
    
    if(!redKeyCollected)
    {
        emptyKey1.visible = true;
    }
    else
    {
        emptyKey1.visible = false;
        redKey.x = emptyKey1.x;
        redKey.y = emptyKey1.y;
    }
    if(!greenKeyCollected)
    {
        emptyKey2.visible = true;
    }
    else
    {
        emptyKey2.visible = false;
        greenKey.x = emptyKey2.x;
        greenKey.y = emptyKey2.y;
    }
    if(!blueKeyCollected)
    {
        emptyKey3.visible = true;
    }
    else
    {
        emptyKey3.visible = false;
        blueKey.x = emptyKey3.x;
        blueKey.y = emptyKey3.y;
    }
    if(redKeyCollected && greenKeyCollected && blueKeyCollected)
    {
        gameCount += 1;
        isPlaying = false;
        if(gameCount > 0)
        {
            recordedTime = timeElapsed
        }
    }
    playerCharacter.debug = true; // hitbox
    
    level();
    headsUpDisplay(timeElapsed);
    
    image(headsUpDisplayGraphic,200,50);
    image(levelGraphic,200,350);
    
}
function menu()
{
    emptyKey1.visible = false;
    emptyKey2.visible = false;
    emptyKey3.visible = false;
    if(gameCount == 0)
    {
        push();
        background(100,100,100);
        textSize(18);
        text("Time is Key!", width/2,(height/2)-200);
        textSize(12);
        text("Find All 3 Keys,", width/2,(height/2)-100);
        text("Bring to Door to Escape!", width/2,(height/2)-50);
        text("Controls: Joystick - Movement,", width/2,(height/2)+50);
        text("Button - Interact", width/2,(height/2)+100);
        textStyle("bold");
        textSize(16);
        text("Press Button to Play!", width/2,(height/2)+200);
    pop();
    gameCount++;
    }
    else
    {
        push();
        background(100,100,100);
        textSize(18);
        text("Time is Key!", width/2,(height/2)-200);
        textSize(12);
        text("You Found All 3 Keys!", width/2,(height/2)-100);
        text("Your Time Was: " + ceil(recordedTime) + " Seconds!", width/2,(height/2)-50);
        text("Controls: Joystick - Movement,", width/2,(height/2)+50);
        text("Button - Interact", width/2,(height/2)+100);
        textStyle("bold");
        textSize(14);
        text("Press Button to Play Again!", width/2,(height/2)+200);
    pop();
    }
}
function headsUpDisplay(timeElapsed)
{
    push();
        headsUpDisplayGraphic.background(100,100,100);
        headsUpDisplayGraphic.fill(0,0,0);
        headsUpDisplayGraphic.textFont(gameFont);
        headsUpDisplayGraphic.textStyle('bold');
        headsUpDisplayGraphic.textSize(14);
        headsUpDisplayGraphic.text("Time is Key!", 100,30);
        headsUpDisplayGraphic.textSize(12);
        headsUpDisplayGraphic.text("Keys Collected: ", 10,70);
        headsUpDisplayGraphic.text("Time: " + ceil(timeElapsed), 290,70);
        //console.log(ceil(timeElapsed));
    pop();
}

function level()
{
    levelGraphic.background(36,34,52);
    //camera.x = playerCharacter.x;
    //camera.y = playerCharacter.y;
    emptyKey1.x = 220;
    emptyKey1.y = 50;
    emptyKey2.x = 220;
    emptyKey2.y = 80;
    emptyKey3.x = 250
    emptyKey3.y = 65;
}

function createCharacter()
{
    playerCharacter = new Sprite(30,475,16,32,'d');
    playerCharacter.spriteSheet = playerImage;
    playerCharacter.anis.frameDelay = 12;
    playerCharacter.layer = 5;

    playerCharacter.addAnis({
        walkHorizontal: { row: 1, frames: 4},
        walkUp: {row: 2, frames: 4},
        walkDown:{row: 0, column: 1, frames: 4},
        stand: { row: 0, frames: 1},
    })
    playerCharacter.changeAni('stand');

    playerCharacter.layer = 0;
    playerCharacter.scale = 1.5;
    
    characterExists = true;
}

function keyPressed()
{
    // Controls
    if(key == 'd' || keyCode == RIGHT_ARROW)
    {
        playerCharacter.move(width,'right',2);
        playerCharacter.changeAni('walkHorizontal');
        playerCharacter.mirror.x = false;
    }
    if(key == 'a' || keyCode == LEFT_ARROW)
    {
        playerCharacter.move(width,'left',2)
        playerCharacter.changeAni('walkHorizontal');
        playerCharacter.mirror.x = true;
    }
    if(key == 'w' || keyCode == UP_ARROW)
    {
        playerCharacter.move(height,'up',2)
        playerCharacter.changeAni('walkUp');
        playerCharacter.mirror.x = true;
    }
    if(key == 's' || keyCode == DOWN_ARROW)
    {
        playerCharacter.move(height,'down',2)
        playerCharacter.changeAni('walkDown');
    }
    
   if(key == ' ')
   {
        //isPlaying = !isPlaying; // used to test Game State Changes
       if(!isPlaying)
        {
            isPlaying = !isPlaying;
        }
        else
        {
            if(playerCharacter.overlapping(redKey))
            {
                redKeyCollected = true;
            }
            if(playerCharacter.overlapping(greenKey))
            {
                greenKeyCollected = true;
            }
            if(playerCharacter.overlapping(blueKey))
            {
                blueKeyCollected = true;
            }
        }  
   }
}

function keyReleased()
{
    
    playerCharacter.changeAni('stand');
    playerCharacter.mirror.x = false;
    playerCharacter.vel.x = 0;
    playerCharacter.vel.y = 0;

}

function createKeys()
{
    //empty keys
    emptyKey1 = new Sprite(220,50,16,16,'d');
    emptyKey2 = new Sprite(220,80,16,16,'d');
    emptyKey3 = new Sprite(250,65,16,16,'d');

    emptyKey1.spriteSheet = keyImage;
    emptyKey1.addAnis({
        empty: {row: 3, frames: 1}
    })
    emptyKey1.changeAni('empty');
    emptyKey1.layer = 1;
    emptyKey1.scale = 2;

    emptyKey2.spriteSheet = keyImage;
    emptyKey2.addAnis({
        empty: {row: 3, frames: 1}
    })
    emptyKey2.changeAni('empty');
    emptyKey2.layer = 1;
    emptyKey2.scale = 2;

    emptyKey3.spriteSheet = keyImage;
    emptyKey3.addAnis({
        empty: {row: 3, frames: 1}
    })
    emptyKey3.changeAni('empty');
    emptyKey3.layer = 1;
    emptyKey3.scale = 2;
    
    //collectible keys
    redKey = new Sprite(220,185,16,16,'d');
    greenKey = new Sprite(160,400,16,16,'d');
    blueKey = new Sprite(100,350,16,16,'d');

    redKey.spriteSheet = keyImage;
    redKey.addAnis({
        red: {row: 0, frames: 1}
    })
    redKey.changeAni('red');
    redKey.layer = 1;
    redKey.scale = 2;

    greenKey.spriteSheet = keyImage;
    greenKey.addAnis({
        green: {row: 1, frames: 1}
    })
    greenKey.changeAni('green');
    greenKey.layer = 1;
    greenKey.scale = 2;

    blueKey.spriteSheet = keyImage;
    blueKey.addAnis({
        blue: {row: 2, frames: 1}
    })
    blueKey.changeAni('blue');
    blueKey.layer = 1;
    blueKey.scale = 2;
}



