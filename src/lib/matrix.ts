import { Fraction } from "./fraction";

export type Matrix = Fraction[][];

export interface MatrixMultiplicationStep {
  row: number;
  col: number;
  terms: { a: Fraction; b: Fraction; prod: Fraction }[];
  sum: Fraction;
}

export interface MultiplicationDetail {
  steps: MatrixMultiplicationStep[];
  result: Matrix;
}

export class MatrixMath {
  /**
   * Create an n x n identity matrix
   */
  static identity(n: number): Matrix {
    const mat: Matrix = [];
    for (let i = 0; i < n; i++) {
      const row: Fraction[] = [];
      for (let j = 0; j < n; j++) {
        row.push(i === j ? Fraction.one() : Fraction.zero());
      }
      mat.push(row);
    }
    return mat;
  }

  /**
   * Create an n x n zero matrix
   */
  static zero(n: number): Matrix {
    const mat: Matrix = [];
    for (let i = 0; i < n; i++) {
      const row: Fraction[] = [];
      for (let j = 0; j < n; j++) {
        row.push(Fraction.zero());
      }
      mat.push(row);
    }
    return mat;
  }

  /**
   * Convert 2D number or string array to Fraction matrix
   */
  static from(data: (number | string | Fraction)[][]): Matrix {
    return data.map((row) => row.map((val) => Fraction.from(val)));
  }

  /**
   * Add two matrices of the same dimension
   */
  static add(A: Matrix, B: Matrix): Matrix {
    const n = A.length;
    const res: Matrix = [];
    for (let i = 0; i < n; i++) {
      const row: Fraction[] = [];
      for (let j = 0; j < n; j++) {
        row.push(A[i][j].add(B[i][j]));
      }
      res.push(row);
    }
    return res;
  }

  /**
   * Subtract two matrices: A - B
   */
  static sub(A: Matrix, B: Matrix): Matrix {
    const n = A.length;
    const res: Matrix = [];
    for (let i = 0; i < n; i++) {
      const row: Fraction[] = [];
      for (let j = 0; j < n; j++) {
        row.push(A[i][j].sub(B[i][j]));
      }
      res.push(row);
    }
    return res;
  }

  /**
   * Multiply matrix by a scalar fraction
   */
  static scale(A: Matrix, scalar: Fraction | number | string): Matrix {
    const s = Fraction.from(scalar);
    return A.map((row) => row.map((cell) => cell.mul(s)));
  }

  /**
   * Multiply two square matrices A * B with educational step breakdown
   */
  static multiply(A: Matrix, B: Matrix): MultiplicationDetail {
    const n = A.length;
    const result: Matrix = [];
    const steps: MatrixMultiplicationStep[] = [];

    for (let i = 0; i < n; i++) {
      const row: Fraction[] = [];
      for (let j = 0; j < n; j++) {
        let sum = Fraction.zero();
        const terms: { a: Fraction; b: Fraction; prod: Fraction }[] = [];

        for (let k = 0; k < n; k++) {
          const a = A[i][k];
          const b = B[k][j];
          const prod = a.mul(b);
          terms.push({ a, b, prod });
          sum = sum.add(prod);
        }

        row.push(sum);
        steps.push({ row: i + 1, col: j + 1, terms, sum });
      }
      result.push(row);
    }

    return { steps, result };
  }

  /**
   * Calculate trace of a matrix (sum of diagonal entries)
   */
  static trace(A: Matrix): Fraction {
    let tr = Fraction.zero();
    for (let i = 0; i < A.length; i++) {
      tr = tr.add(A[i][i]);
    }
    return tr;
  }

  /**
   * Check if a matrix is the zero matrix
   */
  static isZeroMatrix(A: Matrix, tolerance = 1e-9): boolean {
    for (let i = 0; i < A.length; i++) {
      for (let j = 0; j < A[i].length; j++) {
        const val = A[i][j];
        if (!val.isZero() && Math.abs(val.toNumber()) > tolerance) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Submatrix omitting row r and col c
   */
  static submatrix(A: Matrix, r: number, c: number): Matrix {
    return A.filter((_, i) => i !== r).map((row) => row.filter((_, j) => j !== c));
  }

  /**
   * Determinant of matrix A
   */
  static determinant(A: Matrix): Fraction {
    const n = A.length;
    if (n === 1) return A[0][0];
    if (n === 2) {
      return A[0][0].mul(A[1][1]).sub(A[0][1].mul(A[1][0]));
    }
    if (n === 3) {
      const a = A[0][0].mul(A[1][1].mul(A[2][2]).sub(A[1][2].mul(A[2][1])));
      const b = A[0][1].mul(A[1][0].mul(A[2][2]).sub(A[1][2].mul(A[2][0])));
      const c = A[0][2].mul(A[1][0].mul(A[2][1]).sub(A[1][1].mul(A[2][0])));
      return a.sub(b).add(c);
    }

    // Laplace expansion along row 0 for n >= 4
    let det = Fraction.zero();
    for (let j = 0; j < n; j++) {
      const entry = A[0][j];
      if (entry.isZero()) continue;
      const sub = MatrixMath.submatrix(A, 0, j);
      const subDet = MatrixMath.determinant(sub);
      const term = entry.mul(subDet);
      if (j % 2 === 0) {
        det = det.add(term);
      } else {
        det = det.sub(term);
      }
    }
    return det;
  }

  /**
   * Format matrix to KaTeX bmatrix string
   */
  static toTex(A: Matrix): string {
    const rows = A.map((row) => row.map((cell) => cell.toTex()).join(" & "));
    return `\\begin{pmatrix} ${rows.join(" \\\\ ")} \\end{pmatrix}`;
  }

  /**
   * Format matrix as string rows
   */
  static toString(A: Matrix): string {
    return A.map((row) => row.map((c) => c.toString()).join(" ")).join("\n");
  }
}
