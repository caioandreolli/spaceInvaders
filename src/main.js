const gameCanvas = new Canvas();

const imageSpaceShip = new Image();
imageSpaceShip.src = 'images/spaceship.png';

const gameSpaceship = new Spaceship(imageSpaceShip, gameCanvas.ctx, 423, 520, 44, 36, 20);

imageSpaceShip.onload = () =>{    
    gameSpaceship.draw();    
}


class RenderGame{
    constructor(canvas, spaceship){
        this.canvas = canvas;
        this.spaceship = spaceship;
    }

    drawCallBack = () => {
        this.canvas.clear();
        this.spaceship.draw();

        window.requestAnimationFrame(this.drawCallBack);
    }

    start = () => {
        this.drawCallBack();
    }
}


const renderGame = new RenderGame(gameCanvas, gameSpaceship);


window.onkeydown = (e) => {
    gameSpaceship.move(e.keyCode);
    gameSpaceship.speed ++;
    console.log(gameSpaceship.speed);
}

window.onkeyup = (e) => {
    // gameSpaceship.speed = 20;
}

renderGame.start();
 


 