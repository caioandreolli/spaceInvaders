let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let shipShoots = [];
let gunShootControl = 0;

const gameCanvas = new Canvas();

const imageSpaceShip = new Image();
imageSpaceShip.src = 'images/spaceship.png';

const gameSpaceship = new Spaceship(imageSpaceShip, gameCanvas.ctx, 423, 520, 44, 36);


class RenderGame{
    constructor(canvas, spaceship){
        this.canvas = canvas;
        this.spaceship = spaceship;
    }

    drawCallBack = () => {
        this.canvas.clear();
        this.spaceship.newPos(leftPressed, rightPressed);
        this.spaceship.draw();
        shootWay();


        window.requestAnimationFrame(this.drawCallBack);
    }

    start = () => {
        this.drawCallBack();
    }
}


// Spaceship shoot function

function shootWay(){
    for (i = 0; i < shipShoots.length; i++){
        shipShoots[i].y -= 10;
        if(shipShoots[i].y <= 340) {
            shipShoots[i].y -= 7;
            shipShoots[i].h = 24;
        }
        shipShoots[i].draw();
        if(shipShoots[0].y <= 0) shipShoots.shift();
        console.log(shipShoots);
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
        shipShoots.push(new Gunshot(gameCanvas.ctx, '#535F84', 10, gameSpaceship.x +21, gameSpaceship.y+10, 2, 18));
        shipShoots.push(new Gunshot(gameCanvas.ctx, '#AAE7FF', 10, gameSpaceship.x +21, gameSpaceship.y, 2, 18));
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


imageSpaceShip.onload = () =>{    
    gameSpaceship.draw(); 
    
    const renderGame = new RenderGame(gameCanvas, gameSpaceship);

    renderGame.start();
}


 


 