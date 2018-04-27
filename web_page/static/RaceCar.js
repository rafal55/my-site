const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

document.getElementById('score').innerText = "Go!";
context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);		
context.scale(20, 20);
const car = [
	[0, 1, 0],
	[1, 1, 1],
	[0, 1, 0],
	[1, 1, 1],
];

const sqr = [
	[1, 1],
	[1, 1],
];
			
var obstacles = [];
function addObstacle() {
	drawMatrix(obstacle.matrix, obstacle.pos, "red");
	var newObstacle = {pos: {x: Math.random()*11 | 0, y: 0}, matrix: obstacle.matrix};
	obstacles.push(newObstacle)
}

function collide(arena, raceCar) {
	const [m, o] = [raceCar.matrix, raceCar.pos];
	for (let y = 0; y < m.length; ++y) {
		for(let x = 0; x < m[y].length; x++){
			if (m[x][y] !== 0 &&
				(arena[y + o.y]) &&
				(arena[y + o.y][x + o.x]) !== 0){
				return true;			
			}
		}
	}
	return false;
}

function createMatrix(w, h) {
	const matrix =[];
	while (h--) {
		matrix.push(new Array(w).fill(0))
	}
	return matrix;
}


function draw(){
	context.fillStyle = '#000';
	context.fillRect(0, 0, canvas.width, canvas.height);

	drawMatrix(raceCar.matrix, raceCar.pos, "green");

	for (let o = 0; o < obstacles.length; ++o){
		drawMatrix(obstacles[o].matrix, obstacles[o].pos, "red");
		}
}

function drawMatrix(matrix, offset, color){
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if(value != 0){
				context.fillStyle = color
				context.fillRect(x + offset.x,
								y + offset.y,
								 1, 1);
			}
		});
	});			

}
function gameOver(){
	play = false;
	document.getElementById('score').innerText = "Game Over!";
}

function merge(arena, obstacles) {
	for (let o = 0; o < obstacles.length; ++o){	
		if (obstacles[o].pos.y < 19) {
			obstacles[o].matrix.forEach((row, y) =>{
				row.forEach((value, x) => {
					if (value !== 0) {
					arena[y + obstacles[o].pos.y][x + obstacles[o].pos.x] = value;
					}
				});
			});
		}
	}
}

let arena = createMatrix(12, 20);

let dropCounter = 0;
let addCounter = 0;
let dropInterval = 500;
let addInterval = 2500;
let lastTime = 0;

function update(time = 0){
	const deltaTime = time - lastTime;
	lastTime = time;

	dropCounter += deltaTime;
	if (dropCounter > dropInterval){
			for (let o = 0; o < obstacles.length; ++o){
			obstacles[o].pos.y++;
				}
		dropCounter = 0;	
	}

	addCounter += deltaTime;	
	if (addCounter > addInterval){
			addObstacle();
		addCounter = 0;	
	}
	if (collide(arena, raceCar) === true){
		obstacles = [];
		raceCar.pos.x = 4;
		raceCar.pos.y = 16;
		gameOver();
	}	
			
	arena = createMatrix(12, 20);
	draw();
	merge(arena, obstacles);
	if (play){
		requestAnimationFrame(update);
	}
}

const raceCar = {
	pos: {x: 4, y: 16},
	matrix: car,
}

const obstacle = {
	pos: {x: Math.random()*11 | 0, y: 0},
	matrix: sqr,
}

document.addEventListener('keydown', event => {
	if (event.keyCode === 37 && raceCar.pos.x > 0 ) {
		raceCar.pos.x--;
	} else if (event.keyCode === 39 && raceCar.pos.x < 9 ) {
		raceCar.pos.x++;
	} else if (event.keyCode === 38 && raceCar.pos.y > 0 ) {
		raceCar.pos.y--;
	} else if (event.keyCode === 40 && raceCar.pos.y < 16) {
		raceCar.pos.y++;
		dropCounter = 0;
	}
});
play = true;
update();



