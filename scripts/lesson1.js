/** @type {HTMLCanvasElement} */ //This gives VSCode Intellisense the canvas context methods

let playerAnimState = "idle"; // page control action
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (event) {
  playerAnimState = event.target.value;
});

checkbox = document.getElementById("checkbox");  // page control direction https://stackoverflow.com/a/53600488/19920741
checkbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    charDirection = "right";
  } else {
    charDirection = "left";
  }
});

let charDirection = "right";

const canvas = document.getElementById("first");
const ctx = canvas.getContext("2d");

// console.log(ctx); // Looks at all the particulars of canvas on the page

const ctxWidth = (canvas.width = 600); // Without this the default canvas xy is 300 x 150 for some reason
const ctxHeight = (canvas.height = 600);

const charImage = new Image();
charImage.src = "images/Ranger_288x128_SpriteSheet.png"; // https://chierit.itch.io/elementals-leaf-ranger
// idle
// run
// jumpUp
// jumpUpLoop
// jumpDown
// jumpDownLoop
// jumpAtk
// jumpAtkAction
// roll
// slide
// arrowStab
// shoot
// shootUpMany
// shootPower
// blockRoot
// takeHit
// death
const spriteWidth = 288;
const spriteHeight = 128;

// let frameX = 0; removed now animationStates is working
// let frameY = 0; removed now animationStates is working
let gameframe = 0;
const staggerFrames = 4.5; // lower number is faster controls animationLoop speed

// trying to achieve an array like this for a map of the xy crop frames of each animation set
// spriteAnimations = [
//     "idle" = {
//         location: [
//             { x: 0 y: 0 },
//             { x: 288, y: 0 },
//             { x: 288*2, y: 0 },
//             { x: 288*3, y: 0 }
//             //etc per line of frames
//         ]
//     },

//     "jump" = {
//         location: [
//             { x: 0 y: 128 },
//             { x: 288, y: 128 },
//             { x: 288*2, y: 128 },
//             { x: 288*3, y: 128 }
//             //etc
//         ]
//     }
// ];

const spriteAnimations = []; // array for sprites line frames(columns) and rows

const animationStates = [
  // simple map for the sprite sheet
  {
    name: "idle",
    frames: 12,
  },

  {
    name: "run",
    frames: 10,
  },

  {
    name: "jumpUp",
    frames: 22,
  },

  {
    name: "jumpUpLoop",
    frames: 3,
  },

  {
    name: "jumpDown",
    frames: 22,
  },

  {
    name: "jumpDownLoop",
    frames: 3,
  },

  {
    name: "jumpAtk",
    frames: 22,
  },

  {
    name: "jumpAtkAction",
    frames: 10,
  },

  {
    name: "roll",
    frames: 8,
  },

  {
    name: "slide",
    frames: 13,
  },

  {
    name: "arrowStab",
    frames: 10,
  },

  {
    name: "shoot",
    frames: 15,
  },

  {
    name: "shootUpMany",
    frames: 12,
  },

  {
    name: "shootPower",
    frames: 17,
  },

  {
    name: "blockRoot",
    frames: 19,
  },

  {
    name: "takeHit",
    frames: 6,
  },

  {
    name: "death",
    frames: 19,
  },
];

animationStates.forEach((state, index) => {
  let frames = {
    /// setting let frames to an object {} this should be the number of animation frames in the row
    location: [],
  };
  for (let j = 0; j < state.frames; j++) {
    // put the index of the animate state into array
    let positionX = j * spriteWidth; // for each for loop adding the 288 to the next array item - this is calculating the x's for the crop
    let positionY = index * spriteHeight; // for each index (the state) multiplying the height 128 for the row - this is calculating the y's for the crop
    frames.location.push({ x: positionX, y: positionY }); // the push method inserts the for loop variable calculations and pushes them in a litte co-ord object {} into the location array
  }
  spriteAnimations[state.name] = frames; //this is creating a new key value in the blank array (up top) to look like the sprite animations structure as designed
});

console.log(spriteAnimations); //! this tests the result
// console log result
// [idle: {…}, run: {…}]
// idle:
// location: Array(12)
// 0 : {x: 0, y: 0}
// 1 : {x: 288, y: 0}
// 2 : {x: 576, y: 0}
// 3 : {x: 864, y: 0}
// 4 : {x: 1152, y: 0}
// 5 : {x: 1440, y: 0}
// 6 : {x: 1728, y: 0}
// 7 : {x: 2016, y: 0}
// 8 : {x: 2304, y: 0}
// 9 : {x: 2592, y: 0}
// 10 : {x: 2880, y: 0}
// 11 : {x: 3168, y: 0}
// length : 12
//
// run :
// location : Array(10)
// 0 : {x: 0, y: 128}
// 1 : {x: 288, y: 128}
// 2 : {x: 576, y: 128}
// 3 : {x: 864, y: 128}
// 4 : {x: 1152, y: 128}
// 5 : {x: 1440, y: 128}
// 6 : {x: 1728, y: 128}
// 7 : {x: 2016, y: 128}
// 8 : {x: 2304, y: 128}
// 9 : {x: 2592, y: 128}
// length:  10
//! notice the calculated x and y postions. spriteAnimations ARRAY[], which was empty, has a 'state' name OBJECT{}, and location ARRAY[] containing little xy OBJECTS{}
//! The animationStates.forEach method did this, from the animationStates ARRAY [] map with the name and frames defined in it above in the let vars. - setting the rest of the states in this array will then calculate all the animation frame sets as they are defined in the let ARRAY

// ------------------ Animation Canvas Loop ------------------ //

function animationLoop() {
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(0, 0, 288, 128);
  let position =
    Math.floor(gameframe / staggerFrames) %
    spriteAnimations[playerAnimState].location.length; //gameframe position - only integers and modulous to make end frame 1?  https://youtu.be/GFO_txvwK_c?t=1443
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerAnimState].location[position].y;
  // ctx.drawImage(imagesrc,dx,dy, dw , dh ); // 5 arg drawImage is used to draw images
  // ctx.drawImage(imagesrc,sx,sy, sw , sh ,dx,dy, dw , dh ); // 9 arg drawImage is used to position (d Destination/Draw) and cut/crop with the (s Source) images - sx sy for frame position

  if (charDirection === "left") { // this looks at the direction boolean control and will horizontal flip the direction of the draw using: .save .translate .scale and .restore methods
    ctx.save();
    ctx.translate(spriteWidth, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(
      charImage,
      frameX,
      frameY,
      spriteWidth,
      spriteHeight,
      0,
      0,
      spriteWidth,
      spriteHeight
    );
    ctx.restore();
  } else {
    ctx.drawImage(
      charImage,
      frameX,
      frameY,
      spriteWidth,
      spriteHeight,
      0,
      0,
      spriteWidth,
      spriteHeight
    );
  }

  //ctx.strokeRect(0,0, 288 , 128);
  // if (gameframe % staggerFrames == 0) { // inserts gameframes - primative way
  // if (frameX < 11) frameX++; // animates the sprite frame if (up to end frame) incrments by one
  // else frameX = 0;} // reset to 0 at end of frames
  gameframe++; // inserts gameframes
  requestAnimationFrame(animationLoop);
}

animationLoop();

// idle
// run
// jump
// j_up
// j_down
// air_atk_sample4
// air_atk
// roll
// slide
// slide_loop
// 1_atkg
// 2_atkv
// 2_atk_entangle_arrow_sample
// 2_atk_poison_arrow_sample
// 3_atk
// 3_atk_sample_ref
// sp_atk
// defend
// take_hit
// death
