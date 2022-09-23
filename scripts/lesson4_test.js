/** @type {HTMLCanvasElement} */

// Sounds: https://freesound.org/people/nfrae/sounds/167242/

const canvas = document.getElementById("third1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 928;
CANVAS_HEIGHT = canvas.height = 793;

const explosions = [];

class Explosion {
  constructor(x, y) {
    this.spritewidth = 64;
    this.spriteheight = 64;
    this.spriteScale = 2.4;
    this.width = this.spritewidth * this.spriteScale;
    this.height = this.spriteheight * this.spriteScale;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = "images/firework.png";
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = "images/firework.mp3";
    this.soundb = new Audio();
    this.soundb.src = "images/explodeBass.mp3";
    // this.originx = CANVAS_WIDTH * 0.5;
    // this.originy = CANVAS_HEIGHT;
    
  }
  update() {
    if (this.frame === 0) this.sound.play(); //play the sound once
    if (this.frame === 4) this.soundb.play(); //play the sound once
    this.timer++;
    if (this.timer % 3 === 0) {
      this.frame++;
    }
  }
  draw() {
    // ctx.strokeStyle = 'white';

    // ctx.beginPath();
    // ctx.moveTo(this.originx, this.originy);
    // ctx.lineTo(this.x, this.y);
    // ctx.stroke();

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.spritewidth * this.frame,
      0,
      this.spritewidth,
      this.spriteheight,
      0 - this.width * 0.5,
      0 - this.height * 0.5,
      this.width,
      this.height
    );
    ctx.restore();
  }
}

const rockets = [];

class Rocket {
  constructor(x,y) {
    this.ox = CANVAS_WIDTH * 0.5; //Orgin X
    this.oy = CANVAS_HEIGHT; // Origin Y
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.timer = 0;
    this.dx = this.x - this.ox;
    this.dy = this.y - this.oy;
    this.dl = Math.floor(Math.sqrt(this.dx * this.dx + this.dy * this.dy));
    this.dlSteps = 0; 

    this.soundl = new Audio();
    this.soundl.src = "images/launch.mp3";
    this.soundw = new Audio();
    this.soundw.src = "images/whistle.mp3";

  }
  update () {
    this.timer++;
    
    // if (this.timer % 3 === 0) {
    //   this.frame++;
    // }
    
    for (let i=0; i < this.dlSteps ; i++ ) {
      this.frame++;
    }

    // this.frame++;


  }
  draw () {
    ctx.strokeStyle = 'white';

    ctx.strokeRect(this.x - 10 , this.y - 10 , 20 , 20);

    ctx.beginPath();
    ctx.moveTo(this.ox, this.oy);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();

    // ctx.fillStyle = "lightblue";
    // ctx.font = "15px VT323";
    // ctx.textAlign = "center";
    // ctx.fillText(this.dx , this.x , this.y);
    console.log("rocket distance: " + this.dl);
    console.log("frame: " + this.frame);
    console.log("timer: " + this.timer);
  }

}

canvas.addEventListener("click", function (e) {
  createAnimation(e);
});

// canvas.addEventListener('mousemove', function (e){
//     createAnimation(e);
// });

function createAnimation(e) {
  let mx = e.offsetX;
  let my = e.offsetY;
  explosions.push(new Explosion(mx, my));
  rockets.push(new Rocket (mx,my));

}

function animationLoop() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

// if rocket has finshed animating

  for (let i = 0; i < rockets.length; i++) {
    //rockets[i].update();
    rockets[i].draw();
    console.log(rockets);
    if (rockets[i].frame === 0) {
      rockets.splice(i, 1);
      i--;
    }
  }

  // then fire explosion

  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].frame > 29) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animationLoop);
}

animationLoop();
