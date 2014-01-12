'use strict';

var Screen = {
	width: function() { return window.innerWidth; },
	height: function() { return window.innerHeight; }
};


var canvas = document.getElementById('matrix');
var context = canvas.getContext('2d');

var resizeCanvas = function() {
	canvas.width = Screen.width();
	canvas.height = Screen.height();
};

var render = function() {
	var colors = [
		'#282828',
		'#909090',
		'#EAEAEA'
	];

	var blockSize = Screen.width() / 3;
	var xSteps = Screen.width() / blockSize;
	var ySteps = Screen.height() / blockSize;

	for(var x = 0; x < xSteps; x++) {
		for (var y = 0; y < ySteps; y++) {
			context.fillStyle = colors[(x + y) % colors.length];
			context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
		}
	}
};

window.onload = window.onresize = function() {
	resizeCanvas();
	render();
};

setInterval(render, 33);

var AnimationLoop = {
	

	run: function() {
		
	}
}
