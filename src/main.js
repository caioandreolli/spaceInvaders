let rightPressed = false;
let leftPressed = false;

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

        window.requestAnimationFrame(this.drawCallBack);
    }

    start = () => {
        this.drawCallBack();
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
}

function keyUpHandler(e) {
    if(e.key == 'd') {
        rightPressed = false;
    }
    else if(e.key == 'a') {
        leftPressed = false;
    }
}


imageSpaceShip.onload = () =>{    
    gameSpaceship.draw(); 
    
    const renderGame = new RenderGame(gameCanvas, gameSpaceship);

    renderGame.start();
}


 


 