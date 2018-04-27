function Target(x, y){
	this.x = x;
	this.y = y;
	var gap = 0.4;
	this.show = function(){
		context.fillStyle = "red";
        context.fillRect(this.x, this.y, elemSize - gap , elemSize - gap);
	}

	this.collideTarget = function(puckX, puckY){
		let eps = puck.size / 2;
		this.targetVector = {x: 0, y: 0};
		//right
		if (puckX < (this.x + elemSize + eps) && puckX > (this.x + elemSize) &&
			puckY > this.y && puckY < (this.y + elemSize)){
			this.targetVector = {x:1, y:0};
		}
		//bottom
		if (puckX > this.x && puckX < (this.x + elemSize) &&
			puckY > (this.y + elemSize) && puckY < (this.y + elemSize + eps)){
			this.targetVector = {x: 0, y: 1};
		}
		//left
		if (puckX > (this.x - eps) && puckX < this.x &&
			puckY < (this.y + elemSize) && puckY > this.y){
			this.targetVector = {x: -1, y: 0};
		}	
		//top
		if (puckX > (this.x) && puckX < (this.x + elemSize) &&
			puckY > (this.y - eps) && puckY < this.y){
			this.targetVector = {x:0, y: -1};
		}
		return this.targetVector;	

	}
}