// Matrix and PositionVector classes.

class Matrix {
	// A 2D array with at least 1 entry is passed in to construct a Matrix.
	// Note that each nested array within the 2D array is a row.
	// For example, [[1, 2, 3]] is a row matrix, while [[1], [2], [3]] is a
	// column matrix.
	// Passing in an empty 2D array or a non-2D array causes undefined behavior.
	constructor(contents) {
		this.contents = contents;
		this.rows = contents.length;
		this.cols = contents[0].length;
	}

	// Get the contents of the Matrix at index (row, col).
	getIndex(row, col) {
		if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
			return new Error("Invalid index passed to Matrix.getIndex.");
		}
		return this.contents[row][col];
	}

	// Set the contents of the Matrix at index (row, col).
	setIndex(row, col, value) {
		if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
			return new Error("Invalid index passed to Matrix.setIndex.");
		}
		this.contents[row][col] = value;
	}

	// Return the sum of the two Matrices.
	static add(matrix1, matrix2) {
		if (matrix1.rows != matrix2.rows || matrix1.cols != matrix2.cols) {
			throw new Error("Arguments to Matrix.add don't have the same dimensions.");
		}

		let sum = [];
		for (let row = 0; row < matrix1.rows; row++) {
			sum[row] = [];
			for (let col = 0; col < matrix1.cols; col++) {
				sum[row][col] = matrix1.getIndex(row, col) + matrix2.getIndex(row, col);
			}
		}

		return new Matrix(sum);
	}

	// Return the product of the two Matrices.
	static multiply(matrix1, matrix2) {
		if (matrix1.cols != matrix2.rows) {
			throw new Error("For Matrix.multiply, the first argument's column count doesn't equal the second's row count.");
		}

		let product = [];
		for (let rowIndex = 0; rowIndex < matrix1.rows; rowIndex++) {
			product[rowIndex] = [];
			for (let colIndex = 0; colIndex < matrix2.cols; colIndex++) {
				product[rowIndex][colIndex] = 0;
				for (let i = 0; i < matrix1.cols; i++) {
					product[rowIndex][colIndex] += matrix1.contents[rowIndex][i] * matrix2.contents[i][colIndex];
				}
			}
		}

		return new Matrix(product);
	}
}

// A Matrix of the form [[x, y, z, 1]] used to represent Coordinate positions
// in a CoordinateSystem. This particular format is useful for switching between
// CoordinateSystems.
class PositionVector extends Matrix {
	// 3 separate arguments x, y, z are passed in to construct a PositionVector.
	// Passing in an array causes undefined behavior.
	constructor(x, y, z) {
		super([[x, y, z, 1]]);
	}

	// Getters
	get x() {
		return this.contents[0][0];
	}

	get y() {
		return this.contents[0][1];
	}

	get z() {
		return this.contents[0][2];
	}

	// Rotates the PositionVector about the x axis by the specified angle.
	// The angle is in radians, and its positive direction is given by the
	// right-hand rule when your thumb points in the +x direction.
	rotateX(angle) {
		this.contents = Matrix.multiply(this, new Matrix([
				[1, 0, 0, 0],
				[0, Math.cos(angle), Math.sin(angle), 0],
				[0, -Math.sin(angle), Math.cos(angle), 0],
				[0, 0, 0, 1]
			])).contents;
	}

	// Rotates the PositionVector about the y axis by the specified angle.
	// The angle is in radians, and its positive direction is given by the
	// right-hand rule when your thumb points in the +y direction.
	rotateY(angle) {
		this.contents = Matrix.multiply(this, new Matrix([
				[Math.cos(angle), 0, -Math.sin(angle), 0],
				[0, 1, 0, 0],
				[Math.sin(angle), 0, Math.cos(angle), 0],
				[0, 0, 0, 1]
			])).contents;
	}

	// Rotates the PositionVector about the z axis by the specified angle.
	// The angle is in radians, and its positive direction is given by the
	// right-hand rule when your thumb points in the +z direction.
	rotateZ(angle) {
		this.contents = Matrix.multiply(this, new Matrix([
				[Math.cos(angle), Math.sin(angle), 0, 0],
				[-Math.sin(angle), Math.cos(angle), 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 1]
			])).contents;
	}

	// Translates the PositionVector by the specified deltaX, deltaY, deltaZ.
	translate(deltaX, deltaY, deltaZ) {
		this.contents = Matrix.multiply(this, new Matrix([
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[deltaX, deltaY, deltaZ, 1]
		])).contents;
	}

	// Returns a copy of the PositionVector
	copy() {
		return new PositionVector(this.x, this.y, this.z);
	}
}
