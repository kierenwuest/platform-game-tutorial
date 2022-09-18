/** @type {HTMLCanvasElement} */
//https://www.youtube.com/watch?v=GFO_txvwK_c&t=8654s
// Sprites: https://limofeus.itch.io/pixel-simulations

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
    this.soundl = new Audio();
    this.soundl.src = "images/launch.mp3";
    this.soundw = new Audio();
    this.soundw.src = "images/whistle.mp3";
    this.originx = CANVAS_WIDTH * 0.5;
    this.originy = CANVAS_HEIGHT;
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
}

function animationLoop() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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
