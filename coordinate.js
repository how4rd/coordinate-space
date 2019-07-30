// CoordinateSystem

class CoordinateSystem {
	// A CoordinateSystem has 3 numbers describing how much its x, y, and z axes
	// have been rotated relative to the world system's axes, and a Coordinate
	// describing its origin's coordinate in the world system.
	// NOTES:
	// - Mathematically, the CoordinateSystem is created by rotating the axes
	// first, then translating the origin. The arguments' order reflects this.
	// - CoordinateSystems are right-handed.
	// - The origin Coordinate must be specified relative to the world system.
	constructor(xRot, yRot, zRot, origin) {
		this.xRot = xRot;
		this.yRot = yRot;
		this.zRot = zRot;

		if (origin.system != null) {
			throw new Error("CoordinateSystem's origin Coordinate isn't given relative to the world system.")
		}
		this.origin = origin;
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

class Coordinate {
	// A Coordinate has a position (x, y, z) in some CoordinateSystem.
	// If the CoordinateSystem is not specified, it is assumed to be the
	// world system.
	constructor(x, y, z, system = null) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.system = system;
	}

	// Returns the Coordinate's position as a Vector [x, y, z, 1].
	// This format is useful for switching between coordinate systems.
	getPositionVector() {
		return new Vector([this.x, this.y, this.z, 1]);
	}
}
