const canvas = document.getElementById('Slider');
const context = canvas.getContext('2d');
const cw = canvas.width;
const ch = canvas.height;
const scl = 15;

context.fillStyle = '#000';
context.fillRect(0, 0, cw, ch);   
context.scale(scl, scl);

var numberOfElemsX = 10;
var numberOfElemsY = 4;
var elemSize = cw/scl/numberOfElemsX;
// The puck object should be declared as const or var???
const puck = {
    pos: {x: 19.0, y: 25.0},//ch/scl-4},
    vel: {x: 0.05, y: -0.3},
    size: 0.5,
    color: "white",
    }

const slider = {
    //pos: {x: cw/scl/2-3, y: ch/scl-1},
    pos: {x: 15, y: ch/scl-1},
    vel: {x: 0, y: 0},
    len: 8,
    color: "orange",
    }

var targets = [];

function createTargets(){
    for (let y = 0; y < numberOfElemsY; y++){
        targets[y] = new Array(numberOfElemsX); 
        for (let x = 0; x < targets[y].length; x++){
            targets[y][x] = new Target(x * elemSize, y * elemSize); 
        }
    }
}

function collideSlider() {
    if ((puck.pos.x >= slider.pos.x - 0.1*puck.size && puck.pos.x <= slider.pos.x + slider.len + 0.1*puck.size )
        && (puck.pos.y > slider.pos.y - puck.size)){
        return true;            
    }
    return false;
}

function collideWall(){
    let eps = puck.size;
    wallNormal = {x: 0, y: 0};
    if (puck.pos.x < eps){
            wallNormal = {x: 1, y: 0};
    }
    else if (puck.pos.x > cw/scl - eps){
            wallNormal = {x: -1, y: 0};          
    }
    else if (puck.pos.y < eps){
            wallNormal = {x: 0, y: 1};        
    }        
    else if (puck.pos.y > ch/scl - eps){
            wallNormal = {x: 0, y: -1};
    }
    return wallNormal;
}

function draw(){
    context.fillStyle = '#000';
    context.fillRect(0, 0, cw, ch);
    drawPuck();
    drawSlider();
    drawTargets();
}

function drawPuck(){
    context.fillStyle = puck.color;
    context.beginPath();
    context.ellipse(puck.pos.x, puck.pos.y, puck.size, puck.size, 0, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

function drawSlider(){
        context.fillStyle = "green";
        context.fillRect(slider.pos.x, slider.pos.y, slider.len, ch/scl);
        context.fillStyle = slider.color;
        context.fillRect(slider.pos.x + 0.1, slider.pos.y + 0.1, slider.len - 0.2, 0.8);
}

function drawTargets(){
    for (let y = 0; y < targets.length; y++){
        for (let x = 0; x < targets[y].length; x++){
            targets[y][x].show();
        }
    }
}

function gameOver(){
    draw();
    gamePlay = false;
    document.getElementById('score').innerText = "Game Over!";
}

function reflectionVector(normVector){
    // r = i - 2(d*n)n
    // Incydent vector is the puck velocity vector
    let dotProduct = puck.vel.x * normVector.x + puck.vel.y * normVector.y;
    refVector = {x: puck.vel.x - 2 * dotProduct * normVector.x, 
                    y: puck.vel.y - 2*dotProduct*normVector.y};
    return refVector;
}

var counter = {value: 0, interval: 0.1};
var score = 0;

function update(){
    counter.value++;

    if (counter.value > counter.interval){ 
        wallVector = collideWall();
        puck.vel = reflectionVector(wallVector);

        if (collideSlider()){
            let friction = 0.2;
            let elasticity = 0.95;
            puck.vel.x += slider.vel.x * friction;     
            puck.vel.y = -elasticity * puck.vel.y; 
        }

        for (let y = 0; y < targets.length; y++){
            for (let x = 0; x < targets[y].length; x++){
                targetVector = targets[y][x].collideTarget(puck.pos.x, puck.pos.y)
                if (targetVector.x != 0 || targetVector.y != 0){
                    targets[y].splice(x, 1);
                    score++;
                    puck.vel = reflectionVector(targetVector);
                }
            }                     
        }

        if (wallVector.x == 0 && wallVector.y == -1){
                gameOver();
        }

        slider.pos.x += slider.vel.x;              
        if (slider.pos.x <= 0){
            slider.vel.x = 0;             
            slider.pos.x = 0;
        }

        if (slider.pos.x >= cw/scl - slider.len){
            slider.vel.x = 0;            
            slider.pos.x = cw/scl - slider.len;
        }
               
        puck.pos.x += puck.vel.x;
        puck.pos.y += puck.vel.y;
        whatKey(); 
        slider.pos.x += slider.vel.x;   
        draw();
        
        if (gamePlay){
            requestAnimationFrame(update);
            updateScore();        
        }
    counter.value = 0; 
    }
}

function updateScore(){
    document.getElementById('score').innerText = score;
    if (targets[0].length === 0){
        document.getElementById('score').innerText = "You won the game!";
        gamePlay = false;
    }
}

var keys = [];

function whatKey() {
    if (keys[37]) {
        slider.vel.x = -0.4;
    }
    if (keys[39]) {
     slider.vel.x = 0.4;
    }
    else if (keys[37] == false && keys[39] == false){
        slider.vel.x = 0;
    }
}

window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

var gamePlay = true;
createTargets();
update();

