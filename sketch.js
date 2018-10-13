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

function distance(d1, d2) {
	return p5.Vector.dist(d1, d2);
}


function setup() {
	noCanvas();
	vectors = processData();
	console.log(vectors);
	pos = createVector(random(255), random(255), random(255));
	
	findNearest(pos);
	frameRate(3);
	// console.log('Hey Color vectors');
	// console.log(data)
}

function draw() {

	let colorName = findNearest(pos);
	createDiv(colorName);
	let r = p5.Vector.random3D();
	r.mult(60);
	pos.add(r);


}