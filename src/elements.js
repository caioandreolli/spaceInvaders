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
    this.xInit = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.src;
    this.turnAlien = false;
    this.downX = false;
  }

  draw = (img, imgFlip) => {
    this.src = (!this.turnAlien) ? img : imgFlip;
    this.x = (!this.downX) ? this.x +=5 : this.x -=5;
    this.ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
  }
}


class AliensFormation {
  constructor(canvas, arr, gap, quant){
    this.canvas = canvas;
    this.arr = arr;
    this.gap = gap;
    this.quant = quant;
    this.y = 120;
    this.x = 0;
    this.ctrlTurnAlien = 0;
    this.ctrlX = 0;
  }
  
  receiveAliens = (w, h, img, imgFlip) => {
    this.ctrlTurnAlien++;
    this.ctrlX ++;
    // this.x = (this.canvas.canvas.width - ((w * this.quant) + ((this.gap - w) * this.quant)))/2 + (this.gap - w)/2;
    for(let i=0; i<this.quant; i++){
      this.arr.push(new Aliens(this.canvas.ctx, this.x+(this.gap*i), this.y, w, h));
      if(this.ctrlTurnAlien % 24 === 0) this.arr[i].turnAlien = !this.arr[i].turnAlien;
      if(this.arr[i].x > this.arr[i].xInit + 200) this.arr[i].downX = !this.arr[i].downX;
      if(this.arr[i].x < this.arr[i].xInit) this.arr[i].downX = !this.arr[i].downX;
      console.log(this.arr[0].xInit)
      this.arr[i].draw(img, imgFlip);
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


