/** @type {HTMLCanvasElement} */
//tutorial https://youtu.be/GFO_txvwK_c?t=6740 
//entity images https://pop-shop-packs.itch.io/birds-2d-pixel-character-asset-pack

const canvas = document.getElementById('third1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 928;
CANVAS_HEIGHT = canvas.height = 793;

let numberOfEntities = 150;
const entityArray = [];

let gameFrame = 0;

let xMathAngle = 270;
let xMathMeth = true;

let yMathAngle = 360;
let yMathMeth = true;

let busySpeed = 2;

// // TODO: connect checkbox for xMethod
xCheckbox = document.getElementById("xMathType");
xSinCos.innerHTML = 'Cos';
xCheckbox.addEventListener("change", (e) => {
    xMathMeth = e.target.checked;
    if (xMathMeth == true) {xSinCos.innerHTML ='Cos'} else {xSinCos.innerHTML ='Sin'};
});

// // TODO: connect checkbox for yMethod
yCheckbox = document.getElementById("yMathType");
ySinCos.innerHTML = 'Sin';
yCheckbox.addEventListener("change", (e) => {
    yMathMeth = e.target.checked;
    if (yMathMeth == true) {ySinCos.innerHTML ='Cos'} else {ySinCos.innerHTML ='Sin'};
});

// // TODO: X Angle Slider
const xASlider = document.getElementById('xASlider');
xASlider.value = xMathAngle;
const showXAngle = document.getElementById('showXAngle');
showXAngle.innerHTML = xMathAngle;

xASlider.addEventListener('change', function (e) {
xMathAngle = e.target.value;
showXAngle.innerHTML = e.target.value;

});

// // TODO: Angle Slider
const yASlider = document.getElementById('yASlider');
yASlider.value = yMathAngle;
const showYAngle = document.getElementById('showYAngle');
showYAngle.innerHTML = yMathAngle;

yASlider.addEventListener('change', function (e) {
yMathAngle = e.target.value;
showYAngle.innerHTML = e.target.value;
});

// // TODO: Slider for Speed
const moveSlider = document.getElementById('speedSlider');
moveSlider.value = busySpeed;
const showMove = document.getElementById('move-speed');
showMove.innerHTML = busySpeed;

moveSlider.addEventListener('change', function (e) {
busySpeed = e.target.value;
showMove.innerHTML = e.target.value;
});



class Entity { 
    constructor(){
        this.image = new Image();
        this.image.src = 'images/fly.png';
        this.speed = Math.random() * 3 + 1 ;
        this.spriteWidth = 34;
        this.spriteHeight = 33;
        this.imageScale = Math.random() * 0.7 + 0.4; //* use this number to scale size   
        this.width = this.spriteWidth * this.imageScale ; 
        this.height = this.spriteHeight * this.imageScale ;
        this.x = Math.random() * (canvas.width - this.width); // this keeps them spawning within the canvas area and the brackets need to be there to work
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 2.4 + 1.3);
        this.angle = Math.random() * 2 ;
        this.angleSpeed = Math.random() * 0.5 + 0.1; //modifies the magnitude (wave shape) of the sin randomly
        this.rise = Math.random() * 300 + 50; // using random puts a random value into each new enitity. this gives a small rise in y value (up)
    }
    update(){
        if (xMathMeth == true) {
        this.x = this.rise * Math.cos(this.angle * Math.PI/xMathAngle) + (canvas.width*0.5 - this.width*0.5)}
        else {this.x = this.rise * Math.sin(this.angle * Math.PI/xMathAngle) + (canvas.width*0.5 - this.width*0.5)};
        
        if (yMathMeth == true) {
        this.y = this.rise * Math.sin(this.angle * Math.PI/yMathAngle) + (canvas.height*0.5 - this.height*0.5) }
        else {this.y = this.rise * Math.cos(this.angle * Math.PI/yMathAngle) + (canvas.height*0.5 - this.height*0.5)};

        this.angle += this.angleSpeed * busySpeed ; // Gives the entities a different random sin magnitude (wave shape) 
        if (this.x + this.width < 0) this.x = canvas.width;
        if(gameFrame % this.flapSpeed === 0 ){ 
            this.frame >= 2 ? this.frame = 0 : this.frame++;
        }

    }
    draw(){ 
        ctx.drawImage(this.image, this.frame*this.spriteWidth , 0 , this.spriteWidth , this.spriteHeight , this.x,this.y,this.width,this.height); 
        
    } 

}

for (let i=0 ; i < numberOfEntities ; i++ ) {
    entityArray.push(new Entity());
}

function animationLoop() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    entityArray.forEach(entity => { 
        entity.draw();
        entity.update();
    });
    gameFrame++;
    requestAnimationFrame(animationLoop);
}

animationLoop();