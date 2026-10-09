# Cayley-Hamilton Theorem Verification Tool

> **"Enter a Matrix. Verify the Theorem. Understand Every Step."**

An interactive, university-grade educational web application designed for students and educators to verify the **Cayley-Hamilton Theorem** step-by-step with complete algebraic transparency and exact rational arithmetic.

---

## 1. Problem Statement

Standard matrix calculators act as black boxes: a student enters a matrix and instantly receives eigenvalues, a determinant, or an inverse without seeing the underlying derivations. 

When studying linear algebra, engineering mathematics, and control systems, understanding **how and why** every square matrix satisfies its own characteristic equation is vital. Without clear intermediate derivations—such as forming $\lambda I - A$, performing row cofactor determinant expansions, computing matrix powers $A^2, A^3$ via dot products, and executing term-by-term scalar additions—students struggle to connect abstract theorems to computational practice.

---

## 2. Project Objective

- Teach the Cayley-Hamilton theorem through step-by-step interactive derivations rather than single-number outputs.
- Eliminate numerical precision errors on integer and rational matrices by implementing an exact rational BigInt mathematics engine.
- Present textbook-grade LaTeX notation for all formulas, matrices, and expansions using KaTeX.
- Provide a printable academic report that students and instructors can download or save as a PDF assignment sheet.

---

## 3. Mathematical Concept & Theorem

### The Cayley-Hamilton Theorem
Every square matrix over a commutative ring (such as the field of real or complex numbers) satisfies its own characteristic polynomial.

### Mathematical Formulation
Let $A \in \mathbb{R}^{n \times n}$ be an $n \times n$ square matrix. Its **characteristic polynomial** is defined as:

$$p(\lambda) = \det(\lambda I_n - A) = \lambda^n + c_{n-1}\lambda^{n-1} + c_{n-2}\lambda^{n-2} + \dots + c_1\lambda + c_0$$

where:
- $I_n$ is the $n \times n$ identity matrix.
- $\lambda$ is a scalar parameter.
- $c_{n-1} = -\operatorname{tr}(A)$.
- $c_0 = (-1)^n \det(A)$.

The corresponding **characteristic equation** is:

$$p(\lambda) = 0$$

According to the **Cayley-Hamilton Theorem**, replacing the scalar $\lambda$ with the matrix $A$, and replacing the scalar constant $c_0$ with the scalar multiple $c_0 I_n$, produces the zero matrix $\mathbf{O}_{n \times n}$:

$$p(A) = A^n + c_{n-1}A^{n-1} + c_{n-2}A^{n-2} + \dots + c_1 A + c_0 I_n = \mathbf{O}$$

---

## 4. Key Features

- **Dynamic Matrix Input Grid:** Supports dimensions $2 \times 2$, $3 \times 3$, and $4 \times 4$. Supports positive integers, negative integers, decimals (e.g. `1.5`), fractions (e.g. `3/4`), and zeroes.
- **8-Stage Educational Roadmap:**
  1. **Input Matrix $A$:** Matrix display, trace, determinant, and invertibility status.
  2. **Construct $\lambda I - A$:** Identity matrix $I_n$, scalar multiplication $\lambda I_n$, and subtraction formulation.
  3. **Characteristic Polynomial:** Full determinant expansion and extraction of coefficients.
  4. **Characteristic Equation:** Transition from polynomial to equation $p(\lambda) = 0$ with eigenvalue context.
  5. **Cayley-Hamilton Substitution:** Substitution rule $\lambda \to A$ and $c_0 \to c_0 I$.
  6. **Matrix Power Calculations:** Sequential matrix products ($A^2 = A \times A$, $A^3 = A^2 \times A$, $A^4 = A^3 \times A$) with interactive row-by-column dot product breakdowns.
  7. **Term-by-Term Scalar Scaling & Summation:** Individual scaled matrix evaluation and cell-by-cell arithmetic demonstration.
  8. **Verification Result & Success Card:** Prominent verification card ($p(A) = \mathbf{O}$), celebratory confetti, and derived application to compute the matrix inverse $A^{-1}$.
- **Curated Benchmark Examples:** 8 preset matrices including upper triangular, standard exam problems, sparse matrices, negative numbers, nilpotent matrices, symmetric Laplacians, and $4 \times 4$ coupled systems.
- **Academic Printable Report:** Generates an assignment-style verification sheet formatted for `window.print()` and PDF export.
- **Local History:** Saves verified matrices in browser `localStorage` with size, timestamp, and one-click reloading.
- **Comprehensive Theory Reference:** Detailed explanations of theorem statements, proofs, and engineering applications (control systems, state-space representations $e^{At}$, and coupled ODEs).

---

## 5. Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Frontend Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Mathematical Typography:** [KaTeX](https://katex.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Celebration Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Runtime:** 100% Client-side execution (no backend dependencies, complete privacy, zero latency)

---

## 6. System Architecture & Algorithms

### Exact Rational Engine (`Fraction`)
All matrix values and calculations are stored as exact rational numbers:

$$\frac{\text{num}}{\text{den}}, \quad \text{num}, \text{den} \in \mathbb{Z} \quad (\text{BigInt})$$

Greatest Common Divisor (Euclidean algorithm) reduction occurs at every operation (`add`, `sub`, `mul`, `div`), completely avoiding IEEE-754 floating-point drift.

### Characteristic Polynomial Computation
- For $2 \times 2$ matrices: direct symbolic minor expansion $(a \cdot d - b \cdot c)$.
- For $3 \times 3$ matrices: Laplace cofactor expansion along Row 1 with trace, principal minor, and determinant verification.
- For $4 \times 4$ matrices: exact **Faddeev–LeVerrier Algorithm**:
  $$\begin{aligned}
  M_0 &= I \\
  B_k &= A \cdot M_{k-1} \\
  p_k &= \frac{1}{k} \operatorname{tr}(B_k) \\
  M_k &= B_k - p_k I \\
  c_{n-k} &= -p_k
  \end{aligned}$$

---

## 7. How to Run Locally

### Prerequisites
- Node.js (v18.0 or newer; tested on Node v22)
- npm (v9.0 or newer)

### Installation & Launch
```bash
# 1. Clone repository
git clone <repository-url>
cd "cayley hamilton verefier tool"

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000 (or the port specified in terminal)
```

### Production Build
```bash
npm run build
npm run start
```

---

## 8. Future Enhancements

- **Eigenvalue & Eigenvector Visualizer:** Visual 2D/3D transformation plots of invariant eigenspaces.
- **Symbolic Algebra Mode:** Support for parametric variables (e.g. $k, \alpha, \theta$).
- **Matrix Sizes beyond $4 \times 4$:** Support for general $n \times n$ matrices with sparse solver optimization.
- **Minimal Polynomial Calculator:** Compute the minimal polynomial $m(\lambda)$ and determine matrix diagonalizability.
- **Jordan Canonical Form:** Decomposition into Jordan blocks when algebraic and geometric multiplicities differ.
- **AI-Powered Pedagogical Explainer:** Natural language explanations for individual college curriculum standards.
- **Voice-Based Mathematical Input:** Dictate matrix equations naturally.
- **Multiple Theorem Suite:** Expand to Sylvester's Rank Theorem, Perron-Frobenius, and Spectral Decomposition.

---

## 9. License

Open-source educational software created for students and educators worldwide.
