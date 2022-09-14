/** @type {HTMLCanvasElement} */
//tutorial https://www.youtube.com/watch?v=GFO_txvwK_c&t=5133s
//entity images https://pop-shop-packs.itch.io/birds-2d-pixel-character-asset-pack

const canvas = document.getElementById('third1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width = 928;
CANVAS_HEIGHT = canvas.height = 793;

// entity1 = { // curly braces make this name an object
//     x: 0,
//     y: 0,
//     width: 64,
//     height: 64,
// } 
//! Now turn this object into a 'factory' which is a class, which can make multiples when we call it based on the blueprint we give it

const numberOfEntities = 20;
const entityArray = [];

class Entity { // classes are new version of older 'prototypes' which do the same thing.
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 64;
        this.height = 64;
        this.speed = Math.random() * 4 - 2; //add a new parameter 
                //? Math.random() * 4 - 2; this is a format to do a random number between -2 and +2
                //? [Math.random() * 4] this part creats a number between 0-4
                //? [- 2] this part defines where to start from. -2 + [0-4 rand] // = [-2 rand +2] 
    }
    update(){ // this is creating a method that can be used and is shared by the created objects (new) going to use this for movement in animation loop
        // this.x++; // replace this to add speed
        // this.y++;
        this.x += this.speed; // using += https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment
        this.y += this.speed;
    }
    draw(){ //taking what we would draw int he animation loop anf d putting it in here as a method too
        ctx.fillRect(this.x, this.y, this.width , this.height);
    } 
}

// const entity1 = new Entity(); // instead of creating one entity use a for loop to create many
for (let i=0 ; i < numberOfEntities ; i++ ) {
    //! .push new Class object into an ARRAY[] here
    entityArray.push(new Entity());
}


// console.log(entityArray); //*Good

function animationLoop() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    // entity1.update(); ///here we're calling the method we made in the class
    // entity1.draw();
    //ctx.fillRect(entity1.x, entity1.y, entity1.width , entity1.height); //entity1.parameter gets the value from the defined object above
    //? how to call the methods (update() and draw()) into this animation loop, so they animate?
    //! use the forEach method on the array with a function (use the arrow funtion =>)
    entityArray.forEach(entity => { //* make a function here called entitiy that does the methods
        entity.draw();
        entity.update();
    });
    requestAnimationFrame(animationLoop);
}

animationLoop();
