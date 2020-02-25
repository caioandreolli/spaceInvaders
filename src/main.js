let rightPressed = false;
let leftPressed = false;
let shipShots = [];

// Control Aliens Movement
let aliensLevel1 = [];
let aliensLevel2 = [];
let aliensLevel3 = [];
let aliensLevel4 = [];
let vX = 3;
let vY = 0.5;

let stopGame = false;



// Canvas

const gameCanvas = new Canvas();
const imageBackground = new Image();
imageBackground.src = 'images/background.png';
gameCanvas.src = imageBackground;


// SpaceShip

const gameSpaceship = new Spaceship(gameCanvas.ctx, 428, 520, 44, 36);
const imageSpaceShip = new Image();
imageSpaceShip.src = 'images/spaceship.png';
gameSpaceship.src = imageSpaceShip;


// Aliens

const imageAliensLevel1 = new Image();
const imageAliensLevel1Flip = new Image();
imageAliensLevel1.src = 'images/alien1.png';
imageAliensLevel1Flip.src = 'images/alien1_flip.png';


// Aliens Formation

const formation1 = new AliensFormation(gameCanvas, aliensLevel1, 84, 8, 0, false);
const formation2 = new AliensFormation(gameCanvas, aliensLevel2, 84, 10, 90/vY, true);
const formation3 = new AliensFormation(gameCanvas, aliensLevel3, 84, 8, 180/vY, false);
const formation4 = new AliensFormation(gameCanvas, aliensLevel4, 84, 6, 270/vY, true);




class RenderGame{
    constructor(canvas, spaceship){
        this.canvas = canvas;
        this.spaceship = spaceship;
    }

    drawCallBack = () => {
        this.canvas.clear();
        this.canvas.drawBackground();
        this.spaceship.newPos(leftPressed, rightPressed);
        // shotWay(shipShots, 10);
        
        formation1.moveAliens(34, 48, vX, vY, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
        formation2.moveAliens(34, 48, vX, vY, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
        formation3.moveAliens(34, 48, vX, vY, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
        formation4.moveAliens(34, 48, vX, vY, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
        
        this.spaceship.draw();
        this.spaceship.shotDetect();

        this.start();

    }

    start = () => {
        if(!stopGame) window.requestAnimationFrame(this.drawCallBack);
    }
}

// Generate Aliens

imageAliensLevel1Flip.onload = () => {
    formation1.moveAliens(34, 48, vX, vY, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
    formation2.moveAliens(34, 48, vX, vY, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
    formation3.moveAliens(34, 48, vX, vY, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
    formation4.moveAliens(34, 48, vX, vY, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
}

imageBackground.onload = () =>{
    gameCanvas.drawBackground();
}

imageSpaceShip.onload = () =>{    
    gameSpaceship.draw(); 
    
    const renderGame = new RenderGame(gameCanvas, gameSpaceship);

    renderGame.start();
}


// Spaceship Keyboard Control

window.addEventListener('keydown', keyDownHandler, false);
window.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key === 'd') {
        rightPressed = true;
    }
    else if(e.key === 'a') {
        leftPressed = true;
    }
    else if(e.key === ' '){
        gameSpaceship.shot();
    }
}

function keyUpHandler(e) {
    if(e.key === 'd') {
        rightPressed = false;
    }
    else if(e.key === 'a') {
        leftPressed = false;
    }
}


 


 