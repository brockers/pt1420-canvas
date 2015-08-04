var canvas = document.getElementById("board");
var drawing = canvas.getContext("2d");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;

// This is our ball
var pos = {x: 10, y: 10, vx: 10, vy: 10, sx: 10, sy: 10};
// This is our paddle
var pad = {
	sx: 20, 
	sy: ( canvas.height / 4.5 ),
	x: ( canvas.width * 0.85 ), 
	y: ( canvas.height / 2)
};
var interval;
var dist = canvas.height / 5;

drawing.fillRect(pos.x, pos.y, pos.sx, pos.sy);

function loop(){
	drawing.clearRect(0,0,canvas.width, canvas.height);
	
	// Adjust our postion by velocity of x
	pos.x = pos.x + pos.vx;
	pos.y = pos.y + pos.vy;
	
	// Change direction if it hits our paddle
	if((pos.x + pos.sx) > pad.x && (pos.y + pos.sy) > pad.y){
		if(pos.x < (pad.x + pad.sx) && pos.y < (pad.y + pad.sy)){
			// alert("pos x y " + pos.x + " " + pos.y + " pad x y" + pad.x + " " + pad.y);
			pos.vx = pos.vx * -1; 
		}
	}
	
	// Change direction if it hits a wall
	if(pos.x >= (canvas.width - 20)){ pos.vx = pos.vx * -1; }
	if(pos.y >= (canvas.height - 20)){ pos.vy = pos.vy * -1; }
	if(pos.x <= 0){ pos.vx = pos.vx * -1; }
	if(pos.y <= 0){ pos.vy = pos.vy * -1; }
	
	// Draw paddle
	drawing.fillRect(pad.x, pad.y, pad.sx, pad.sy);
	// Draw ball
	drawing.fillRect(pos.x, pos.y, pos.sx, pos.sy);
}

document.onkeydown = function(e){
	if(e.keyCode == 38){
		if(pad.y <= 0) {
			return false;
		}
		pad.y = pad.y - dist;
		return false;
	} else if (e.keyCode == 40){
		if((pad.y + pad.sy) >= canvas.height){
			return false;
		}
		pad.y = pad.y + dist;
		return false;
	}
}

interval = setInterval(loop, 15);
