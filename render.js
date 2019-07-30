// Draw graphics to the canvas.

function draw() {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	ctx.font = "18px Arial";
	ctx.fillText("The canvas is on!", 30, 30);
}
