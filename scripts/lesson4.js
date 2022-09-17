/** @type {HTMLCanvasElement} */
//* https://www.youtube.com/watch?v=GFO_txvwK_c&t=8011s
//* separating axis theorem - comares x and y co-ordinates and width and heigth

//TODO Add demo
const canvas = document.getElementById("third1");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 928;
CANVAS_HEIGHT = canvas.height = 793;

//TODO Add input for change of shape type
let shapeState = "square"; // page control action

const dropdown = document.getElementById("shape");
dropdown.addEventListener("change", function (event) {
  shapeState = event.target.value;
});

//TODO Add mousemove entity
//https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
let mx = canvas.addEventListener("mousemove", (e) => {
  mx = e.offsetX;
});
let my = canvas.addEventListener("mousemove", (e) => {
  my = e.offsetY;
});

//TODO Make dynamic as per shape

let rect1 = {
  x: CANVAS_WIDTH * 0.5 - 50,
  y: CANVAS_HEIGHT * 0.5 - 50,
  width: 100,
  height: 100,
};

let rect2 = { x: 0, y: 0, width: 100, height: 100 };

// using my and mx from mouse move dont seem to be active in here when used in the screenCollideMsg function and the animation loop.
// Had to put the my and my directly in the screenCollideMsg function for it to work

// //---------basic logic using ANDs---------//
// if (
// rect1.x < rect2.x + rect2.width && // is the top left of rect1 less than (to the left of) the top right corner of rect2 (rect2.x + rect2.width) AND (AND's check if all at the same time)
// rect1.x + rect1.width > rect2.x && // is the top right of rect1 (rect1.x + rect1.width) greater than (to the right of) the top left corner of rect2  AND
// // now do the same for height (y)
// rect1.y < rect2.y + rect2.height &&
// rect1.y + rect1.height > rect2.y
// ) {
//     //collision detected
// } else {
//     //no collision
// }

//---------optimal logic using ORs---------//
// it just checks and triggers if there is a cross over of areas

//TODO wrap the if() logic in a function and put it in the canvas
function screenCollideMsg() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (
    rect1.x > mx - 50 + rect2.width || // swap < to >, OR || (OR's check if any at the same time)
    rect1.x + rect1.width < mx - 50 || // swap > to <
    // now do the same for height (y)
    rect1.y > my - 50 + rect2.height || // swap < to >
    rect1.y + rect1.height < my - 50 // swap > to <
  ) {
    ctx.fillStyle = "red";
    ctx.font = "50px VT323";
    ctx.textAlign = "center";
    ctx.fillText("NO COLLISION", CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.9);
  } else {
    ctx.fillStyle = "green";
    ctx.font = "50px VT323";
    ctx.textAlign = "center";
    ctx.fillText("COLLISION DETECTED", CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.9);
    ctx.fillStyle = "green";
    ctx.fillRect(rect1.x, rect1.y, rect1.width, rect1.height);
    ctx.fillStyle = "red";
    ctx.fillRect(mx - 50, my - 50, 100, 100);
  }

  ctx.strokeRect(rect1.x, rect1.y, rect1.width, rect1.height);
  ctx.strokeRect(mx - 50, my - 50, 100, 100);
}

const circle1 = {
  x: CANVAS_WIDTH * 0.5,
  y: CANVAS_HEIGHT * 0.5,
  radius: 100,
};

const circle2 = {
  x: 0,
  y: 0,
  radius: 50,
};

function circleCollision() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  let dx = mx - circle1.x;
  let dy = my - circle1.y;
  // Pythag hyp
  let dh = Math.sqrt(dx * dx + dy * dy);
  // Pythag leg a
  let da = Math.sqrt(dh * dh - dy * dy);
  // Pythag leg b
  let db = Math.sqrt(dh * dh - dy * dy);
  // https://www.nagwa.com/en/explainers/643184150689/
  let sumOfRadii = circle1.radius + circle2.radius;

  if (dh >= sumOfRadii) {
    // no collison
    ctx.fillStyle = "red";
    ctx.font = "50px VT323";
    ctx.textAlign = "center";
    ctx.fillText("NO COLLISION", CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.9);
  } else if (dh < sumOfRadii) {
    // collison
    ctx.fillStyle = "green";
    ctx.font = "50px VT323";
    ctx.textAlign = "center";
    ctx.fillText("COLLISION DETECTED", CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.9);
    ctx.beginPath();
    ctx.arc(circle1.x, circle1.y, circle1.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(mx, my, circle2.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // draw static circle1
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.arc(circle1.x, circle1.y, circle1.radius, 0, 2 * Math.PI);
  ctx.stroke();
  // draw mouse move circle2
  ctx.beginPath();
  ctx.arc(mx, my, circle2.radius, 0, 2 * Math.PI);
  ctx.stroke();
  //draw line dh

  ctx.strokeStyle = "purple";
  ctx.beginPath();
  ctx.moveTo(circle1.x, circle1.y);
  ctx.lineTo(mx, my);
  ctx.stroke();

  ctx.strokeStyle = "lightblue";
  ctx.beginPath();
  ctx.moveTo(circle1.x, circle1.y);
  ctx.lineTo(mx, circle1.y);
  ctx.stroke();
  ctx.fillStyle = "lightblue";
  ctx.font = "15px VT323";
  ctx.textAlign = "center";
  ctx.fillText("A", (circle1.x + mx) * 0.5, circle1.y - 5);

  ctx.strokeStyle = "lightgreen";
  ctx.beginPath();
  ctx.moveTo(mx, my);
  ctx.lineTo(mx, circle1.y);
  ctx.stroke();
  ctx.fillStyle = "lightgreen";
  ctx.font = "15px VT323";
  ctx.textAlign = "center";
  ctx.fillText("B", mx + 5, (circle1.y + my) * 0.5);
}

function animationLoop() {
  if (shapeState === "circle") {
    circleCollision();
  } else {
    screenCollideMsg();
  }
  requestAnimationFrame(animationLoop);
}

animationLoop();
