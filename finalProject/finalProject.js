//ARDUINO CONNECTIVITY
let port;
let connected = false;
let joyX = 0, sw = 0;
let connectButton;
let previousSW = 0;
let controlSpeed = 1;
let message;
let str;
let values;

//MECHANICS/LOGIC/INTERACTIONS
let playerCharacter;
let isPlaying, isClimbing, winState;
let timeElapsed, recordedTime;
let keys, emptyKey1, emptyKey2, emptyKey3, redKey, blueKey, greenKey; 
let ladder = [];
let redKeyCollected, greenKeyCollected, blueKeyCollected;
let gameCount;

//GRAPHICS
let playerImage, levelImage, keyImage, ladderImage, doorImage, gameFont;
let levelGraphic, headsUpDisplayGraphic;

//MAP BOUNDARIES
let blocks, leftWall, rightWall, ceiling, column1, column2, column3;
let platform1;

let levels = [
    {
        "level": 1, "layout": 
        [
            "0ccccccccccccccccccccccc0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0lbbbbbbbbbbbbbbbbbbbbbr0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0lbbbbbbbbbbbbbbbbbbbbbr0",
            "0l..............1......r0",
            "0l..............1......r0",
            "0l..............1......r0",
            "0l..............1......r0",
            "0l..............1......r0",
            "0lbbbbbbbbbbbbbbb......r0",
            "0l........1............r0",
            "0l........1............r0",
            "0l........1............r0",
            "0l........1............r0",
            "0l........1............r0",
            "0l........bbbbbbbbbbbbbr0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0l.....................r0",
            "0bbbbbbbbbbbbbbbbbbbbbbb0"
        ]
    },
    {
        "level": 2, "layout":
        []
    }];
let level1;

//SOUNDS
let ladderSound, doorSound;

//MUSIC
var volume = new Tone.Volume(-10).toDestination();
var musicVolume = new Tone.Volume(-20).toDestination();
var synth;
let base, baseLoop;
let tenor, tenorLoop;
//Samples to mix into music (MP3s of less than 3 seconds)
var sampler1 = new Tone.Players({
    kick : "assets/sounds/kick.mp3",
    snare : "assets/sounds/snare.mp3",
    hihat : "assets/sounds/hh.mp3",
}, function()
{
    //console.log('loaded')
});
sampler1.connect(musicVolume);

function preload()
{
    playerImage = loadImage("assets/sprites/playerCharacter.png");
    levelImage = loadImage("assets/tilesets/indoorTilesetTEST.png");
    keyImage = loadImage("assets/sprites/keyArt.png");
    ladderImage = loadImage("assets/sprites/ladder.png");
    doorImage = loadImage("assets/sprites/door.png");
    gameFont = loadFont("assets/fonts/PressStart2P-Regular.ttf");
    ladderSound = new Tone.Player("assets/sounds/ladderSound.mp3");
    ladderSound.connect(volume);
    doorSound = new Tone.Player("assets/sounds/doorLock.mp3");
    doorSound.connect(volume);
}

function setup()
{
    createCanvas(400,600);
    imageMode(CENTER);
    textAlign(CENTER);
    rectMode(CENTER);
    textFont(gameFont);
    headsUpDisplayGraphic = createGraphics(400,100);
    levelGraphic = createGraphics(600,500); 

    //CREATING GAME ENVIRONMENT & INTERACTABLES
    //blank spaces
    blank = new Group();
    blank.spriteSheet = levelImage;
    blank.addAni({w:16, h:16, row:2, col: 2});
    blank.tile = '0';
    blank.collider = 'n';
    blank.layer = 0;
    blank.w = 16;
    blank.h = 16;

    //bottoms - floors
    blocks = new Group();
    blocks.spriteSheet = levelImage;
    blocks.addAni({w:16, h:16, row:1, col: 2});
    blocks.tile = 'b';
    blocks.collider = 'n';
    blocks.layer = 0;
    blocks.w = 16;
    blocks.h = 10;

    //left wall
    leftWall = new Group();
    leftWall.spriteSheet = levelImage;
    leftWall.addAni({w:16, h:16, row:2, col: 3});
    leftWall.tile = 'l';
    leftWall.collider = 's';
    leftWall.layer = 0;
    leftWall.w = 16;
    leftWall.h = 16;

    //right Wall
    rightWall = new Group();
    rightWall.spriteSheet = levelImage;
    rightWall.addAni({w:16, h:16, row:2, col: 1});
    rightWall.tile = 'r';
    rightWall.collider = 's';
    rightWall.layer = 0;
    rightWall.w = 16;
    rightWall.h = 16;

    ceiling = new Group();
    ceiling.spriteSheet = levelImage;
    ceiling.addAni({w:16, h:16, row: 3, col: 2});
    ceiling.tile = 'c';
    ceiling.collider = 's';
    ceiling.layer = 0;
    ceiling.w = 16;
    ceiling.h = 8;

    //bottoms - floors
    column1 = new Group();
    column1.spriteSheet = levelImage;
    column1.addAni({w:16, h:16, row:2, col: 4});
    column1.tile = '1';
    column1.collider = 'n';
    column1.layer = 0;
    column1.w = 16;
    column1.h = 16;

    level1 = new Tiles(levels[0].layout, 8, 108, 16, 16);
    level1.collider = 'n';
    level1.visible = false;
    
    isPlaying = false;
    redKeyCollected, greenKeyCollected, blueKeyCollected = false;
    createInteractables();
    createCharacter();
    allSprites.rotationLock = true;
    gameCount = 0;
    world.gravity.y = 0;
    world.gravity.x = 0;

    //Sound Implementation
    base = new Tone.FMSynth();
    baseLoop = new Tone.Loop(playBase, "4n");
    tenor = new Tone.FMSynth();
    tenorLoop = new Tone.Loop(playTenor, "8n");
    base.connect(musicVolume);
    tenor.connect(musicVolume);
    Tone.Transport.bpm.value = 100;

    //ARDUINO CONNECTIVITY
    port = createSerial();
    connectButton = createButton("Connect");
    connectButton.mousePressed(connect);
    connectButton.position(20,20);
    connectButton.hide();
    message = '0\n';
    port.write(message);
}

function draw()
{   
    clear();
    //console.log(frameCount);
    if(frameCount % 60 == 0)
    {
        port.clear();
    }
    str = port.readUntil("\n");
    values = str.split(",");
    sw = Number(values[1]);
    if(sw == NaN)
    {
        sw = 0;
    }

    if(!connected)
    {
        connectButton.show();
    }
    else
    {
        connectButton.hide();
    }

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
        level1.visible = true;
        ladder[0].visible = true;
        ladder[1].visible = true;
        ladder[2].visible = true;
        ladder[3].visible = true;
        door.visible = true;
        game(values);

    }
    else if(gameCount == 0)
    {
        menu();
        redKey.visible = false;
        greenKey.visible = false;
        blueKey.visible = false;
        playerCharacter.visible = false;
        redKeyCollected = false;
        blueKeyCollected = false;
        greenKeyCollected = false;
        winState = false;
        level1.visible = false;
        ladder[0].visible = false;
        ladder[1].visible = false;
        ladder[2].visible = false;
        ladder[3].visible = false;
        door.visible = false;
        timeElapsed = 0;
        gameCount = 0;
        Tone.Transport.bpm.value = 100;
        //console.log(sw);
        if(previousSW - sw != 0 && sw == 1)
        {
            buttonPressed();   
        }
        
    }
    else
    {
        redKey.visible = false;
        greenKey.visible = false;
        blueKey.visible = false;
        playerCharacter.visible = false;
        redKeyCollected = false;
        blueKeyCollected = false;
        greenKeyCollected = false;
        winState = false;
        level1.visible = false;
        ladder[0].visible = false;
        ladder[1].visible = false;
        ladder[2].visible = false;
        ladder[3].visible = false;
        door.visible = false;
        Tone.Transport.bpm.value = 100;
        menu();
        playerCharacter.x = 200;
        playerCharacter.y = 570;
        
        redKey.y = random([190,270]); // adjust with collider tiles (map)
        if(redKey.y == 270)
        {
            redKey.x = random([250, 320]); // adjust with collider tiles (map)
        }
        else
        {
            redKey.x = random([50, 110, 320]); // adjust with collider tiles (map)
        }
        greenKey.x = random(280,320); // adjust with collider tiles (map)
        greenKey.y = random([465,570]); // adjust with collider tiles (map)
        blueKey.x = random(80, 170); // adjust with collider tiles (map)
        blueKey.y = random([270,375]); // adjust with collider tiles (map)
        
        timeElapsed = 0;
        if(previousSW - sw != 0 && sw == 1)
        {
            buttonPressed();   
        }
    }
    previousSW = sw;
}

//GAME LOGIC
function game(values)
{
    //console.log(joyX);
    joyX = values[0];
    sw = Number(values[1]);
    if(sw == NaN)
    {
        sw = 0;
    }

    if(!playerCharacter.isMoving)
    {
        isClimbing = false;
        playerCharacter.changeAni('stand');
    }
    if(playerCharacter.x < 44)
    {
        playerCharacter.x = 44;
    }
    if(playerCharacter.x > 355)
    {
        playerCharacter.x = 355;
    }
    if(playerCharacter.y < 130)
    {
        playerCharacter.y = 130;
    }
    if(playerCharacter.y > 570)
    {
        playerCharacter.y = 570;
    }
    if(playerCharacter.y == 474 && playerCharacter.x < 190)
    {
        playerCharacter.x = 190
    }
    if(playerCharacter.y == 378 && playerCharacter.x > 245)
    {
        playerCharacter.x = 245
    }

    if(joyX > 0 && !isClimbing)
    {
        playerCharacter.x += (controlSpeed + abs(joyX)*0.002)
        playerCharacter.changeAni('walkHorizontal');
        playerCharacter.mirror.x = false;
    }
    else if(joyX < 0 && !isClimbing)
    {
        playerCharacter.x -= (controlSpeed + abs(joyX)*0.002);
        playerCharacter.changeAni('walkHorizontal');
        playerCharacter.mirror.x = true;   
    }
    else if(joyX == 0 && !isClimbing)
    {
        playerCharacter.changeAni('stand');
        playerCharacter.mirror.x = false;
    }
    //console.log("Player Character X: " + playerCharacter.x);
    //console.log("Player Character Y: " + playerCharacter.y);
    //console.log(sw);
    if(previousSW - sw != 0 && sw == 1)
    {
        buttonPressed();   
    }
    levelGraphic.background(36,34,52);
    timeElapsed += deltaTime/1000;
    playerCharacter.visible = true;
    
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
    if(winState)
    {
        gameCount += 1;
        isPlaying = false;
        playerCharacter.collider = 's';
        if(gameCount > 0)
        {
            recordedTime = timeElapsed
        }
    }
    
    headsUpDisplay(timeElapsed);
    image(headsUpDisplayGraphic,200,50);
    image(levelGraphic,200,350);
    previousSW = sw;
    if(previousSW == NaN)
    {
        previousSW = 1;
    };
}

//GRAPHICAL ELEMENTS
function menu()
{
    emptyKey1.visible = false;
    emptyKey2.visible = false;
    emptyKey3.visible = false;
    redKey.visible = false;
    greenKey.visible = false;
    blueKey.visible = false;
    playerCharacter.visible = false;
    redKeyCollected = false;
    blueKeyCollected = false;
    greenKeyCollected = false;
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

//INITIALIZATION FUNCTIONS
function createCharacter()
{
    playerCharacter = new Sprite(200,570,16,32,'s');
    playerCharacter.spriteSheet = playerImage;
    playerCharacter.anis.frameDelay = 12;
    playerCharacter.anis.offset.y = 5;
    //playerCharacter.debug = true; // hitbox
    playerCharacter.layer = 5;

    playerCharacter.addAnis({
        walkHorizontal: { row: 1, frames: 4},
        walkUp: {row: 2, frames: 4},
        walkDown:{row: 0, column: 1, frames: 4},
        stand: { row: 0, frames: 1},
    })
    playerCharacter.changeAni('stand');

    playerCharacter.scale = 1.5;

    playerCharacter.overlap(redKey);
    playerCharacter.overlap(greenKey);
    playerCharacter.overlap(blueKey);
    for( i = 0; i < ladder.length; i++)
    {
        playerCharacter.overlap(ladder[i]); 
    }
    playerCharacter.overlap(door);
    
    characterExists = true;
}

function createInteractables()
{
    //empty keys
    emptyKey1 = new Sprite(220,50,16,16,'s');
    emptyKey2 = new Sprite(220,80,16,16,'s');
    emptyKey3 = new Sprite(250,65,16,16,'s');

    emptyKey1.spriteSheet = keyImage;
    emptyKey1.addAnis({
        empty: {row: 3, frames: 1}
    })
    emptyKey1.changeAni('empty');
    emptyKey1.layer = 2;
    emptyKey1.scale = 2;

    emptyKey2.spriteSheet = keyImage;
    emptyKey2.addAnis({
        empty: {row: 3, frames: 1}
    })
    emptyKey2.changeAni('empty');
    emptyKey2.layer = 2;
    emptyKey2.scale = 2;

    emptyKey3.spriteSheet = keyImage;
    emptyKey3.addAnis({
        empty: {row: 3, frames: 1}
    })
    emptyKey3.changeAni('empty');
    emptyKey3.layer = 2;
    emptyKey3.scale = 2;
    
    //collectible keys
    redKey = new Sprite(320,180,16,16,'s');
    greenKey = new Sprite(270,465,16,16,'s');
    blueKey = new Sprite(100,375,16,16,'s');

    redKey.spriteSheet = keyImage;
    redKey.addAnis({
        red: {row: 0, frames: 1}
    })
    redKey.changeAni('red');
    redKey.layer = 2;
    redKey.scale = 2;

    greenKey.spriteSheet = keyImage;
    greenKey.addAnis({
        green: {row: 1, frames: 1}
    })
    greenKey.changeAni('green');
    greenKey.layer = 2;
    greenKey.scale = 2;

    blueKey.spriteSheet = keyImage;
    blueKey.addAnis({
        blue: {row: 2, frames: 1}
    })
    blueKey.changeAni('blue');
    blueKey.layer = 2;
    blueKey.scale = 2;

    ladder[0] = new Sprite(350,548,32,100,'s')
    ladder[0].image = ladderImage;
    ladder[0].layer = 0;
    ladder[0].visible = false;
    //ladder[0].debug = true;

    ladder[1] = new Sprite(200,548-(96),32,100,'s')
    ladder[1].image = ladderImage;
    ladder[1].layer = 0;
    ladder[1].visible = false;
    //ladder[1].debug = true;

    ladder[2] = new Sprite(48,548-(96*2),32,100,'s')
    ladder[2].image = ladderImage;
    ladder[2].layer = 0;
    ladder[2].visible = false;
    //ladder[2].debug = true;

    ladder[3] = new Sprite(200,548-(96*3),32,100,'s')
    ladder[3].image = ladderImage;
    ladder[3].layer = 0;
    ladder[3].visible = false;
    //ladder[3].debug = true;

    door = new Sprite(95, 552, 64, 87, 's');
    door.image = doorImage;
    door.layer = 0;
    door.visible = false;
    //door.debug = true;
    
}

//MUSIC FUNCTIONS
function playBase()
{
    base.triggerAttackRelease('D2', '6n');
    sampler1.player('kick').start();
} 

function playTenor()
{
    tenor.triggerAttackRelease('A3', '16n');
    if(floor(timeElapsed) % 2 == 0)
    {
        sampler1.player('snare').start();
    }  
}


function buttonPressed() // Will be edited once arduine input is implemented
{
    // Controls

    /*
    if((key == 'd' || keyCode == RIGHT_ARROW) && !isClimbing)
    {
        playerCharacter.move(width,'right',2);
        playerCharacter.changeAni('walkHorizontal');
        playerCharacter.mirror.x = false;
        previousKey = key;
    }
    if((key == 'a' || keyCode == LEFT_ARROW) && !isClimbing)
    {
        playerCharacter.move(width,'left',2)
        playerCharacter.changeAni('walkHorizontal');
        playerCharacter.mirror.x = true;
        previousKey = key;
    }*/
    
   
    //isPlaying = !isPlaying; // used to test Game State Changes
    if(!isPlaying)
    {
        isPlaying = !isPlaying;
        playerCharacter.collider = 'd';
        if(Tone.Transport.state === 'stopped')
        {
            Tone.Transport.start();
            baseLoop.start();
            tenorLoop.start();
        }
    }
    else
    {
        if(playerCharacter.overlapping(redKey))
        {
            Tone.Transport.bpm.value += 10;
            redKeyCollected = true;
            message = `1\n`;
            port.write(message);
        }
        if(playerCharacter.overlapping(greenKey))
        {
            Tone.Transport.bpm.value += 10;
            greenKeyCollected = true;
            message = `2\n`;
            port.write(message);
        }
        if(playerCharacter.overlapping(blueKey))
        {
            Tone.Transport.bpm.value += 10;
            blueKeyCollected = true;
            message = `3\n`;
            port.write(message);
        }

        if(playerCharacter.overlapping(ladder[0]) && !isClimbing)
        {
            if(playerCharacter.y - ladder[0].y < 0)
            {
                playerCharacter.move(96,'down',1.5)
            }
            else
            {
                playerCharacter.move(96,'up',1.5)
            }
            ladderSound.start();
            isClimbing = true;
            playerCharacter.changeAni('walkUp');
            playerCharacter.mirror.x = true;
        }
        if(playerCharacter.overlapping(ladder[1]) && !isClimbing)
        {
            if(playerCharacter.y - ladder[1].y < 0)
            {
                playerCharacter.move(96,'down',1.5)
            }
            else
            {
                playerCharacter.move(96,'up',1.5)
            }
            ladderSound.start();
            isClimbing = true;
            playerCharacter.changeAni('walkUp');
            playerCharacter.mirror.x = true;
        }
        if(playerCharacter.overlapping(ladder[2]) && !isClimbing)
        {
            if(playerCharacter.y - ladder[2].y < 0)
            {
                playerCharacter.move(96,'down',1.5)
            }
            else
            {
                playerCharacter.move(96,'up',1.5)
            }
            ladderSound.start();
            isClimbing = true;
            playerCharacter.changeAni('walkUp');
            playerCharacter.mirror.x = true;
        }
        if(playerCharacter.overlapping(ladder[3]) && !isClimbing)
        {
            if(playerCharacter.y - ladder[3].y < 0)
            {
                playerCharacter.move(96,'down',1.5)
            }
            else
            {
                playerCharacter.move(96,'up',1.5)
            }
            ladderSound.start();
            isClimbing = true;
            playerCharacter.changeAni('walkUp');
            playerCharacter.mirror.x = true;
        }
        if(playerCharacter.overlapping(door))
        {
            if(redKeyCollected && greenKeyCollected && blueKeyCollected)
            {
                winState = true;
                doorSound.start();
                if(Tone.Transport.state === 'started')
                {
                    Tone.Transport.stop();
                    baseLoop.stop();
                    tenorLoop.stop();   
                }
                message = '0\n';
                port.write(message);
            }   
        }
    }
   
}

/*function keyReleased() //This will need to change once arduino input is implemented
{
    playerCharacter.mirror.x = false;
    playerCharacter.vel.x = 0;
}*/

function connect() {
    if (!port.opened()) {
      port.open('Arduino', 38400);
      connected = true;
    } else {
      port.close();
      connected = false;
    }
  }
