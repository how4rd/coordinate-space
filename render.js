// Demo: draw graphics to the canvas.

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const TRANSLATION_AMOUNT = 2;  // how many units to translate by in each step
const ROTATION_AMOUNT = Math.PI/90;  // how many radians to rotate by in each step

let mainSystem = new CoordinateSystem(0, 0, 0, new Coordinate(0, 0, 0));
let cameraSystem = new CoordinateSystem(0, 0, 0, new Coordinate(0, 0, 20));

let camera = new Camera(cameraSystem, 100, 100, 5);

// create XY gridlines
let items = [];
for (let i = 0; i < 11; i++) {
	// horizontal gridline
	items.push(new LineSegment(new Coordinate(-50 + 10*i, 50, 0), new Coordinate(-50 + 10*i, -50, 0)));
	// vertical gridline
	items.push(new LineSegment(new Coordinate(50, -50 + 10*i, 0), new Coordinate(-50, -50 + 10*i, 0)));
}

let pressedKeys = {
	w: false,
	a: false,
	s: false,
	d: false,
	e: false,
	z: false,
	j: false,
	k: false,
	l: false,
	u: false,
	i: false,
	o: false
};

draw();

document.addEventListener('keydown', e => {
	if (pressedKeys[e.key] !== undefined) {
		pressedKeys[e.key] = true;
	}
	draw();
});

document.addEventListener('keyup', e => {
	if (pressedKeys[e.key] !== undefined) {
		pressedKeys[e.key] = false;
	}
});

function draw(e) {
	// translate the camera based on keyboard input

	let deltaX = 0;
	let deltaY = 0;
	let deltaZ = 0;
	let deltaXRot = 0;
	let deltaYRot = 0;
	let deltaZRot = 0;

	// If d key (right movement) is pressed, should move the camera left
	// so the world appears to move right in the canvas. The same idea applies
	// to the other directions.
	if (pressedKeys.d) {
		deltaX -= TRANSLATION_AMOUNT;
	}

	if (pressedKeys.a) {
		deltaX += TRANSLATION_AMOUNT;
	}

	if (pressedKeys.w) {
		deltaY -= TRANSLATION_AMOUNT;
	}

	if (pressedKeys.s) {
		deltaY += TRANSLATION_AMOUNT;
	}

	if (pressedKeys.e) {
		deltaZ -= TRANSLATION_AMOUNT;
	}

	if (pressedKeys.z) {
		deltaZ += TRANSLATION_AMOUNT;
	}

	if (pressedKeys.j) {
		deltaXRot += ROTATION_AMOUNT;
	}

	if (pressedKeys.k) {
		deltaYRot += ROTATION_AMOUNT;
	}

	if (pressedKeys.l) {
		deltaZRot += ROTATION_AMOUNT;
	}

	if (pressedKeys.u) {
		deltaXRot -= ROTATION_AMOUNT;
	}

	if (pressedKeys.i) {
		deltaYRot -= ROTATION_AMOUNT;
	}

	if (pressedKeys.o) {
		deltaZRot -= ROTATION_AMOUNT;
	}

	cameraSystem.origin.translate(deltaX, deltaY, deltaZ);
	cameraSystem.rotateZ(deltaZRot);
	cameraSystem.rotateY(deltaYRot);
	cameraSystem.rotateX(deltaXRot);

	camera.snapWireframePicture(items, ctx);
}
