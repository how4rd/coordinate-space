// Matrix and Vector classes.

class Matrix {
	constructor(contents) {
		this.contents = contents;
		this.rows = contents.length;
		this.cols = contents[0].length;
	}

	// get the contents of the Matrix at index (row, col)
	getIndex(row, col) {
		if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
			return new Error("Invalid index passed to Matrix.getIndex.");
		}
		return this.contents[row][col];
	}

	// set the contents of the Matrix at index (row, col)
	setIndex(row, col, value) {
		if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
			return new Error("Invalid index passed to Matrix.setIndex.");
		}
		this.contents[row][col] = value;
	}

	// return the specified row as a Vector
	getRow(rowIndex) {
		if (rowIndex < 0 || rowIndex >= this.rows) {
			return new Error("Invalid index passed to Matrix.getRow.");
		}

		return new Vector(this.contents[rowIndex]);
	}

	// return the specified column as a Vector
	getCol(colIndex) {
		if (colIndex < 0 || colIndex >= this.cols) {
			return new Error("Invalid index passed to Matrix.getCol.");
		}

		return new Vector(this.contents.map(row => row[colIndex]));
	}

	// return the sum of the two Matrices
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

	// return the product of the two Matrices
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

class Vector extends Matrix {
	constructor(contents) {
		super(contents);

		// always make the Vector a row vector
		// see https://stackoverflow.com/a/10865042
		this.contents = [].concat.apply([], contents);
	}

	// return the dot product of the two Vectors
	static dot(vector1, vector2) {
		if (vector1.contents.length != vector2.contents.length) {
			throw new TypeError("Arguments to Vector.dot don't have the same dimensions.");
		}

		let output = 0;
		for (let i = 0; i < vector1.contents.length; i++) {
			output += vector1.contents[i] * vector2.contents[i];
		}

		return output;
	}
}
