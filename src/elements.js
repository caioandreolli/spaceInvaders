class Canvas{
  constructor(){
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.src;
      this.backgroundSpeed = 14;
      this.bgYPos = 0;
  }

  drawBackground = () => {
    this.ctx.drawImage(this.src, 0, this.bgYPos, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.src, 0, this.bgYPos - this.canvas.height, this.canvas.width, this.canvas.height);
    this.bgYPos +=this.backgroundSpeed;
    if(this.bgYPos >= this.canvas.height) this.bgYPos = 0;
  }

  clear = () => {
    this.ctx.clearRect(0, 0, 900, 600);
  }
}



class Spaceship {
    constructor(ctx, x, y, w, h){
      this.src;
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


class Aliens {
  constructor(ctx, x, y, w, h){
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.src;
    this.turnAlien = false;
  }

  draw = () => {
    this.ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
  }

  // newPosY = () =>{

  // }

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

}


