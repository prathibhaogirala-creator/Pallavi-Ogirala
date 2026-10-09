export interface MatrixExample {
  id: string;
  title: string;
  subtitle: string;
  size: number;
  data: number[][];
  description: string;
  tags: string[];
}

export const MATRIX_EXAMPLES: MatrixExample[] = [
  {
    id: "ex1-2x2",
    title: "Example 1: Upper Triangular 2×2",
    subtitle: "Classic Introductory Example",
    size: 2,
    data: [
      [2, 1],
      [0, 3],
    ],
    description: "Features distinct integer eigenvalues λ₁ = 2, λ₂ = 3. Notice det(λI - A) = λ² - 5λ + 6.",
    tags: ["2×2", "Beginner", "Triangular"],
  },
  {
    id: "ex2-3x3",
    title: "Example 2: Standard 3×3 College Exam Matrix",
    subtitle: "Prominent Textbook Problem",
    size: 3,
    data: [
      [1, 2, 3],
      [0, 1, 4],
      [5, 6, 0],
    ],
    description: "Standard engineering exam matrix with mixed elements. Demonstrates full 3×3 power expansions A² and A³.",
    tags: ["3×3", "Intermediate", "Exam Standard"],
  },
  {
    id: "ex3-3x3",
    title: "Example 3: Sparse Matrix with Cyclic Band",
    subtitle: "Sparse 3×3 with Zeros",
    size: 3,
    data: [
      [2, 1, 0],
      [0, 3, 1],
      [1, 0, 2],
    ],
    description: "Contains zero entries which simplify minor evaluations during determinant expansion.",
    tags: ["3×3", "Sparse", "Zero Entries"],
  },
  {
    id: "ex4-negative",
    title: "Example 4: Negative Values Matrix",
    subtitle: "Handling Negative Signs",
    size: 3,
    data: [
      [-1, 4, -2],
      [2, -3, 1],
      [-4, 0, 5],
    ],
    description: "Tests sign handling during polynomial subtraction and scalar multiplication (-c·A).",
    tags: ["3×3", "Negative Numbers"],
  },
  {
    id: "ex5-nilpotent",
    title: "Example 5: Nilpotent Shift Matrix",
    subtitle: "p(λ) = λ³",
    size: 3,
    data: [
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0],
    ],
    description: "All eigenvalues are 0. The characteristic polynomial is p(λ) = λ³, meaning A³ is identically the zero matrix.",
    tags: ["3×3", "Nilpotent", "Conceptual"],
  },
  {
    id: "ex6-symmetric",
    title: "Example 6: Discrete Laplacian (Tridiagonal)",
    subtitle: "Vibrations & Control Systems",
    size: 3,
    data: [
      [2, -1, 0],
      [-1, 2, -1],
      [0, -1, 2],
    ],
    description: "Symmetric positive-definite matrix frequently encountered in structural dynamics and finite difference methods.",
    tags: ["3×3", "Symmetric", "Engineering"],
  },
  {
    id: "ex7-4x4",
    title: "Example 7: 4×4 Coupled System",
    subtitle: "Higher-Order Verification",
    size: 4,
    data: [
      [1, 0, 2, 0],
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 2, 0, 1],
    ],
    description: "Demonstrates verification for degree 4 polynomial: A⁴ + c₃A³ + c₂A² + c₁A + c₀I = O.",
    tags: ["4×4", "Advanced"],
  },
  {
    id: "ex8-diagonal",
    title: "Example 8: Simple Diagonal 2×2",
    subtitle: "Decoupled Systems",
    size: 2,
    data: [
      [3, 0],
      [0, -2],
    ],
    description: "Diagonal matrices verify with decoupled diagonal arithmetic: diag(λ₁², λ₂²) - tr·diag(λ₁, λ₂) + det·I = O.",
    tags: ["2×2", "Diagonal"],
  },
];
