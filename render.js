// Draw graphics to the canvas.

function draw() {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	let mainSystem = new CoordinateSystem(0, 0, 0, new Coordinate(0, 0, 0));

	let cameraSystem = new CoordinateSystem(0, 0, 0, new Coordinate(0, 0, 10));

	let camera = new Camera(cameraSystem, 100, 100, 5);

	let line = new LineSegment(new Coordinate(0, 0, 5), new Coordinate(2, 2, -5));

	camera.snapWireframePicture([line], ctx);

	// ctx.font = "18px Arial";
	// ctx.fillText("The canvas is on!", 30, 30);
}
