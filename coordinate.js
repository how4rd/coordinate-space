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

	// Rotate the CoordinateSystem's x axis by the specified angle relative to
	// the world system's (positive direction given by the right-hand rule).
	rotateX(angle) {
		this.xRot += angle;
	}

	// Rotate the CoordinateSystem's y axis by the specified angle relative to
	// the world system's (positive direction given by the right-hand rule).
	rotateY(angle) {
		this.yRot += angle;
	}

	// Rotate the CoordinateSystem's z axis by the specified angle relative to
	// the world system's (positive direction given by the right-hand rule).
	rotateZ(angle) {
		this.zRot += angle;
	}

	// Translate the CoordinateSystem's origin relative to the world system by
	// the specified deltaX, deltaY, deltaZ
	translate(deltaX, deltaY, deltaZ) {
		this.origin.translate(deltaX, deltaY, deltaZ);
	}

	// Find where the line segment between two Coordinates in the current
	// CoordinateSystem intersects the plane z = planeZ. Return the Coordinate
	// of that intersection if there is a single intersection point; otherwise
	// return null.
	findLinePlaneIntersection(c1, c2, planeZ) {
		// both Coordinates must lie in the current CoordinateSystem
		if (c1.system != this) {
			throw new Error("The first coordinate passed into" +
				" CoordinateSystem.findLinePlaneIntersection is not expressed" +
				" in terms of the correct CoordinateSystem.");
		}

		if (c2.system != this) {
			throw new Error("The second coordinate passed into" +
				" CoordinateSystem.findLinePlaneIntersection is not expressed" +
				" in terms of the correct CoordinateSystem.");
		}

		// if line segment doesn't intersect plane in exactly 1 place...
		if ((c1.z > 0 && c2.z > 0) || (c1.z == 0 && c2.z == 0) ||
			(c1.z < 0 && c2.z < 0)) {
			return null;
		} else {  // line segment intersects plane in exactly 1 place

			// Call the intersection point cMid.
			// The equations relating the 3 Coordinates' positions are:
			// 1: cMid.x = c1.x + m(c2.x - c1.x)
			// 2: cMid.y = c1.y + m(c2.y - c1.y)
			// 3: cMid.z = c1.z + m(c2.z - c1.z)

			// First, rearrange 3 to solve for m, noting that cMid.z = -planeZ
			const m = (planeZ - c1.z) / (c2.z - c1.z);

			// Then plug m into 1 and 2 to solve for its x and y coordinates
			return new Coordinate(c1.x + m*(c2.x - c1.x),
				c1.y + m*(c2.y - c1.y), planeZ, this)
		}
	}
}

class Coordinate {
	// A Coordinate has a position (x, y, z) in some CoordinateSystem.
	// If the CoordinateSystem is not specified, it is assumed to be the
	// world system.
	constructor(x, y, z, system = null) {
		this.position = new PositionVector(x, y, z);
		this.system = system;
	}

	get x() {
		return this.position.x;
	}

	get y() {
		return this.position.y;
	}

	get z() {
		return this.position.z;
	}

	// Translate the Coordinate by the specified deltaX, deltaY, deltaZ
	translate(deltaX, deltaY, deltaZ) {
		this.position.translate(deltaX, deltaY, deltaZ);
	}


	// Helper function for copyIntoCoordinateSystem.
	// Return the Coordinate's position in the specified CoordinateSystem
	// as a PositionVector.
	getPositionVectorInSystem(otherSystem) {
		if (this.system == otherSystem) {
			return this.position;
		}

		// Since all CoordinateSystems are defined relative to the world system,
		// to transform from our system to the other one, we can first transform
		// from ours to the world system, then transform from the world system
		// to the other system.

		// This could be done with one big matrix multiplication, but for
		// clarity we break it up into steps.

		let otherVector = this.position.copy();

		// if we're not already in the world system, switch to it
		if (this.system != null) {
			// When we set up this.system, we started with a copy of the
			// world system.
			// We rotated its x, y, and z axes by
			// this.system.xRot, this.system.yRot, this.system.zRot.
			// We translated it by
			// this.system.origin.x, this.system.origin.y, this.system.origin.z.

			// So, the vector's coordinates can be expressed in multiple ways:
			// xInWorldSystem = this.system.origin.x + xInThisSystem
			// (same goes for y and z).

			// Likewise the vector's rotation angles can be expressed as
			// xRotInWorldSystem = this.system.xRot + xRotInThisSystem
			// (same goes for yRot and zRot).

			// From these equations, we can see that to re-express a local
			// vector in the world system, you have to perform these operations.

			// So, to undo this, we translate its origin back, then we rotate
			// the z, y, and x axes the opposite direction as before.
			// Performing the 4 undo operations on our PositionVector will get
			// switch it to the world system.
			otherVector.translate(this.system.origin.x, this.system.origin.y,
				this.system.origin.z);
			otherVector.rotateZ(this.system.zRot);
			otherVector.rotateY(this.system.yRot);
			otherVector.rotateX(this.system.xRot);
		}

		// if we don't want to stay in the world system, switch out of it
		if (otherSystem != null) {

			// When we set up otherSystem, we started with a copy of the
			// world system.
			// We rotated its x, y, and z axes by
			// otherSystem.xRot, otherSystem.yRot, otherSystem.zRot.
			// We translated it by
			// otherSystem.origin.x, otherSystem.origin.y, otherSystem.origin.z.

			// So, the vector's coordinates can be expressed in multiple ways:
			// xInWorldSystem = otherSystem.origin.x + xInOtherSystem, so
			// xInOtherSystem = xInWorldSystem - otherSystem.origin.x
			// (same goes for y and z).

			// Likewise the vector's rotation angles can be expressed as
			// xRotInWorldSystem = otherSystem.xRot + xRotInOtherSystem, so
			// xRotInOtherSystem = xRotInWorldSystem - otherSystem.xRot
			// (same goes for yRot and zRot).

			// From these equations, we can see that to re-express a world
			// vector in the local system, you have to perform these operations.
			otherVector.rotateX(-otherSystem.xRot);
			otherVector.rotateY(-otherSystem.yRot);
			otherVector.rotateZ(-otherSystem.zRot);
			otherVector.translate(-otherSystem.origin.x, -otherSystem.origin.y,
				-otherSystem.origin.z);
		}

		return otherVector;
	}

	// Return a copy of the current Coordinate.
	// The x/y/z in the copied Item are distinct from the original Item
	// (so moving around the copy won't affect the original). However the
	// CoordinateSpace is the same as the original (as opposed to an identical
	// copy).
	copy() {
		return new Coordinate(this.x, this.y, this.z, this.system);
	}

	// Return a copy of the current Coordinate, re-expressed in the given
	// CoordinateSystem.
	// The x/y/z in the copied Item are distinct from the original Item
	// (so moving around the copy won't affect the original). However the
	// CoordinateSpace is the same as the original (as opposed to an identical
	// copy).
	copyIntoCoordinateSystem(otherSystem) {
		const newPosition = this.getPositionVectorInSystem(otherSystem);
		return new Coordinate(newPosition.x, newPosition.y, newPosition.z,
			otherSystem);
	}
}
