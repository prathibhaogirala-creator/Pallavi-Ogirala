import { Fraction } from "./fraction";
import { Matrix, MatrixMath, MultiplicationDetail } from "./matrix";

export interface PolynomialTerm {
  power: number;
  coeff: Fraction;
}

export interface MatrixPowerCalculation {
  power: number;
  expression: string; // e.g. "A^2 = A \times A"
  matrix: Matrix;
  detail?: MultiplicationDetail;
}

export interface ScaledTermCalculation {
  power: number;
  coeff: Fraction;
  label: string; // e.g. "-6A^2"
  matrix: Matrix;
}

export interface CellVerificationBreakdown {
  row: number;
  col: number;
  terms: { label: string; value: Fraction }[];
  sum: Fraction;
}

export interface CayleyHamiltonResult {
  n: number;
  A: Matrix;
  texA: string;
  I: Matrix;
  texI: string;
  lambdaMinusA_Tex: string;
  
  // Determinant expansion steps
  determinantExpansionTex: string[];
  expansionExplanation: string;

  // Polynomial: coefficients from highest power n down to 0
  coefficients: Fraction[]; // [c_n, c_{n-1}, ..., c_0] where c_n = 1
  polynomialTex: string;
  equationTex: string;
  matrixEquationTex: string;

  // Powers: A^1, A^2, ..., A^n
  powers: MatrixPowerCalculation[];

  // Scaled terms: c_n A^n, c_{n-1} A^{n-1}, ..., c_0 I
  scaledTerms: ScaledTermCalculation[];

  // Summation details
  sampleCellBreakdowns: CellVerificationBreakdown[];
  finalMatrix: Matrix;
  finalMatrixTex: string;
  isVerified: boolean;

  // Bonus: Inverse matrix formula if det != 0
  inverseFormulaTex?: string;
  inverseMatrix?: Matrix;
  inverseMatrixTex?: string;
}

/**
 * Format polynomial in lambda given coefficients [c_n, c_{n-1}, ..., c_0]
 */
export function formatPolynomialTex(coeffs: Fraction[], variable = "\\lambda"): string {
  const n = coeffs.length - 1;
  const parts: string[] = [];

  for (let i = 0; i <= n; i++) {
    const power = n - i;
    const coeff = coeffs[i];
    if (coeff.isZero() && n > 0 && parts.length > 0) continue;

    const isNegative = coeff.isNegative();
    const absCoeff = coeff.abs();
    const sign = isNegative ? " - " : (parts.length === 0 ? "" : " + ");

    let termStr = "";

    if (power === 0) {
      termStr = absCoeff.toTex();
    } else if (power === 1) {
      if (absCoeff.isOne()) {
        termStr = variable;
      } else {
        termStr = `${absCoeff.toTex()}${variable}`;
      }
    } else {
      if (absCoeff.isOne()) {
        termStr = `${variable}^{${power}}`;
      } else {
        termStr = `${absCoeff.toTex()}${variable}^{${power}}`;
      }
    }

    if (parts.length === 0 && isNegative) {
      parts.push(`-${termStr}`);
    } else {
      parts.push(`${sign}${termStr}`);
    }
  }

  return parts.length === 0 ? "0" : parts.join("");
}

/**
 * Format matrix polynomial replacing lambda with A and constant with I
 */
export function formatMatrixPolynomialTex(coeffs: Fraction[]): string {
  const n = coeffs.length - 1;
  const parts: string[] = [];

  for (let i = 0; i <= n; i++) {
    const power = n - i;
    const coeff = coeffs[i];
    if (coeff.isZero()) continue;

    const isNegative = coeff.isNegative();
    const absCoeff = coeff.abs();
    const sign = isNegative ? " - " : (parts.length === 0 ? "" : " + ");

    let termStr = "";

    if (power === 0) {
      if (absCoeff.isOne()) {
        termStr = "I";
      } else {
        termStr = `${absCoeff.toTex()}I`;
      }
    } else if (power === 1) {
      if (absCoeff.isOne()) {
        termStr = "A";
      } else {
        termStr = `${absCoeff.toTex()}A`;
      }
    } else {
      if (absCoeff.isOne()) {
        termStr = `A^{${power}}`;
      } else {
        termStr = `${absCoeff.toTex()}A^{${power}}`;
      }
    }

    if (parts.length === 0 && isNegative) {
      parts.push(`-${termStr}`);
    } else {
      parts.push(`${sign}${termStr}`);
    }
  }

  return parts.length === 0 ? "\\mathbf{O}" : parts.join("");
}

/**
 * Compute the characteristic polynomial coefficients using Faddeev-LeVerrier algorithm
 * Returns [c_n, c_{n-1}, ..., c_0] for det(λI - A) where c_n = 1
 */
export function computeCharacteristicCoefficients(A: Matrix): Fraction[] {
  const n = A.length;
  // Faddeev-LeVerrier algorithm
  // M_0 = I
  // for k = 1 to n:
  //   B_k = A * M_{k-1}
  //   p_k = (1/k) * tr(B_k)
  //   M_k = B_k - p_k * I
  // The characteristic polynomial det(λI - A) has coefficients:
  // c_n = 1
  // c_{n-k} = -p_k
  const p: Fraction[] = [Fraction.zero()]; // 1-indexed
  let M = MatrixMath.identity(n);

  for (let k = 1; k <= n; k++) {
    const { result: B } = MatrixMath.multiply(A, M);
    const tr = MatrixMath.trace(B);
    const pk = tr.div(new Fraction(BigInt(k), BigInt(1)));
    p.push(pk);

    // M_k = B - p_k * I
    const pkI = MatrixMath.scale(MatrixMath.identity(n), pk);
    M = MatrixMath.sub(B, pkI);
  }

  // Coefficients for det(λI - A):
  // λ^n - p_1 λ^{n-1} - p_2 λ^{n-2} - ... - p_n
  const coeffs: Fraction[] = [Fraction.one()];
  for (let k = 1; k <= n; k++) {
    coeffs.push(p[k].neg());
  }

  return coeffs;
}

/**
 * Build symbolic KaTeX matrix for λI - A
 */
export function buildLambdaMinusATex(A: Matrix): string {
  const n = A.length;
  const rows: string[] = [];

  for (let i = 0; i < n; i++) {
    const cells: string[] = [];
    for (let j = 0; j < n; j++) {
      const val = A[i][j];
      if (i === j) {
        if (val.isZero()) {
          cells.push("\\lambda");
        } else if (val.isNegative()) {
          cells.push(`\\lambda + ${val.abs().toTex()}`);
        } else {
          cells.push(`\\lambda - ${val.toTex()}`);
        }
      } else {
        if (val.isZero()) {
          cells.push("0");
        } else if (val.isNegative()) {
          cells.push(val.abs().toTex());
        } else {
          cells.push(`-${val.toTex()}`);
        }
      }
    }
    rows.push(cells.join(" & "));
  }

  return `\\begin{pmatrix} ${rows.join(" \\\\ ")} \\end{pmatrix}`;
}

/**
 * Main verification pipeline
 */
export function verifyCayleyHamilton(A: Matrix): CayleyHamiltonResult {
  const n = A.length;
  const I = MatrixMath.identity(n);
  const texA = MatrixMath.toTex(A);
  const texI = MatrixMath.toTex(I);
  const lambdaMinusA_Tex = buildLambdaMinusATex(A);

  // Compute polynomial coefficients
  const coefficients = computeCharacteristicCoefficients(A);
  const polynomialStr = formatPolynomialTex(coefficients);
  const polynomialTex = `p(\\lambda) = ${polynomialStr}`;
  const equationTex = `${polynomialStr} = 0`;
  const matrixPolyStr = formatMatrixPolynomialTex(coefficients);
  const matrixEquationTex = `p(A) = ${matrixPolyStr} = \\mathbf{O}`;

  // Determinant expansion steps
  const determinantExpansionTex: string[] = [];
  let expansionExplanation = "";

  if (n === 2) {
    const a11 = A[0][0];
    const a12 = A[0][1];
    const a21 = A[1][0];
    const a22 = A[1][1];

    const diag1 = a11.isZero() ? "\\lambda" : (a11.isNegative() ? `(\\lambda + ${a11.abs().toTex()})` : `(\\lambda - ${a11.toTex()})`);
    const diag2 = a22.isZero() ? "\\lambda" : (a22.isNegative() ? `(\\lambda + ${a22.abs().toTex()})` : `(\\lambda - ${a22.toTex()})`);
    const off1 = a12.isZero() ? "0" : (a12.isNegative() ? a12.abs().toTex() : `(-${a12.toTex()})`);
    const off2 = a21.isZero() ? "0" : (a21.isNegative() ? a21.abs().toTex() : `(-${a21.toTex()})`);

    const step1 = `\\det(\\lambda I - A) = \\begin{vmatrix} ${diag1} & ${off1} \\\\ ${off2} & ${diag2} \\end{vmatrix}`;
    const step2 = `= ${diag1} \\cdot ${diag2} - (${off1})(${off2})`;
    const step3 = `= \\lambda^2 - (${a11.add(a22).toTex()})\\lambda + (${a11.mul(a22).sub(a12.mul(a21)).toTex()})`;
    const step4 = `= ${polynomialStr}`;

    determinantExpansionTex.push(step1, step2, step3, step4);
    expansionExplanation = "For a 2×2 matrix, the determinant is expanded directly using (a·d - b·c) on the elements of (λI - A).";
  } else if (n === 3) {
    const a11 = A[0][0];
    const a12 = A[0][1];
    const a13 = A[0][2];

    const c11 = a11.isZero() ? "\\lambda" : (a11.isNegative() ? `(\\lambda + ${a11.abs().toTex()})` : `(\\lambda - ${a11.toTex()})`);
    const c12 = a12.isZero() ? "0" : (a12.isNegative() ? a12.abs().toTex() : `(-${a12.toTex()})`);
    const c13 = a13.isZero() ? "0" : (a13.isNegative() ? a13.abs().toTex() : `(-${a13.toTex()})`);

    const tr = MatrixMath.trace(A);
    // Principal minors
    const m1 = A[0][0].mul(A[1][1]).sub(A[0][1].mul(A[1][0]));
    const m2 = A[1][1].mul(A[2][2]).sub(A[1][2].mul(A[2][1]));
    const m3 = A[0][0].mul(A[2][2]).sub(A[0][2].mul(A[2][0]));
    const sumMinors = m1.add(m2).add(m3);
    const detA = MatrixMath.determinant(A);

    const step1 = `\\det(\\lambda I - A) = \\begin{vmatrix} ${lambdaMinusA_Tex.replace(/\\begin{pmatrix}|\\end{pmatrix}/g, "").trim()} \\end{vmatrix}`;
    const step2 = `\\text{Expanding along Row 1: } ${c11} M_{11} - (${c12}) M_{12} + (${c13}) M_{13}`;
    const step3 = `\\text{Standard polynomial formula: } \\lambda^3 - \\operatorname{tr}(A)\\lambda^2 + (M_{11} + M_{22} + M_{33})\\lambda - \\det(A)`;
    const step4 = `= \\lambda^3 - (${tr.toTex()})\\lambda^2 + (${sumMinors.toTex()})\\lambda - (${detA.toTex()})`;
    const step5 = `= ${polynomialStr}`;

    determinantExpansionTex.push(step1, step2, step3, step4, step5);
    expansionExplanation = "For a 3×3 matrix, the characteristic polynomial expands via row cofactors. The coefficients correspond to the trace, the sum of principal 2×2 minors, and the determinant.";
  } else {
    // 4x4
    const tr = MatrixMath.trace(A);
    const detA = MatrixMath.determinant(A);
    const step1 = `\\det(\\lambda I - A) = \\lambda^4 + c_3 \\lambda^3 + c_2 \\lambda^2 + c_1 \\lambda + c_0`;
    const step2 = `\\text{Where } c_3 = -\\operatorname{tr}(A) = -(${tr.toTex()}), \\quad c_0 = \\det(-A) = (-1)^4 \\det(A) = ${detA.toTex()}`;
    const step3 = `\\text{Calculated via Faddeev–LeVerrier / Laplace expansion: } ${polynomialStr}`;

    determinantExpansionTex.push(step1, step2, step3);
    expansionExplanation = "For a 4×4 matrix, the polynomial coefficients are computed using the exact Faddeev–LeVerrier algorithm and Laplace expansion.";
  }

  // Calculate required powers A^1, A^2, ..., A^n
  const powers: MatrixPowerCalculation[] = [];
  powers.push({
    power: 1,
    expression: "A^1 = A",
    matrix: A,
  });

  let currentMat = A;
  for (let p = 2; p <= n; p++) {
    const prevPow = p - 1;
    const { steps, result } = MatrixMath.multiply(currentMat, A);
    powers.push({
      power: p,
      expression: p === 2 ? "A^2 = A \\times A" : `A^{${p}} = A^{${prevPow}} \\times A`,
      matrix: result,
      detail: { steps, result },
    });
    currentMat = result;
  }

  // Scaled terms: c_n A^n + c_{n-1} A^{n-1} + ... + c_0 I
  const scaledTerms: ScaledTermCalculation[] = [];
  for (let i = 0; i <= n; i++) {
    const power = n - i;
    const coeff = coefficients[i];
    if (coeff.isZero()) continue;

    let mat: Matrix;
    if (power === 0) {
      mat = I;
    } else {
      mat = powers.find((p) => p.power === power)!.matrix;
    }

    const scaled = MatrixMath.scale(mat, coeff);
    let label = "";
    if (power === 0) {
      label = coeff.isOne() ? "I" : `${coeff.toTex()}I`;
    } else if (power === 1) {
      label = coeff.isOne() ? "A" : `${coeff.toTex()}A`;
    } else {
      label = coeff.isOne() ? `A^{${power}}` : `${coeff.toTex()}A^{${power}}`;
    }

    scaledTerms.push({
      power,
      coeff,
      label,
      matrix: scaled,
    });
  }

  // Sum all scaled terms
  let finalMatrix = MatrixMath.zero(n);
  for (const st of scaledTerms) {
    finalMatrix = MatrixMath.add(finalMatrix, st.matrix);
  }

  const isVerified = MatrixMath.isZeroMatrix(finalMatrix);
  const finalMatrixTex = MatrixMath.toTex(finalMatrix);

  // Sample cell breakdowns (Cell (1,1) and Cell (1,2) or (2,2) for demonstration)
  const sampleCellBreakdowns: CellVerificationBreakdown[] = [];
  const sampleIndices = [
    { r: 0, c: 0 },
    { r: 0, c: Math.min(1, n - 1) },
    { r: Math.min(1, n - 1), c: Math.min(1, n - 1) },
  ];

  for (const idx of sampleIndices) {
    const terms: { label: string; value: Fraction }[] = [];
    let sum = Fraction.zero();

    for (const st of scaledTerms) {
      const val = st.matrix[idx.r][idx.c];
      terms.push({ label: `(${st.label})_{${idx.r + 1}${idx.c + 1}}`, value: val });
      sum = sum.add(val);
    }

    sampleCellBreakdowns.push({
      row: idx.r + 1,
      col: idx.c + 1,
      terms,
      sum,
    });
  }

  // Bonus: Inverse Matrix via Cayley-Hamilton if det != 0
  let inverseFormulaTex: string | undefined;
  let inverseMatrix: Matrix | undefined;
  let inverseMatrixTex: string | undefined;

  const c0 = coefficients[n];
  if (!c0.isZero()) {
    // p(A) = A^n + c_{n-1}A^{n-1} + ... + c_1 A + c_0 I = 0
    // c_0 I = -(A^n + c_{n-1}A^{n-1} + ... + c_1 A)
    // A^-1 = (-1/c_0) * (A^{n-1} + c_{n-1}A^{n-2} + ... + c_1 I)
    const factor = c0.neg(); // -c0 in denominator
    const innerTermsTex: string[] = [];
    let innerSum = MatrixMath.zero(n);

    for (let i = 0; i < n; i++) {
      const power = n - 1 - i;
      const coeff = coefficients[i]; // coeff of lambda^(power+1)
      if (coeff.isZero()) continue;

      let termMat: Matrix;
      let termTex = "";

      if (power === 0) {
        termMat = I;
        termTex = coeff.isOne() ? "I" : `${coeff.toTex()}I`;
      } else if (power === 1) {
        termMat = powers.find((p) => p.power === 1)!.matrix;
        termTex = coeff.isOne() ? "A" : `${coeff.toTex()}A`;
      } else {
        termMat = powers.find((p) => p.power === power)!.matrix;
        termTex = coeff.isOne() ? `A^{${power}}` : `${coeff.toTex()}A^{${power}}`;
      }

      const scaled = MatrixMath.scale(termMat, coeff);
      innerSum = MatrixMath.add(innerSum, scaled);

      const sign = coeff.isNegative() ? " - " : (innerTermsTex.length === 0 ? "" : " + ");
      innerTermsTex.push(`${sign}${termTex.replace(/^-/, "")}`);
    }

    // multiply innerSum by 1 / factor
    const invScalar = Fraction.one().div(factor);
    inverseMatrix = MatrixMath.scale(innerSum, invScalar);
    inverseMatrixTex = MatrixMath.toTex(inverseMatrix);

    inverseFormulaTex = `A^{-1} = -\\frac{1}{${c0.toTex()}} \\left( ${innerTermsTex.join("").trim()} \\right)`;
  }

  return {
    n,
    A,
    texA,
    I,
    texI,
    lambdaMinusA_Tex,
    determinantExpansionTex,
    expansionExplanation,
    coefficients,
    polynomialTex,
    equationTex,
    matrixEquationTex,
    powers,
    scaledTerms,
    sampleCellBreakdowns,
    finalMatrix,
    finalMatrixTex,
    isVerified,
    inverseFormulaTex,
    inverseMatrix,
    inverseMatrixTex,
  };
}
