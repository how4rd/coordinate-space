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

		this.vertices = vertices;
	}

	// Given an index i in this.vertices (corresponding to some vertex in the
	// Item), return an array of all the other indexes in this.vertices
	// (corresponding to vertices in the Item) that are adjacent to
	// this.vertices[i].
	getAdjacentVertexIndexes(i) {
		throw new Error("Function 'getAdjacentVertexIndexes' must be implemented.");
	}
}

class Polygon extends Item {
	constructor(vertices) {
		super(vertices);
	}

	getAdjacentVertexIndexes(i) {
		return;  // @TODO
	}
}

class LineSegment extends Item {
	constructor(vertex1, vertex2) {
		super([vertex1, vertex2]);
	}

	getAdjacentVertexIndexes(i) {
		return;  // @TODO
	}
}
