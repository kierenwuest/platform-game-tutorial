/** @type {HTMLCanvasElement} */
//tutorial https://youtu.be/GFO_txvwK_c?t=6740
//entity images https://pop-shop-packs.itch.io/birds-2d-pixel-character-asset-pack

const canvas = document.getElementById("third1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 928;
CANVAS_HEIGHT = canvas.height = 793;

const numberOfEntities = 160;
const entityArray = [];

let gameFrame = 0;

class Entity {
  constructor() {
    this.image = new Image();
    this.image.src = "images/BlueBird.png";
    this.speed = Math.random() * 3 + 1;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
    this.imageScale = Math.random() * 1 + 0.4; //* use this number to scale size
    this.width = this.spriteWidth * this.imageScale;
    this.height = this.spriteHeight * this.imageScale;
    this.x = Math.random() * (canvas.width - this.width); // this keeps them spawning within the canvas area and the brackets need to be there to work
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 2.4 + 1.3);
    this.angle = Math.random() * 2;
    this.angleSpeed = Math.random() * 0.2; //modifies the magnitude (wave shape) of the sin randomly
    this.rise = Math.random() * 2; // using random puts a random value into each new enitity. this gives a small rise in y value (up)
  }
  update() {
    this.x -= this.speed;
    this.y += Math.sin(this.angle) - this.rise; //! Sin flows from 1 to -1 and back & adding the rise variable (it needs -)
    this.angle += this.angleSpeed; // Gives the entities a different random sin magnitude (wave shape)
    if (this.x + this.width < 0) this.x = canvas.width;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame >= 2 ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEntities; i++) {
  entityArray.push(new Entity());
}

function animationLoop() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  entityArray.forEach((entity) => {
    entity.draw();
    entity.update();
  });
  gameFrame++;
  requestAnimationFrame(animationLoop);
}

animationLoop();
