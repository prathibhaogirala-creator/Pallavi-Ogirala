"use client";

import React from "react";
import { MathView } from "./MathView";
import {
  BookOpen,
  Sparkles,
  Layers,
  Cpu,
  Compass,
  ArrowRight,
  Calculator,
  CheckCircle,
} from "lucide-react";

export const TheorySection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* Overview Banner */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-xs">
            <BookOpen className="w-3.5 h-3.5" />
            Engineering Mathematics Reference
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            The Cayley-Hamilton Theorem
          </h1>
          <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
            Named after British mathematicians Arthur Cayley and William Rowan Hamilton, this foundational theorem is one of the most powerful results in linear algebra and modern control theory.
          </p>
        </div>
      </div>

      {/* 1. Formal Statement */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          Section 1
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Formal Statement of the Theorem
        </h2>
        <div className="p-5 rounded-xl bg-slate-50 border-l-4 border-indigo-600 text-slate-800 space-y-3">
          <p className="text-sm italic font-medium leading-relaxed">
            "Every square matrix satisfies its own characteristic polynomial."
          </p>
          <div className="text-slate-700 text-sm">
            That is, if <MathView math="A \in \mathbb{R}^{n \times n}" /> is an <MathView math="n \times n" /> square matrix, and its characteristic polynomial is:
          </div>
          <MathView
            math="p(\lambda) = \det(\lambda I - A) = \lambda^n + c_{n-1}\lambda^{n-1} + \dots + c_1\lambda + c_0"
            block
            className="text-base font-semibold text-indigo-950"
          />
          <div className="text-slate-700 text-sm">
            Then replacing the scalar parameter <MathView math="\lambda" /> with the matrix <MathView math="A" /> gives:
          </div>
          <MathView
            math="p(A) = A^n + c_{n-1}A^{n-1} + \dots + c_1 A + c_0 I = \mathbf{O}"
            block
            className="text-lg font-bold text-indigo-700"
          />
          <p className="text-xs text-slate-500">
            where <MathView math="I" /> is the <MathView math="n \times n" /> identity matrix and <MathView math="\mathbf{O}" /> is the <MathView math="n \times n" /> zero matrix.
          </p>
        </div>
      </div>

      {/* 2. Step-by-Step Verification Methodology */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <Calculator className="w-4 h-4" />
          Section 2
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          How Verification Works in Practice
        </h2>
        <p className="text-sm text-slate-600">
          To verify the theorem for any concrete square matrix <MathView math="A" />, mathematicians follow an eight-step pipeline:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-700">1. Matrix Specification</span>
            <p className="text-slate-600">Verify matrix <MathView math="A" /> is square with dimensions <MathView math="n \times n" />.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-700">2. Characteristic Matrix</span>
            <p className="text-slate-600">Form <MathView math="\lambda I - A" /> by subtracting entries of <MathView math="A" /> from diagonal <MathView math="\lambda" />.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-700">3. Determinant Expansion</span>
            <p className="text-slate-600">Expand <MathView math="\det(\lambda I - A)" /> to compute coefficients <MathView math="c_{n-1}, \dots, c_0" />.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-700">4. Characteristic Equation</span>
            <p className="text-slate-600">Equate <MathView math="p(\lambda) = 0" /> whose roots are the eigenvalues of <MathView math="A" />.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-700">5. Matrix Substitution</span>
            <p className="text-slate-600">Replace scalar variable <MathView math="\lambda \to A" /> and scalar constant <MathView math="c_0 \to c_0 I" />.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-700">6. Power Multiplication</span>
            <p className="text-slate-600">Sequentially evaluate powers <MathView math="A^2 = A \cdot A" />, <MathView math="A^3 = A^2 \cdot A" />, up to <MathView math="A^n" />.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-700">7. Component Scaling & Sum</span>
            <p className="text-slate-600">Multiply each power by its polynomial coefficient and add element-by-element.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="font-bold text-indigo-700">8. Zero Verification</span>
            <p className="text-slate-600">Confirm every single element in the resulting sum evaluates identically to zero.</p>
          </div>
        </div>
      </div>

      {/* 3. Major Practical Engineering Applications */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          Section 3
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          Crucial Engineering Applications
        </h2>
        <p className="text-sm text-slate-600">
          The theorem is not just an abstract algebraic curiosity. It is an indispensable engineering tool used worldwide in:
        </p>

        <div className="space-y-4 text-sm">
          {/* App 1: Matrix Inversion */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              1. Calculating Matrix Inverses <MathView math="A^{-1}" />
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              If <MathView math="\det(A) \neq 0" />, then <MathView math="c_0 \neq 0" />. From <MathView math="A^n + c_{n-1}A^{n-1} + \dots + c_1 A + c_0 I = \mathbf{O}" />, we isolate <MathView math="I" />:
            </p>
            <MathView
              math="A^{-1} = -\frac{1}{c_0}\left(A^{n-1} + c_{n-1}A^{n-2} + \dots + c_1 I\right)"
              block
              className="text-sm font-semibold"
            />
            <p className="text-xs text-slate-500">
              This provides a closed-form formula for <MathView math="A^{-1}" /> using powers already calculated, bypassing Gaussian elimination!
            </p>
          </div>

          {/* App 2: High Matrix Powers */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              2. Computing Large Matrix Powers <MathView math="A^k" /> (for <MathView math="k \gg n" />)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Any power <MathView math="A^k" /> can be divided by polynomial <MathView math="p(A)" />: <MathView math="A^k = q(A)p(A) + r(A)" />. Since <MathView math="p(A) = \mathbf{O}" />, we have:
            </p>
            <MathView math="A^k = r(A) = \alpha_{n-1} A^{n-1} + \dots + \alpha_1 A + \alpha_0 I" block className="text-sm font-semibold" />
            <p className="text-xs text-slate-500">
              For example, computing <MathView math="A^{100}" /> for a <MathView math="3 \times 3" /> matrix reduces to a linear combination of just <MathView math="A^2" />, <MathView math="A" />, and <MathView math="I" />!
            </p>
          </div>

          {/* App 3: Control Systems & State-Space */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              3. Modern Control Systems & State Transition Matrix <MathView math="e^{At}" />
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In linear control theory, continuous-time systems are modeled as <MathView math="\dot{x}(t) = Ax(t) + Bu(t)" />. The solution depends on the matrix exponential <MathView math="e^{At}" />. Using Cayley-Hamilton, <MathView math="e^{At}" /> is expressed exactly as a finite sum:
            </p>
            <MathView math="e^{At} = \sum_{j=0}^{n-1} \alpha_j(t) A^j" block className="text-sm font-semibold" />
          </div>

          {/* App 4: Systems of Differential Equations */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              4. Coupled Ordinary Differential Equations (ODEs)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Simultaneous coupled mechanical vibrations and multi-loop electrical circuits translate to matrix differential equations. Cayley-Hamilton simplifies decoupling and modal analysis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
