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
    constructor(src, ctx, x, y, w, h){
      this.src = src;
      this.ctx = ctx;
      this.y = y;
      this.x = x;
      this.w = w;
      this.h = h;
      this.tempEngine = true;
      this.rotEngine = 10;
    }

    draw = () => {
      this.ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
      // Afterburner
      if(this.tempEngine){
        this.rotEngine +=3;        
        this.ctx.fillStyle = 'orange';
        this.ctx.fillRect(this.x+20, this.y+24, 4, this.rotEngine);
        if(this.rotEngine >= 24){
          this.tempEngine = false;
        }
      }else{
        this.rotEngine -=5;
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(this.x+20, this.y+24, 4, this.rotEngine);
        if(this.rotEngine <= 10){
          this.tempEngine = true;
        }
      } 
    }

    newPos = (leftPressed, rightPressed) => {
      if(rightPressed) {
        this.x += 6;
      }
      else if(leftPressed) {
        this.x -= 6;
      }
    }

}


class Gunshot {
  constructor(ctx, color, speed, x, y, w, h){
    this.ctx = ctx;
    this.color = color;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw = () => {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

}


