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

function setup() {
	noCanvas();
	vectors = processData();
	console.log(vectors);
	pos = createVector(random(255), random(255), random(255));
	
	// console.log('Hey Color vectors');
	// console.log(data)
}

function draw() {

}