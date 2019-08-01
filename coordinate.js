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
			throw new Error("CoordinateSystem's origin Coordinate isn't given relative to the world system.");
		}
		this.origin = origin;
	}

	// Rotate the CoordinateSystem about its own x axis by the specified angle
	// (positive direction given by the right-hand rule).
	rotateX(angle) {
		this.yRot += angle;
		this.zRot += angle;
	}

	// Rotate the CoordinateSystem about its own y axis by the specified angle
	// (positive direction given by the right-hand rule).
	rotateY(angle) {
		this.xRot += angle;
		this.zRot += angle;
	}

	// Rotate the CoordinateSystem about its own z axis by the specified angle
	// (positive direction given by the right-hand rule).
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

	// Return the Coordinate's position in its current CoordinateSystem
	// as a PositionVector.
	// This format is useful for switching between coordinate systems.
	getPositionVector() {
		return new PositionVector(this.x, this.y, this.z);
	}

	// Return the Coordinate's position in the specified CoordinateSystem
	// as a PositionVector.
	static getPositionVectorInSystem(otherSystem) {
		if (this.system == otherSystem) {
			return this.getPositionVector();
		}

		// Since all CoordinateSystems are defined relative to the world system,
		// to transform from our system to the other one, we can first transform
		// from ours to the world system, then transform from the world system
		// to the other system.

		// This could be done with one big matrix multiplication, but for
		// clarity we break it up into steps.

		let otherVector = this.getPositionVector();

		// if we're not already in the world system, switch to it
		if (this.system != null) {
			// When we set up a CoordinateSystem, we start with a copy of the
			// world system. We rotate its x, y, and z axes, then we translate
			// its origin.

			// So, to undo this, we translate its origin back, then we rotate
			// the z, y, and x axes the opposite direction as before.
			// Performing the 4 undo operations on our PositionVector will get
			// switch it to the world system.
			otherVector.translate(-this.system.origin.x, -this.system.origin.y,
				-this.system.origin.z);
			otherVector.rotateZ(-this.system.zRot);
			otherVector.rotateY(-this.system.yRot);
			otherVector.rotateX(-this.system.xRot);
		}

		// if we don't want to stay in the world system, switch out of it
		if (otherSystem != null) {
			// We're in the world system, so to move out of it we perform the
			// exact same operations we would when creating a new system from
			// scratch: rotate x, rotate y, rotate z, translate origin.
			otherVector.rotateX(otherSystem.xRot);
			otherVector.rotateY(otherSystem.yRot);
			otherVector.rotateZ(otherSystem.zRot);
			otherVector.translate(otherSystem.origin.x, otherSystem.origin.y,
				otherSystem.origin.z);
		}

		return otherVector;
	}
}