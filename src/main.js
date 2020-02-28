// Variables for Keyboard Control

let rightPressed = false;
let leftPressed = false;


// Control Aliens Movement
let vX = 2;
let vY = 0.3;


// Stop the Game

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

const formation1 = new AliensFormation(gameCanvas, 84, 7, 0, false);
const formation2 = new AliensFormation(gameCanvas, 84, 8, 90/vY, true);
const formation3 = new AliensFormation(gameCanvas, 84, 4, 180/vY, false);
const formation4 = new AliensFormation(gameCanvas, 84, 10, 270/vY, true);

//


class RenderGame{
    constructor(canvas, spaceship){
        this.canvas = canvas;
        this.spaceship = spaceship;
    }

    drawCallBack = () => {
        this.canvas.clear();
        this.canvas.drawBackground();
        
        formation1.moveAliens(vX, vY);
        formation2.moveAliens(vX, vY);
        formation3.moveAliens(vX, vY);
        formation4.moveAliens(vX, vY);
        
        if(!this.spaceship.isDead) {
            this.spaceship.newPos(leftPressed, rightPressed);
            this.spaceship.draw();
            this.spaceship.shotDetect();
        }

        this.start();
    }

    start = () => {
        if(!stopGame) window.requestAnimationFrame(this.drawCallBack);
    }
}

// Generate Aliens

imageAliensLevel1Flip.onload = () => {
    formation1.receiveAliens(34, 48, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
    formation2.receiveAliens(34, 48, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
    formation3.receiveAliens(34, 48, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
    formation4.receiveAliens(34, 48, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
    // Receive Aliens Elements
    gameSpaceship.element.push(formation1.arr, formation2.arr, formation3.arr, formation4.arr);
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


 


 