// Matrix and Vector classes.

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

	// Return the specified row as a Vector.
	getRow(rowIndex) {
		if (rowIndex < 0 || rowIndex >= this.rows) {
			return new Error("Invalid index passed to Matrix.getRow.");
		}

		return new Vector(this.contents[rowIndex]);
	}

	// Return the specified column as a Vector.
	getCol(colIndex) {
		if (colIndex < 0 || colIndex >= this.cols) {
			return new Error("Invalid index passed to Matrix.getCol.");
		}

		return new Vector(this.contents.map(row => row[colIndex]));
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
				product[rowIndex][colIndex] = Vector.dot(matrix1.getRow(rowIndex), matrix2.getCol(colIndex));
			}
		}

		return new Matrix(product);
	}
}

// A Matrix with exactly 1 row
class Vector extends Matrix {
	// A 1D array with at least 1 entry is passed in to construct a Vector.
	// Passing in an empty 1D array or a non-1D array causes undefined behavior.
	constructor(contents) {
		super([contents]);
		// Note that the super call causes this.contents to be a 2D array.
		// It's useful to make this.contents 2D since that makes
		// Vector * Matrix multiplication simpler.
	}

	// return the dot product of the two Vectors
	static dot(vector1, vector2) {
		if (vector1.contents[0].length != vector2.contents[0].length) {
			throw new TypeError("Arguments to Vector.dot don't have the same dimensions.");
		}

		let output = 0;
		for (let i = 0; i < vector1.contents[0].length; i++) {
			output += vector1.contents[0][i] * vector2.contents[0][i];
		}

		return output;
	}
}

// A Vector of the form [x, y, z, 1] used to represent Coordinate positions
// in a CoordinateSystem. This particular format is useful for switching between
// CoordinateSystems.
class PositionVector extends Vector {
	// 3 separate arguments x, y, z are passed in to construct a PositionVector.
	// Passing in an array causes undefined behavior.
	constructor(x, y, z) {
		super([x, y, z, 1]);
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


}
