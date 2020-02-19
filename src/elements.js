class Canvas{
  constructor(){
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
  }

  drawBackground(){

  }

  moveBackground(){

  }

  clear = () => {
    this.ctx.clearRect(0, 0, 900, 600);
  }
}



class Spaceship {
    constructor(src, ctx, x, y, w, h, speed){
      this.src = src;
      this.ctx = ctx;
      this.y = y;
      this.x = x;
      this.w = w;
      this.h = h;
      this.speed = speed;
      this.tempEngine = true;
      this.rotEngine = 10;
    }

    draw = (x, y) => {
      this.ctx.drawImage(this.src, x, y, this.w, this.h);
      if(this.tempEngine){
        this.rotEngine +=3;        
        this.ctx.strokeStyle = 'orange';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+22, this.y+24);
        this.ctx.lineTo(this.x+22, this.y+24+this.rotEngine);
        this.ctx.closePath();
        this.ctx.stroke();
        if(this.rotEngine >= 24){
          this.tempEngine = false;
        }
      }else{
        this.rotEngine -=5;
        this.ctx.strokeStyle = 'yellow';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.moveTo(this.x+22, this.y+24);
        this.ctx.lineTo(this.x+22, this.y+24+this.rotEngine);
        this.ctx.closePath();
        this.ctx.stroke();
        if(this.rotEngine <= 10){
          this.tempEngine = true;
        }
      }
    }

    newPos = () => {
      this.x += this.speed;
    }

    move = (key) => {
      switch (key) {
        case 65:
          this.speed -= 1;
          break;
        case 68:
          this.speed += 1;
          break;
      }
    }

    shot(){

    }
}


