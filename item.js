// Items to display in the coordinate space (lines, points)

class Item {
	// An Item takes in a list of Coordinates corresponding to vertices in the
	// Item.
	// When drawn, these vertices may or may not be connected by lines--that
	// varies by the type of Item.
	// Note that all Coordinates must be expressed in the same CoordinateSystem.
	constructor(vertices) {
		if (this.constructor == Item) {
			throw new TypeError("Cannot instantiate abstract class Item.");
		}

		// all Coordinates must have same CoordinateSystem
		if (!vertices.every(vertex => vertex.system == vertices[0].system)) {
			throw new Error("Attempted to instantiate Item with Coordinates from multiple CoordinateSystems.");
		}

		this.vertices = vertices;
	}

	// Given an index i in this.vertices (corresponding to some vertex in the
	// Item), return an array of all the other indexes in this.vertices
	// (corresponding to vertices in the Item) that are adjacent to
	// this.vertices[i].
	getAdjacentVertexIndexes(i) {
		let neighbors = [];

		if (i < 0 || i >= this.vertices.length) {
			throw new Error("Passed invalid index " + i + " into getAdjacentVertexIndexes.");
		}

		if (i > 0) {
			neighbors += i - 1;
		}

		if (i + 1 < this.vertices.length) {
			neighbors += i + 1;
		}

		return neighbors;
	}

	// Return a copy of the current Item.
	// The vertices in the copied Item are distinct from the original Item
	// (so moving around the copy won't affect the original). However the
	// CoordinateSpace is the same as the original (as opposed to an identical
	// copy).
	copy() {
		throw new Error("Function 'copy' must be implemented.");
	}

	// Return a deep copy of the current Item, re-expressed in the given
	// CoordinateSystem.
	// The vertices in the copied Item are distinct from the original Item
	// (so moving around the copy won't affect the original). However the
	// CoordinateSpace is the same as the original (as opposed to an identical
	// copy).
	copyIntoCoordinateSystem(otherSystem) {
		throw new Error("Function 'copyIntoCoordinateSystem' must be implemented.");
	}

	// Slice the Item with a plane occupying z = sliceZ in the Item's
	// CoordinateSystem, so that afterword the Item is the slice where
	// z <= sliceZ.
	slice(sliceZ) {
		slicedVertices = [];
		for (let i = 0; i < this.vertices.length; i++) {
			// If a vertex is behind the image plane, then it doesn't appear
			// on the image plane. However, line segments connected to that
			// vertex could still appear on the image plane. The solution to
			// this is to look at its neighbors (the vertices that it is
			// connected to with lines). If a neighbor is in front of the vertex
			// plane, then the line between the vertex and its neighbor
			// intersects the image plane somewhere. We can find exactly where
			// using PositionVector.findIntersection.

			// vertices with z <= sliceZ aren't affected by the slice;
			// vertices with z > sliceZ don't appear in the slice, but if
			// they're connected to other points behind the slice, those lines
			// cut through the plane z = sliceZ and could appear in the slice
			if (this.vertices[i].z >= sliceZ) {
				slicedVertices += this.vertices[i];
			} else {
				for (let j in this.getAdjacentVertexIndexes(i)) {
					// If the neighbor is on the other side of the z = sliceZ
					// plane, then the line from this vertex to the neighbor
					// passes through the plane. Therefore the line has a
					// corresponding point on the plane.
					slicedVertices += this.system.findLinePlaneIntersection(item.vertices[i], item.vertices[j], sliceZ);
				}
			}
		}
	}
}

class Polygon extends Item {
	constructor(vertices) {
		super(vertices);
	}

	copy() {
		return new Polygon(this.vertices.map(vertex => vertex.copy()));
	}

	copyIntoCoordinateSystem(otherSystem) {
		return new Polygon(this.vertices.map(vertex => vertex.copyIntoCoordinateSystem(otherSystem)));
	}
}

class LineSegment extends Item {
	constructor(vertex1, vertex2) {
		super([vertex1, vertex2]);
	}

	copy() {
		return new LineSegment(this.vertices.map(vertex => vertex.copy()));
	}

	copyIntoCoordinateSystem(otherSystem) {
		return new LineSegment(this.vertices.map(vertex => vertex.copyIntoCoordinateSystem(otherSystem)));
	}
}
