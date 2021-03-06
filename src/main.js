// Intro Elements
const imgBegin = new Image();
const imgBtEasy = new Image();
const imgBtMedium = new Image();
const imgBtHard = new Image();
imgBegin.src = 'images/logo.png';
imgBtEasy.src = 'images/bt_easy.png'
imgBtMedium.src = 'images/bt_medium.png'
imgBtHard.src = 'images/bt_hard.png'


// Levels / Game Over / You Wim
let isEasy = false;
let isMedium = false;
let isHard = false;
let hasGameOver = false;
let hasYouWin = false;
let toggleBegin = true;
const imgGameOver = new Image();
imgGameOver.src = 'images/game_over.png';
const imgYouWin = new Image();
imgYouWin.src = 'images/you_win.png';


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
const formation3 = new AliensFormation(gameCanvas, 84, 9, 180/vY, false);
const formation4 = new AliensFormation(gameCanvas, 84, 10, 270/vY, true);
const quantAliens = 34;


// RenderGame

class RenderGame{
    constructor(canvas, spaceship){
        this.canvas = canvas;
        this.spaceship = spaceship;
    }

    drawCallBack = () => {
        this.canvas.clear();
        this.canvas.drawBackground();
        
        if(!(isEasy || isMedium || isHard)) beginGame();

        if(isEasy) easyMode();
        // formation1.moveAliens(vX, vY);
        // formation2.moveAliens(vX, vY);
        // formation3.moveAliens(vX, vY);
        // formation4.moveAliens(vX, vY);
        
        if(!this.spaceship.isDead) {
            this.spaceship.newPos(leftPressed, rightPressed);
            this.spaceship.draw();
            this.spaceship.shotDetect();
        }
        if(hasGameOver){
            gameOver();
        }
        if(hasYouWin){
            youWin();
        }

        this.start();
    }

    start = () => {
        if(!stopGame) window.requestAnimationFrame(this.drawCallBack);
    }
}


// Generate Aliens

// imageAliensLevel1Flip.onload = () => {
//     formation1.receiveAliens(34, 48, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
//     formation2.receiveAliens(34, 48, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
//     formation3.receiveAliens(34, 48, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
//     formation4.receiveAliens(34, 48, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
//     // Receive Aliens Elements
//     gameSpaceship.element.push(formation1.arr, formation2.arr, formation3.arr, formation4.arr);
// }

imageBackground.onload = () =>{
    gameCanvas.drawBackground();
}

imageSpaceShip.onload = () =>{    
    gameSpaceship.draw(); 
    
    const renderGame = new RenderGame(gameCanvas, gameSpaceship);

    renderGame.start();
}


// Intro Events

function beginGame(){
    gameSpaceship.isDead = false;
    gameSpaceship.isAllAliensDead = 0;
    hasYouWin = false;
    hasGameOver = false;
    isEasy = false;
    gameCanvas.ctx.drawImage(imgBegin, 238, 108, 424, 214);
    gameCanvas.ctx.drawImage(imgBtEasy, 208, 401, 140, 40);
    gameCanvas.ctx.drawImage(imgBtMedium, 380, 401, 140, 40);
    gameCanvas.ctx.drawImage(imgBtHard, 552, 401, 140, 40);
    document.body.style.background = '#0F0C2B';
    if(toggleBegin){
        gameSpaceship.x = 428;
        gameSpaceship.y = 520;
        toggleBegin = false;
    }
}

gameCanvas.canvas.addEventListener('click', clickMouse, false);

function clickMouse(e) {
    let x = e.offsetX;
    let y = e.offsetY;
    if(!(isEasy || isMedium || isHard)){
        if (x >= 208 && x <= 348 &&
            y >= 401 && y <= 441) {
            isEasy = true;
        }
        if (x >= 380 && x <= 520 &&
            y >= 401 && y <= 441) {
            alert("MEDIUM!");
        }
        if (x >= 552 && x <= 692 &&
            y >= 401 && y <= 441) {
            alert("HARD!");
        }
    } else if(hasGameOver || hasYouWin){
        if (x >= 388 && x <= 528 &&
            y >= 401 && y <= 441) {
            gameSpaceship.element = [];
            // let arrFormation = [formation1, formation2, formation3, formation4];
            // delayFormation(arrFormation)
            formation1.arr = [];
            formation2.arr = [];
            formation3.arr = [];
            formation4.arr = [];
            beginGame();
        }
    }
};

// function delayFormation(e){
//     console.log(e)
//     for(let i=0; i<=e.length; i++){
//         e[i].delayY = (90*i)/vY;
//         if(i%2===0){
//             console.log(e[i])
//             e[i].delayX = false;
//         } else {
//             e[i].delayX = true;
//         }
//     }
// }

function restartFormation(e){
    for(let i=0; i<e.length; i++){
        e[i].arr = [];
        e[i].x = 0;
        e[i].ctrlTurnAlien = 0;
        e[i].ctrlY = 0;
        e[i].turnBack = 0;
    }
}

// Levels / Game Over / You Wim

function easyMode() {
    if(!toggleBegin){
        // imageAliensLevel1Flip.onload = () => {
            let arrFormation = [formation1, formation2, formation3, formation4];
            restartFormation(arrFormation);
            //
            formation1.receiveAliens(34, 48, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
            formation2.receiveAliens(34, 48, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
            formation3.receiveAliens(34, 48, imageAliensLevel1, imageAliensLevel1Flip, gameSpaceship);
            formation4.receiveAliens(34, 48, imageAliensLevel1Flip, imageAliensLevel1, gameSpaceship);
            // Receive Aliens Elements
            gameSpaceship.element.push(formation1.arr, formation2.arr, formation3.arr, formation4.arr);
            toggleBegin = true;
        // }
    }
    formation1.moveAliens(vX, vY);
    formation2.moveAliens(vX, vY);
    formation3.moveAliens(vX, vY);
    formation4.moveAliens(vX, vY);
}

function gameOver() {
    toggleBegin = true;
    gameCanvas.ctx.fillStyle = 'rgba(0,0,0,.6)';
    gameCanvas.ctx.fillRect(0, 0, 900, 600);
    gameCanvas.ctx.drawImage(imgGameOver, 274, 153, 352, 288);
    document.body.style.background = '#060510';
}

function youWin() {
    toggleBegin = true;
    gameCanvas.ctx.fillStyle = 'rgba(0,0,0,.6)';
    gameCanvas.ctx.fillRect(0, 0, 900, 600);
    gameCanvas.ctx.drawImage(imgYouWin, 318, 168, 263, 273);
    document.body.style.background = '#060510';
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