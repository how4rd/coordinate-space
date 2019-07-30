// CoordinateSystem

class CoordinateSystem {
	// A CoordinateSystem has 3 numbers describing how much its x, y, and z axes
	// have been rotated relative to the world system's axes, and a Vector
	// describing its origin's coordinate in the world system.
	// NOTES:
	// - Mathematically, the CoordinateSystem is created by rotating the axes
	// first, then translating the origin. The arguments' order reflects this.
	// - CoordinateSystems are right-handed.
	constructor(xRot, yRot, zRot, originXPos, originYPos, originZPos) {
		this.xRot = xRot;
		this.yRot = yRot;
		this.zRot = zRot;
		this.originXPos = originXPos;
		this.originYPos = originYPos;
		this.originZPos = originZPos;
	}

	// rotate the CoordinateSystem about its own x axis by the specified angle
	// (positive direction given by the right-hand rule)
	rotateX(angle) {
		this.yRot += angle;
		this.zRot += angle;
	}

	// rotate the CoordinateSystem about its own y axis by the specified angle
	// (positive direction given by the right-hand rule)
	rotateY(angle) {
		this.xRot += angle;
		this.zRot += angle;
	}

	// rotate the CoordinateSystem about its own z axis by the specified angle
	// (positive direction given by the right-hand rule)
	rotateZ(angle) {
		this.xRot += angle;
		this.yRot += angle;
	}
}
