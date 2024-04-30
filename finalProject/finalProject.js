let playerCharacter;
let playerImage;
let levelImage;
let blankWall;
let leftWallMiddle, leftWallTop, leftWallBottom;
let rightWallMiddle, rightWallTop, rightWallBottom;
let ladder;
let floorMiddle, ceilingMiddle;
let columnMiddle, columnTop, columnBotton;
let ground,ceiling;

let collectibleKeys1, collectibleKeys2, collectibleKeys3;

function preload()
{
    
    playerImage = loadImage("assets/sprites/playerCharacter.png");
    levelImage = loadImage("assets/tilesets/indoorTileset.png");
    keyImage = loadImage("assets/sprites/keyArt.png");
    
}

function setup()
{
    new Canvas(800/3, 800/3, 'pixelated x3'); 
    allSprites.pixelPerfect = true;
    background(36,34,52);
    allSprites.rotationLock = true;
    createMap();
    
    new Tiles(
        
        [
            "4...............5",
            "4...............5",
            "4...............5",
            "4...............5",
            "4111111116......5",
            "4........6......5",
            "4........6......5",
            "4....61111......5",
            "4....6..........5",
            "4....6...11161115",
            "4....6......6...5",
            "4....6......6...5",
            "411611......6...5",
            "4..6........6...5",
            "4..6........6...5",
            "4..6........6...5",
            "21111111111111113"
        ],
        9,9, // x, y
        15.5,15.5 // w,h
    )
    createKeys();
    
    collectibleKeys1.changeAni('red');
    collectibleKeys2.changeAni('green');
    collectibleKeys3.changeAni('blue');
    createCharacter();
    
}

function draw()
{
    clear();
    background(36,34,52);
    noFill();
    
}

function createCharacter()
{
    playerCharacter = new Sprite(30,height-31,16,32);
    playerCharacter.spriteSheet = playerImage;
    playerCharacter.anis.offset.x = 2;
    playerCharacter.anis.frameDelay = 12;
    playerCharacter.collider = 'dynamic';
    playerCharacter.friction = 0;
    playerCharacter.bounciness = 0;
    playerCharacter.drag = 0;
    playerCharacter.rotationDrag = 0;
    playerCharacter.layer = 2;

    playerCharacter.addAnis({
        walkHorizontal: { row: 1, frames: 4},
        walkUp: {row: 2, frames: 4},
        walkDown:{row: 0, column: 1, frames: 4},
        stand: { row: 0, frames: 1},
    })
    playerCharacter.changeAni('stand');
}

function createKeys()
{
    collectibleKeys1 =  new Sprite(100,50,32,32);
    collectibleKeys2 =  new Sprite(200,100,32,32);
    collectibleKeys3 =  new Sprite(35,175,32,32);
    
    collectibleKeys1.spriteSheet = keyImage;
    collectibleKeys2.spriteSheet = keyImage;
    collectibleKeys3.spriteSheet = keyImage;
    collectibleKeys1.addAnis({
        red: {row: 0, frames: 1},
        green: {row: 1, frames: 1},
        blue: {row: 2, frames: 1}
    });
    collectibleKeys2.addAnis({
        red: {row: 0, frames: 1},
        green: {row: 1, frames: 1},
        blue: {row: 2, frames: 1}
    });
    collectibleKeys3.addAnis({
        red: {row: 0, frames: 1},
        green: {row: 1, frames: 1},
        blue: {row: 2, frames: 1}
    });

    collectibleKeys1.collider = 'none';
    collectibleKeys2.collider = 'none';
    collectibleKeys3.collider = 'none';

    collectibleKeys1.layer = 1;
    collectibleKeys2.layer = 1;
    collectibleKeys3.layer = 1;
}
function keyPressed()
{
    if(key == 'd')
    {
        playerCharacter.changeAni('walkHorizontal');
        playerCharacter.move(width,'right',1);
            
    }
    if(key == 'a')
    {
        playerCharacter.changeAni('walkHorizontal');
        playerCharacter.mirror.x = true;
        playerCharacter.move(width,'left',1);
    }
    if(key == 's')
    {
        playerCharacter.changeAni('walkUp');
        playerCharacter.move(height,'down',1);
    }
    if(key == 'w')
    {
        playerCharacter.changeAni('walkUp');
        playerCharacter.move(height,'up',1);
        world.gravity.y = 0;
    }
    if(key == ' ')
    {
        world.gravity.y = -4;
    }
}

function keyReleased()
{
    playerCharacter.changeAni('stand');
    playerCharacter.mirror.x = false;
    playerCharacter.vel.x = 0;
    playerCharacter.vel.y = 0;
    world.gravity.y = 2;
}

function createMap()
{
    blankWall = new Group();
    blankWall.collider = 'none';
    blankWall.spriteSheet = levelImage;
    blankWall.addAni({w:16.,h:16.8,row:2,col:2});
    blankWall.tile = '0';
    blankWall.layer = 1;

    floorMiddle = new Group();
    floorMiddle.collider = 'none';
    floorMiddle.spriteSheet = levelImage;
    floorMiddle.addAni({w:16.2, h:16.5, row:1, col:2});
    floorMiddle.tile = '1';
    floorMiddle.layer = 1;
    floorMiddle = 2

    leftWallBottom = new Group();
    leftWallBottom.collider = 'none';
    leftWallBottom.spriteSheet = levelImage;
    leftWallBottom.addAni({w:16.1,h:17, row: 6, col:1});
    leftWallBottom.tile = '2';
    leftWallBottom.layer = 1;

    rightWallBottom = new Group();
    rightWallBottom.collider = 'none';
    rightWallBottom.spriteSheet = levelImage;
    rightWallBottom.addAni({w:16.1,h:17, row: 6, col:2});
    rightWallBottom.tile = '3';
    rightWallBottom.layer = 1;

    leftWallMiddle = new Group();
    leftWallMiddle.collider = 'none';
    leftWallMiddle.spriteSheet = levelImage;
    leftWallMiddle.addAni({w:16.6,h:16.9,row:2,col:3});
    leftWallMiddle.tile = '4';
    leftWallMiddle.layer = 1;

    rightWallMiddle = new Group();
    rightWallMiddle.collider = 'none';
    rightWallMiddle.spriteSheet = levelImage;
    rightWallMiddle.addAni({w:16.6,h:16.9,row:2,col:1});
    rightWallMiddle.tile = '5';
    rightWallMiddle.layer = 1;

    ladder = new Group();
    ladder.collider = 'none';
    ladder.spriteSheet = levelImage;
    ladder.addAni({w:16.8235,h:16.9,row:4,col:8});
    ladder.tile = '6';
    ladder.layer = 1;

    createBoundaries();
}

function createBoundaries()
{
    ceiling = new Sprite(0,0,width*3,0,'static');
    ceiling.layer = 0;
    ceiling.color = '0,0,0,0';
    ceiling.friction = 0;
    ceiling.bounciness = 0;
    ceiling.drag = 0;
    ceiling.rotationDrag = 0;

    ground = new Sprite(0,height-14,width*3,0,'static');
    ground.layer = 0;
    ground.color = '0,0,0,0';
    ground.friction = 0;
    ground.bounciness = 0;
    ground.drag = 0;
    ground.rotationDrag = 0;

    leftWall = new Sprite(15,0,0,height*3, 'static');
    leftWall.layer = 0;
    leftWall.color = '0,0,0,0';
    leftWall.friction = 0;
    leftWall.bounciness = 0;
    leftWall.drag = 0;
    leftWall.rotationDrag = 0;

    rightWall = new Sprite(width-16,0,0,height*3, 'static');
    rightWall.layer = 0;
    rightWall.color = '0,0,0,0';
    rightWall.friction = 0;
    rightWall.bounciness = 0;
    rightWall.drag = 0;
    rightWall.rotationDrag = 0;

    platform1 = new Sprite(30,195,28,9,'static');
    platform1.layer = 0;
    platform1.color = '0,0,0,0';
    platform1.friction = 0;
    platform1.bounciness = 0;
    platform1.drag = 0;
    platform1.rotationDrag = 0;

    platform2 = new Sprite(79,195,23,9,'static');
    platform2.layer = 0;
    platform2.color = '0,0,0,0';
    platform2.friction = 0;
    platform2.bounciness = 0;
    platform2.drag = 0;
    platform2.rotationDrag = 0;

    platform3 = new Sprite(164,148,40,9,'static');
    platform3.layer = 0;
    platform3.color = '0,0,0,0';
    platform3.friction = 0;
    platform3.bounciness = 0;
    platform3.drag = 0;
    platform3.rotationDrag = 0;

    platform4 = new Sprite(227,148,40,9,'static');
    platform4.layer = 0;
    platform4.color = '0,0,0,0';
    platform4.friction = 0;
    platform4.bounciness = 0;
    platform4.drag = 0;
    platform4.rotationDrag = 0;

    platform5 = new Sprite(76,71,120,9,'static');
    platform5.layer = 0;
    platform5.color = '0,0,0,0';
    platform5.friction = 0;
    platform5.bounciness = 0;
    platform5.drag = 0;
    platform5.rotationDrag = 0;

    platform5 = new Sprite(125,117,55,9,'static');
    platform5.layer = 0;
    platform5.color = '0,0,0,0';
    platform5.friction = 0;
    platform5.bounciness = 0;
    platform5.drag = 0;
    platform5.rotationDrag = 0;
}