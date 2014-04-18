'use strict';

var canvas = document.getElementById('avatar');
var context = canvas.getContext('2d');
var size = canvas.height = canvas.width;
var numberOfBlocks = 10;

var Colors = {
	grey: '#e5e5e5',
	green: '#75cd66',
	highlight: '#adc3a9'
};

var blockSize = size / numberOfBlocks;

function drawRect (x, y, color) {
	context.fillStyle = color;
	context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function Avatar (numberOfBlocks) {
	this.init(numberOfBlocks);
}

Avatar.prototype.init = function (numberOfBlocks) {
	this.width = this.height = numberOfBlocks;
	this.blocks = new Array(numberOfBlocks);
	for(var x = 0; x < numberOfBlocks; x++) {
		this.blocks[x] = new Array(numberOfBlocks);
		for(var y = 0; y < numberOfBlocks; y++) {
			this.blocks[x][y] = false;
		}
	}
};

Avatar.prototype.coordsModifier = function (x, y) {
	return [
		{ x: x, y: y },
		{ x: this.width - 1 - x, y: y}
	];
};

Avatar.prototype.set = function (x, y) {
	var value = !this.blocks[x][y];
	var blocks = this.blocks;

	this.coordsModifier(x, y).forEach(function(coords) {
		blocks[coords.x][coords.y] = value;
	});
};

Avatar.prototype.get = function (x, y) {
	return this.blocks[x][y];
};

var avatar = new Avatar(numberOfBlocks);

for (var x = 0; x < avatar.width; x++) {
	for(var y = 0; y < avatar.height; y++) {
		if(Math.random() > 0.9) {
			avatar.set(x, y);
		}
	}
}

function render (avatar) {
	context.fillStyle = Colors.grey;
	context.fillRect(0, 0, size, size);
	for (var x = 0; x < avatar.width; x++) {
		for(var y = 0; y < avatar.height; y++) {
			if(avatar.get(x,y)) {
				drawRect(x, y, Colors.green);
			}
		}
	}

	var gradient = context.createLinearGradient(0,0,0,size);
	gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2');
	gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0');
	context.fillStyle = gradient;
	context.fillRect(0, 0, size, size);
}

render(avatar);

function getPosition (event) {
	var x = event.offsetX;
	var y = event.offsetY;

	x = Math.floor(x / blockSize);
	y = Math.floor(y / blockSize);

	avatar.set(x, y);
	render(avatar);
}

canvas.addEventListener('mousedown', getPosition, false);

function previewBlock (event) {
	var x = event.offsetX;
	var y = event.offsetY;

	x = Math.floor(x / blockSize);
	y = Math.floor(y / blockSize);

	render(avatar);

	avatar.coordsModifier(x, y).forEach(function(coords) {
		drawRect(coords.x, coords.y, Colors.highlight);
	});
}

canvas.addEventListener('mousemove', previewBlock, false);

function clearPreview () {
	render(avatar);
}

canvas.addEventListener('mouseout', clearPreview, false);