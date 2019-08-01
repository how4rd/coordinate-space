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

	// Take an image and output it on the given canvas.
	snapWireframePicture(items, canvas) {
		// Since Items are wireframes and are all the same color, the picture
		// will look the same no matter which order we draw the Items.
		// If Items were filled-in or different colors, more work would be
		// required to make sure far away items appear behind closer ones.
		// Implementing that is one way to develop this project in the future.

		// Iterate through each Item...

		///// Helper function: given an Item, output an equivalent Item
		///// representing how the original Item appears on the plane

		///// 1) Find all vertices' positions in the camera's CoordinateSpace.

		///// 2) Use this to figure out where each vertex is projected onto the
		///// image by using PositionVector.findIntersection.

		///// 3) If a vertex is in front of the image plane, then its position
		///// on the canvas is where the light ray from the vertex to the camera
		///// hits the origin.

		///// 4) If a vertex is behind the image plane, then it doesn't appear
		///// on the image plane. However, line segments connected to that
		///// vertex could still appear on the image plane. The solution to this
		///// is to look at its neighbors (the vertices that it is connected to
		///// with lines). If a neighbor is in front of the vertex plane, then
		///// the line between the vertex and its neighbor intersects the image
		///// plane somewhere. We can find exactly where using
		///// PositionVector.findIntersection.

		// draw the equivalent Item to the canvas.
	}
}
