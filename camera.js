// https://www.scratchapixel.com/lessons/3d-basic-rendering/computing-pixel-coordinates-of-3d-point/mathematics-computing-2d-coordinates-of-3d-points?url=3d-basic-rendering/computing-pixel-coordinates-of-3d-point/mathematics-computing-2d-coordinates-of-3d-points


// Camera

class Camera {
	// A camera has a CoordinateSystem, a distance to the image plane,
	// the image plane's width and height, and a list of items to shoot.
	// By convention the camera is located at its CoordinateSystem's origin and
	// looks in the -z direction.
	// The image plane is centered on point (0, 0, -imagePlaneDistance).
	constructor(system, imagePlaneWidth, imagePlaneHeight, imagePlaneDistance) {
		this.system = system;
		this.imagePlaneWidth = imagePlaneWidth;
		this.imagePlaneHeight = imagePlaneHeight;
		this.imagePlaneDistance = imagePlaneDistance;
	}

	// Take a wireframe image and output it on the given canvas context.
	snapWireframePicture(items, ctx) {
		// NOTE: Since the image is wireframe and everything is one color,
		// the image will look the same no matter which order we draw the Items
		// in. This would not be true if the items were shaded in (could block
		// each other) or were different colors. One way to continue this
		// process in the future would be adjusting this function to take
		// pictures when order matters.

		const origin = new Coordinate(0, 0, 0, this.system);

		for (let i = 0; i < items.length; i++) {
			// get the part of the Item that's in front of the camera
			let pictureItem = items[i].copyIntoCoordinateSystem(this.system);

			// map the Item onto the image plane
			pictureItem.projectOntoPlane(-imagePlaneDistance, origin);

			// map the Item's Coordinates into 2D coordinates on the canvas...
			// In the CoordinateSystem, the image plane extends from
			// top left: (x, y) = (-imagePlaneWidth/2, imagePlaneHeight/2)
			// to
			// bottom right: (x, y) = (imagePlaneWidth/2, -imagePlaneHeight/2)
			// We must map this onto the canvas, which extends from
			// top left: (x, y) = (0, 0)
			// to
			// bottom right: (x, y) = (ctx.canvas.width, ctx.canvas.height);
			const canvasCoordinates = pictureItem.vertices.map(c =>
				[(c.x + this.imagePlaneWidth/2) * (ctx.canvas.width/this.imagePlaneWidth),
				(c.y - this.imagePlaneHeight/2) * (-ctx.canvas.height/this.imagePlaneHeight)]
			);

			// for each vertex, draw line segment to its neighbors
			// note this draws each line segment twice (one for each vertex)
			let neighbors = [];
			for (let j = 0; j < canvasCoordinates.length; j++) {
				neighborIndexes = pictureItem.getAdjacentVertexIndexes(j);
				for (const k in neighborIndexes) {
					ctx.moveTo(canvasCoordinates[j][0], canvasCoordinates[j][1]);
					ctx.lineTo(canvasCoordinates[k][0], canvasCoordinates[k][1]);
				}
			}
			ctx.stroke();
		}
	}
}
