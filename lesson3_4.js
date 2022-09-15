/** @type {HTMLCanvasElement} */
//tutorial https://youtu.be/GFO_txvwK_c?t=6740
//entity images https://pop-shop-packs.itch.io/birds-2d-pixel-character-asset-pack

const canvas = document.getElementById("third1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 928;
CANVAS_HEIGHT = canvas.height = 793;

//https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
let mx = canvas.addEventListener("mousemove", (e) => {
  mx = e.offsetX;
}); 
let my = canvas.addEventListener("mousemove", (e) => {
  my = e.offsetY;
});

let numberOfEntities = 200;
const entityArray = [];

let gameFrame = 0;

//TODO have entities move out when in 200x200 mouse area
//TODO have entities not move into the 200x200 mouse area

class Entity {
  constructor() {
    this.image = new Image();
    this.image.src = "images/Jellyfish.png"; // 32x32 224x160
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
    this.imageScale = Math.random() * 2 + 0.7; //* use this number to scale size
    this.width = this.spriteWidth * this.imageScale;
    this.height = this.spriteHeight * this.imageScale;
    this.x = Math.random() * (canvas.width - this.width); // create them in a posotion
    this.y = Math.random() * (canvas.height - this.height);
    this.newX = Math.random() * (canvas.width - this.width); // here is a new position
    this.newY = Math.random() * (canvas.height - this.height);
    this.mx = mx;
    this.my = my;
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 4 + 2); //Speed of sprite animation framerate
    this.spriteRow = Math.floor(Math.random() * 4); // choose animation from sprite sheet
    this.interval = Math.floor(Math.random() * 900 + 60); // have the entities move at their own individual moment
  }
  update() {
    if (gameFrame % this.interval === 0) {
      // this means every x number of frames in the animLoop (gameFrame % x === 0)
      this.newX = Math.random() * (canvas.width - this.width); // every interval update these coords
      this.newY = Math.random() * (canvas.height - this.height);
    }
    let distX = this.x - this.newX; // calc the distance between the coords
    let distY = this.y - this.newY;
    this.x -= distX * 0.02; // this moves the entities and the * x; number slows the transition so we can see the movement
    this.y -= distY * 0.02;
    if (this.x + this.width < 0) this.x = canvas.width;
    //animate sprites
    let fourOrSeven = 4;
    if (this.spriteRow === 3) fourOrSeven = 2;
    if (gameFrame % this.flapSpeed === 0) {
      this.frame >= fourOrSeven ? (this.frame = 0) : this.frame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      this.spriteHeight * this.spriteRow,
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
  ctx.strokeRect(mx - 50, my - 50, 100, 100);
  entityArray.forEach((entity) => {
    entity.draw();
    entity.update();
  });
  gameFrame++;
  requestAnimationFrame(animationLoop);
}

animationLoop();
