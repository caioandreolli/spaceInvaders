// this.x = (this.canvas.canvas.width - ((w * this.quant) + ((this.gap - w) * this.quant)))/2 + (this.gap - w)/2; 


class Canvas{
  constructor(){
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.src;
      this.backgroundSpeed = 0.3;
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
      this.element = [];
      this.hasExplosion = false;
      this.isDead = false;
      this.countExplosion = 0;
      this.isAllAliensDead = 0;
    }
    
    draw = () => {
      if(!this.hasExplosion){
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
      } else {
        this.explosion();
      }
      if(this.isDead){
        //Send to Cemitery
        this.x = -100;
        this.y = -100;
      };
    }

    newPos = (leftPressed, rightPressed) => {
      if(rightPressed) {
        if(this.x<=846) this.x += 6;
      }
      else if(leftPressed) if(this.x >= 10) this.x -= 6;
    }

    shot = () => {
      this.shotArr.push(new Gunshot(gameCanvas.ctx, '#AAE7FF', 10, gameSpaceship.x +20, gameSpaceship.y -4, 4, 18));
    }

    shotDetect = () => {
      this.shotArr.forEach((shot, i) => {
        shot.y -= this.shotV;
        shot.distance++;
        if(shot.distance >= 20){
          shot.y -= this.shotV*1.2;
          shot.h = 24;
        }
        if(shot.distance >= 30) {
          shot.y -= this.shotV*2;
          shot.h = 36;
        }
        shot.draw();
        this.element.forEach(formation => {
          formation.forEach(alien => {
            if(shot.hitShot(alien)){
              this.shotArr.splice(i,1);
              alien.hasExplosion = true;
              this.isAllAliensDead++;
              if(this.isAllAliensDead === quantAliens) hasYouWin = true;
            }
          });
        });
        if(shot.y <= 0) this.shotArr.shift();
      })
    }

    explosion = () => {
      this.countExplosion++;
        let imgExplosion = new Image();
        if(this.countExplosion >= 0 && this.countExplosion <= 7){
          imgExplosion.src = 'images/explosion_0.png';
          this.ctx.drawImage(imgExplosion, this.x-8, this.y-8, 60, 60);
        }
        if(this.countExplosion >=8 && this.countExplosion <= 15){
          imgExplosion.src = 'images/explosion_1_0.png';
          this.ctx.drawImage(imgExplosion, this.x-8, this.y-8, 60, 60);
        }
        if(this.countExplosion >=16 && this.countExplosion <= 22){
          imgExplosion.src = 'images/explosion_1.png';
          this.ctx.drawImage(imgExplosion, this.x-8, this.y-8, 60, 60);
        }
        if(this.countExplosion >=23 && this.countExplosion <= 30){
          imgExplosion.src = 'images/explosion_2_0.png';
          this.ctx.drawImage(imgExplosion, this.x-8, this.y-8, 60, 60);
        }
        if(this.countExplosion >=31 && this.countExplosion <= 38){
          imgExplosion.src = 'images/explosion_2.png';
          this.ctx.drawImage(imgExplosion, this.x-8, this.y-8, 60, 60);
        }
        if(this.countExplosion >= 39) {
          hasGameOver = true;
          this.hasExplosion = false;
          this.countExplosion = 0;
          this.isDead = true;
        }
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
    bottom() {
      return this.y + this.h;
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
    this.shotV = 8;
    this.hasExplosion = false;
    this.isDead = false;
    this.countExplosion = 0;
  }

  draw = (img, imgFlip, v) => {
    this.x = (!this.moveX) ? this.x +=v : this.x -=v;
    if(!this.hasExplosion){
      this.src = (!this.turnAlien) ? img : imgFlip;
      this.ctx.drawImage(this.src, this.x, this.y, this.w, this.h);
    } else {
      this.explosion();
    }
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
    this.shotArr.forEach((e, i) => {
      e.distance++;
      e.y += this.shotV;
      if(e.distance >= 20){
        e.y += this.shotV*0.2;
        e.h = 22;
      }
      if(e.distance >= 30) {
        e.y += this.shotV*0.2;
        e.h = 30;
      }
      e.draw();
      if(e.hitShot(this.element)) {
        this.element.hasExplosion = true;
        this.shotArr.splice(i,1);
      }
      if(e.y >= 600) this.shotArr.shift();
    });
  }

  colision = () => {
    return !(
      this.bottom() < this.element.top() ||
      this.top() > this.element.bottom() ||
      this.right() < this.element.left() ||
      this.left() > this.element.right()
    );
  }

  explosion = () => {
    this.countExplosion++;
      let imgExplosion = new Image();
      if(this.countExplosion >= 0 && this.countExplosion <= 5){
        imgExplosion.src = 'images/explosion_0.png';
        this.ctx.drawImage(imgExplosion, this.x-8, this.y-2, 48, 48);
      }
      if(this.countExplosion >=6 && this.countExplosion <= 11){
        imgExplosion.src = 'images/explosion_1.png';
        this.ctx.drawImage(imgExplosion, this.x-8, this.y-2, 48, 48);
      }
      if(this.countExplosion >=12 && this.countExplosion <= 18){
        imgExplosion.src = 'images/explosion_2.png';
        this.ctx.drawImage(imgExplosion, this.x-8, this.y-2, 48, 48);
      }
      if(this.countExplosion > 18) {
        this.isDead = true;
        this.hasExplosion = false;
      }
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
  bottom() {
    return this.y + this.h;
  }
}


class AliensFormation {
  constructor(canvas, gap, quant, delayY, delayX){
    this.canvas = canvas;
    this.gap = gap;
    this.quant = quant;
    this.delayY = delayY;
    this.delayX = delayX;
    this.arr = [];
    this.x = 0;
    this.ctrlTurnAlien = 0;
    this.ctrlY = 0;
    this.turnBack = 0;
    this.img;
    this.imgFlip;
    this.distance;
    this.isAllAliensDead = 0;
  }

  receiveAliens = (w, h, img, imgFlip, element) => {
    this.img = img;
    this.imgFlip = imgFlip;
    this.distance = this.canvas.canvas.width - ((w * this.quant) + ((this.gap - w) * this.quant) - (this.gap - w));
    let xStart;
    for(let i=0; i<this.quant; i++){
      xStart = (this.delayX) ? this.distance + this.gap*i : this.x + (this.gap * i);
      this.arr.push(new Aliens(this.canvas.ctx, xStart, -h, w, h, element));
      this.arr[i].turnBack = h;
      this.arr[i].draw(img, imgFlip, 0);
    }
  }
  
  moveAliens = (vX, vY) => {
    this.ctrlTurnAlien++;
    this.ctrlY++;
    this.arr.forEach((e, i) => {
      if(!e.isDead){
        if(this.ctrlY >= this.delayY) {
          e.y +=vY;
          if(e.y > 600) e.y = -(e.turnBack);
        }
        if(this.delayX) e.xInit = this.x + (this.gap * i);
        if(this.ctrlTurnAlien % 24 === 0) e.turnAlien = !e.turnAlien;
        if(e.x > e.xInit + this.distance) e.moveX = !e.moveX;
        if(e.x < e.xInit) e.moveX = !e.moveX;
        e.draw(this.img, this.imgFlip, vX);
        e.colision();
        if(e.colision()) {
          e.element.hasExplosion = true;
          e.hasExplosion = true;
        }
        e.shot();
      } else {
        // Send to Cemitery
        e.y = -100;
        e.x = -100;
      }
      e.shotDetect();
    });
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
  top() {
    return this.y;
 }
  bottom() {
    return this.y + this.h;
  }

  hitShot(element) {
    return !(
      this.bottom() < element.top() ||
      this.top() > element.bottom() ||
      this.right() < element.left() ||
      this.left() > element.right()
    );
  }
}
