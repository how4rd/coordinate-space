// Items to display in the coordinate space (lines, points)

class Point {
	constructor() {
		if (this.constructor == Point) {
			throw new TypeError("Cannot instantiate abstract class Point.");
		}
	}

	toMatrix() {
		throw new Error("Function 'toMatrix' must be implemented.");
	}

	print() {
		throw new Error("Function 'print' must be implemented.");
	}

	draw() {
		throw new Error("Function 'draw' must be implemented.");
	}

	static add(point1, point2) {
		throw new Error("Function 'add' must be implemented.");
	}
}

class xyPoint extends Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toMatrix() {
		return;  // @TODO
	}

	print() {
		return;  // @TODO
	}

	draw() {
		return;  // @TODO
	}

	static add(point1, point2) {
		return;  // @TODO
	}
}

class uvwPoint extends Point {
	constructor(u, v, w) {
		this.u = u;
		this.v = v;
		this.w = v;
	}

	toMatrix() {
		return;  // @TODO
	}

	print() {
		return;  // @TODO
	}

	draw() {
		return;  // @TODO
	}

	static add(point1, point2) {
		return;  // @TODO
	}
}

class uvwLineSegment {
	constructor(point1, point2) {
		this.point1 = point1;
		this.point2 = point2;
	}

	print() {
		return;  // @TODO
	}

	draw() {
		return;  // @TODO
	}
}
