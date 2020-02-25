// this.x = (this.canvas.canvas.width - ((w * this.quant) + ((this.gap - w) * this.quant)))/2 + (this.gap - w)/2; 


class Canvas{
  constructor(){
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.src;
      this.backgroundSpeed = 20;
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
      this.shotArr = [];
      this.shotV = 10;
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

    shot = () => {
      this.shotArr.push(new Gunshot(gameCanvas.ctx, '#AAE7FF', 10, gameSpaceship.x +20, gameSpaceship.y -4, 4, 18));
    }

    shotDetect = () => {
      this.shotArr.forEach(e => {
        e.y -= this.shotV;
        e.distance++;
        if(e.distance > 20){
          e.y -= this.shotV*1.2;
          e.h = 24;
        }
        if(e.distance > 30) {
          e.y -= this.shotV*2;
          e.h = 36;
        }
        e.draw();
        // if(e.hitShot(this.element)) return stopGame = true;
        if(e.y > 600) this.shotArr.shift();
      })
    }

    left() {
      return this.x;
    }
    right() {
      return this.x + this.w;
    }
    top() {
      return this.y;
    }

}


class Aliens {
  constructor(ctx, x, y, w, h, element){
    this.ctx = ctx;
    this.x = x;
    this.xInit = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.src;
    this.turnAlien = false;
    this.moveX = false;
    this.shotArr = [];
    this.element = element;
    this.shotV = 10;
  }

  draw = (img, imgFlip, v) => {
    this.src = (!this.turnAlien) ? img : imgFlip;
    this.x = (!this.moveX) ? this.x +=v : this.x -=v;
    this.ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
  }

  shot = () =>{
    if(Math.floor(Math.random()*500)===9){
      this.shotArr.push(new Gunshot(this.ctx, '#AED83A', 10, this.x + this.w/2, this.y + 40, 4, 18));
      this.ctx.beginPath();
      this.ctx.fillStyle = '#4F5D30';
      this.ctx.arc(this.x + this.w/2, this.y + 40, 20, 0, 2 * Math.PI, false);
      this.ctx.fill();
      this.ctx.closePath();
    };
  }

  shotDetect = () => {
    this.shotArr.forEach(e => {
      e.distance++;
      e.y += this.shotV;
      if(e.distance > 20){
        e.y += this.shotV*0.2;
        e.h = 22;
      }
      if(e.distance > 30) {
        e.y += this.shotV*0.2;
        e.h = 30;
      }
      e.draw();
      if(e.hitShot(this.element)) return stopGame = true;
      if(e.y > 600) this.shotArr.shift();
    });
  }
}


class AliensFormation {
  constructor(canvas, arr, gap, quant, delayY, delayX){
    this.canvas = canvas;
    this.arr = arr;
    this.gap = gap;
    this.quant = quant;
    this.delayY = delayY;
    this.delayX = delayX;
    this.x = 0;
    this.ctrlTurnAlien = 0;
    this.ctrlY = 0;
  }
  
  moveAliens = (w, h, vX, vY, img, imgFlip, element) => {
    this.ctrlTurnAlien++;
    this.ctrlY++;
    let distance = this.canvas.canvas.width - ((w * this.quant) + ((this.gap - w) * this.quant) - (this.gap - w));
    let xStart;

    for(let i=0; i<this.quant; i++){
      xStart = (this.delayX) ? distance + this.gap*i : this.x + (this.gap * i);
      this.arr.push(new Aliens(this.canvas.ctx, xStart, -h, w, h, element));

      if(this.ctrlY >= this.delayY) {
        this.arr[i].y +=vY;
        if(this.arr[i].y > 600) this.arr[i].y = -h;
      }

      if(this.delayX) this.arr[i].xInit = this.x + (this.gap * i);
      if(this.ctrlTurnAlien % 24 === 0) this.arr[i].turnAlien = !this.arr[i].turnAlien;
      if(this.arr[i].x > this.arr[i].xInit + distance) this.arr[i].moveX = !this.arr[i].moveX;
      if(this.arr[i].x < this.arr[i].xInit) this.arr[i].moveX = !this.arr[i].moveX;
      this.arr[i].draw(img, imgFlip, vX);
      this.arr[i].shot();
      this.arr[i].shotDetect();
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
    this.distance = 0;
  }

  draw = () => {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  left() {
    return this.x;
  }
  right() {
    return this.x + this.w;
  }
  bottom() {
    return this.y + this.h;
  }

  hitShot(element) {
    return !(
      this.bottom() < element.top() ||
      this.right() < element.left() || 
      this.left() > element.right()
    );
  }
}


