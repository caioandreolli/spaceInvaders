const gameCanvas = new Canvas();

const imageSpaceShip = new Image();
imageSpaceShip.src = 'images/spaceship.png';

const gameSpaceship = new Spaceship(imageSpaceShip, gameCanvas.ctx, 423, 520, 44, 36, 1);

class RenderGame{
    constructor(canvas, spaceship){
        this.canvas = canvas;
        this.spaceship = spaceship;
    }

    drawCallBack = () => {
        this.canvas.clear();
        this.spaceship.draw(this.spaceship.x, this.spaceship.y);

        window.requestAnimationFrame(this.drawCallBack);
    }

    start = () => {
        this.drawCallBack();
    }
}


imageSpaceShip.onload = () =>{    
    gameSpaceship.draw(); 
    
    const renderGame = new RenderGame(gameCanvas, gameSpaceship);

    document.onkeydown = (e) => {
        gameSpaceship.move(e.keyCode);
        console.log
    }

    document.onkeyup = (e) => {
        gameSpaceship.speed = 0 ;
    }

    renderGame.start();
}


 


 