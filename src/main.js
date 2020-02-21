let rightPressed = false;
let leftPressed = false;
let shipShoots = [];
let aliensLevel1 = [];
let aliensLevel2 = [];
const aliensQuant = 10;
let controlTurnAlien = 0;


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



class RenderGame{
    constructor(canvas, spaceship){
        this.canvas = canvas;
        this.spaceship = spaceship;
    }

    drawCallBack = () => {
        this.canvas.clear();
        this.canvas.drawBackground();
        this.spaceship.newPos(leftPressed, rightPressed);
        shootWay(shipShoots, 10);
        
        this.spaceship.draw();
        aliensFormation(aliensLevel1, 120);
        // shootWay(aliensLevel1, -10);
        // aliensFormation(aliensLevel2, 200);

        window.requestAnimationFrame(this.drawCallBack);
    }

    start = () => {
        this.drawCallBack();
    }
}


// Generate Aliens

aliensFormation = (arr, y) => {
    controlTurnAlien ++;
    let aliensGap = 74;
    let aliensW = 34;

    let aliensXStart = (gameCanvas.canvas.width - ((aliensW*aliensQuant)+((aliensGap-aliensW)*aliensQuant)))/2 + (aliensGap-aliensW)/2;

    for(i=0; i<aliensQuant; i++){
        arr.push(new Aliens(gameCanvas.ctx, aliensXStart+(aliensGap*i), y, aliensW, 48));
        if (controlTurnAlien % 24 === 0) arr[i].turnAlien = !arr[i].turnAlien;
        if(!arr[i].turnAlien){
            arr[i].src = imageAliensLevel1;
        } else {
            arr[i].src = imageAliensLevel1Flip;
        }
        arr[i].draw();
    }
}

imageAliensLevel1.onload = () => {
    aliensFormation(aliensLevel1, 120);
    // aliensFormation(aliensLevel2, 200);
}


// Spaceship shoot function

shootWay = (arr,v) => {
    for (let i = 0; i<arr.length; i++){
    arr[i].y -= v;
        if(arr[i].y >= 241 && arr[i].y <= 400){
            arr[i].y -= v*1.4;
            arr[i].h = 24;
            arr[i].w = 3;
        }
        if(arr[i].y <= 240) {
            arr[i].y -= v*2;
            arr[i].h = 36;
            arr[i].w = 2;
        }
        arr[i].draw();
        if(arr[0].y <= 0) arr.shift();
    }
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
        shipShoots.push(new Gunshot(gameCanvas.ctx, '#535F84', 10, gameSpaceship.x +20, gameSpaceship.y +6, 4, 18));
        shipShoots.push(new Gunshot(gameCanvas.ctx, '#AAE7FF', 10, gameSpaceship.x +20, gameSpaceship.y -4, 4, 18));
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

imageBackground.onload = () =>{
    gameCanvas.drawBackground();
}

imageSpaceShip.onload = () =>{    
    gameSpaceship.draw(); 
    
    const renderGame = new RenderGame(gameCanvas, gameSpaceship);

    renderGame.start();
}


 


 