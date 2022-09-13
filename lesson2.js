/** @type {HTMLCanvasElement} */

//tutorial https://www.youtube.com/watch?v=GFO_txvwK_c&t=2587s
//background images https://edermunizz.itch.io/free-pixel-art-forest
// 928 w x 793 h

const canvas = document.getElementById("second");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 928);
const CANVAS_HEIGHT = (canvas.height = 793);
let globalGameSpeed = 3;

const backgroundLayer0 = new Image(); //* Ground Front
backgroundLayer0.src = "/images/Layer00_9.png";

const backgroundLayer1 = new Image(); //* Ground Back
backgroundLayer1.src = "/images/Layer01_8.png";

const backgroundLayer2 = new Image(); //* Tree Tops
backgroundLayer2.src = "/images/Layer02_7.png";

const backgroundLayer3 = new Image(); //* Front Trunks
backgroundLayer3.src = "/images/Layer03_6.png";

const backgroundLayer4 = new Image(); //* Front Lights
backgroundLayer4.src = "/images/Layer04_Lights.png";

const backgroundLayer5 = new Image(); //* Front Middle Trunks
backgroundLayer5.src = "/images/Layer05_5.png";

const backgroundLayer6 = new Image(); //* Back Middle Trunks
backgroundLayer6.src = "/images/Layer06_4.png";

const backgroundLayer7 = new Image(); //* Back Lights
backgroundLayer7.src = "/images/Layer07_Lights.png";

const backgroundLayer8 = new Image(); //* Back Trunks
backgroundLayer8.src = "/images/Layer08_3.png";

const backgroundLayer9 = new Image(); //* Fog Trunks
backgroundLayer9.src = "/images/Layer09_2.png";

const backgroundLayer10 = new Image(); //* Light Blue Fill
backgroundLayer10.src = "/images/Layer10_1.png";

const backgroundLayer11 = new Image(); //* 3 Tone Grad Fill
backgroundLayer11.src = "/images/Layer11_0.png";

window.addEventListener("load", function () {
  //! wrap the whole thing in this to load all the images first

  const slider = document.getElementById("slider");
  slider.value = globalGameSpeed;
  const showScrollSpeed = document.getElementById("showScrollSpeed");
  showScrollSpeed.innerHTML = globalGameSpeed;
  slider.addEventListener("change", function (e) {
    globalGameSpeed = e.target.value;
    showScrollSpeed.innerHTML = e.target.value;
  });

  class Layer {
    // classes start with capital and are like a blueprint, for similar qualites with different values. Require a mandatory construtor method()
    // in a class the constructor Method is a function attached to an Object.
    //When the class is called it will assign properties to a new blank object based on the blueprint in the constructor
    //runs once per Object everytme the class is called with the 'new' keyword
    constructor(image, speedMod, yOffset) {
      this.x = 0;
      this.y = 0;
      this.yOffset = yOffset; // used to adjust layer height: positive is down, negative is up
      this.width = 928;
      this.height = 793;
      this.image = image; // this is getting passed from the constructor (argument)
      this.speedMod = speedMod; // as above
      this.speed = globalGameSpeed * this.speedMod; // this ties it all to the global globalGameSpeed var
    }
    update() {
      // and update method in the class which updates values
      this.speed = globalGameSpeed * this.speedMod;
      if (this.x <= -this.width) {
        // this is detecting the edge and reset to 0
        this.x = 0;
      }
      this.x = this.x - this.speed; // T is moving the image to the left. + will move to the right but the offest image needs to be on the otheside
    }
    draw() {
      // draws stuff on the canvas
      ctx.drawImage(
        this.image,
        this.x,
        this.y + this.yOffset,
        this.width + 2,
        this.height
      );
      ctx.drawImage(
        this.image,
        this.x + this.width,
        +this.yOffset,
        this.width,
        this.height
      ); // this replaces the paris of draw image below
    }
  }

  // These will set the layer relative speeds by creating new Objects from the class to be drawn in the animation loop

  const layer0 = new Layer(backgroundLayer0, 1, 15); //* Ground Front
  const layer1 = new Layer(backgroundLayer1, 0.85, 0); //* Ground Back
  const layer2 = new Layer(backgroundLayer2, 0.8, 0); //* Tree Tops
  const layer3 = new Layer(backgroundLayer3, 0.7, 0); //* Front Trunks
  const layer4 = new Layer(backgroundLayer4, 0.5, 0); //* Front Lights
  const layer5 = new Layer(backgroundLayer5, 0.45, 0); //* Front Middle Trunks
  const layer6 = new Layer(backgroundLayer6, 0.25, 0); //* Back Middle Trunks
  const layer7 = new Layer(backgroundLayer7, 0.2, 0); //* Back Lights
  const layer8 = new Layer(backgroundLayer8, 0.1, 0); //* Back Trunks
  const layer9 = new Layer(backgroundLayer9, 0.05, 0); //* Fog Trunks
  const layer10 = new Layer(backgroundLayer10, 0); //* Light Blue Fill
  const layer11 = new Layer(backgroundLayer11, 0); //* 3 Tone Grad Fill

  const gameObjects = [
    layer11,
    layer10,
    layer9,
    layer8,
    layer7,
    layer6,
    layer5,
    layer4,
    layer3,
    layer2,
    layer1,
    layer0,
  ]; // the order of this needs to be right to left

  function animationLoop() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // ctx.drawImage(backgroundLayer11, x , 0);
    // ctx.drawImage(backgroundLayer11, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer10, x , 0);
    // ctx.drawImage(backgroundLayer10, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer9, x , 0);
    // ctx.drawImage(backgroundLayer9, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer8, x , 0);
    // ctx.drawImage(backgroundLayer8, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer7, x , 0);
    // ctx.drawImage(backgroundLayer7, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer6, x , 0);
    // ctx.drawImage(backgroundLayer6, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer5, x , 0);
    // ctx.drawImage(backgroundLayer5, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer4, x , 0);
    // ctx.drawImage(backgroundLayer4, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer3, x , 0);
    // ctx.drawImage(backgroundLayer3, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer2, x , 0);
    // ctx.drawImage(backgroundLayer2, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer1, x , 0);
    // ctx.drawImage(backgroundLayer1, x + CANVAS_WIDTH , 0);
    // ctx.drawImage(backgroundLayer0, x , 0);
    // ctx.drawImage(backgroundLayer0, x + CANVAS_WIDTH , 0);

    // if( x < - CANVAS_WIDTH) x = 0;
    // else x -= globalGameSpeed;

    // layer1.update();
    // layer1.draw();
    // layer2.update();
    // layer2.draw();
    // layer3.update();
    // layer3.draw();
    //etc...

    gameObjects.forEach((object) => {
      //!! calls the update and draws from each array class object!
      object.update();
      object.draw();
    });
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, CANVAS_WIDTH, 280);
    requestAnimationFrame(animationLoop);
  }
  animationLoop();
});
