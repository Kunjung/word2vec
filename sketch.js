let data;
let vectors;
let pos;

function preload() {
	data = loadJSON('xkcd.json');
	
}

function processData() {
	let vectors = {};
	let colors = data.colors;
	for (let i = 0; i < colors.length; i++) {
		let label = colors[i].color;
		let rgb = color(colors[i].hex);
		vectors[label] = createVector(red(rgb), green(rgb), blue(rgb));
	}
	return vectors;
}


function findNearest(v) {
	let keys = Object.keys(vectors);
	
	keys.sort((a, b) => {
		let d1 = distance(v, vectors[a]);
		let d2 = distance(v, vectors[b]);
		return d1 - d2;
	});
	//console.log(keys);
	return keys[0];
}

function findFurthest(v) {
	let keys = Object.keys(vectors);
	
	keys.sort((a, b) => {
		let d1 = distance(v, vectors[a]);
		let d2 = distance(v, vectors[b]);
		return d2 - d1;
	});
	//console.log(keys);
	return keys[0];
}

function distance(d1, d2) {
	return p5.Vector.dist(d1, d2);
}


function setup() {
	noCanvas();
	vectors = processData();
	console.log(vectors);

	// starting position for the walker
	//pos = createVector(random(255), random(255), random(255));
	pos = createVector(0, 255, 20);
	//findNearest(pos);
	frameRate(30);
	// console.log('Hey Color vectors');
	// console.log(data)
}

function draw() {

	// random walk
	let nearestColorName = findNearest(pos);
	let furthestColorName = findFurthest(pos);

	let div = createDiv(nearestColorName);
	let nv = vectors[nearestColorName];
	let fv = vectors[furthestColorName];

	div.style('color', `rgb(${nv.x}, ${nv.y}, ${nv.z})`);

	div.style('background-color', `rgb(${255-nv.x}, ${255-nv.y}, ${255-nv.z})`);
	

	let r = p5.Vector.random3D();
	r.mult(80);
	pos.add(r);
	pos.x = constrain(pos.x, 0, 255);
	pos.y = constrain(pos.x, 0, 255);
	pos.z = constrain(pos.x, 0, 255);




}