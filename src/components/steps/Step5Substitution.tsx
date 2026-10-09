"use client";

import React from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { MathView } from "../MathView";
import { ArrowRight, HelpCircle, RefreshCw } from "lucide-react";

interface StepProps {
  result: CayleyHamiltonResult;
}

export const Step5Substitution: React.FC<StepProps> = ({ result }) => {
  const { n, polynomialTex, equationTex, matrixEquationTex } = result;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Stage 5 of 8
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            The Cayley-Hamilton Substitution (<MathView math="\lambda \to A" />)
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Substitute the matrix <MathView math="A" /> into its own characteristic polynomial.
          </p>
        </div>
      </div>

      {/* Theorem Formal Statement Box */}
      <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          The Formal Cayley-Hamilton Theorem
        </p>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
          <p className="text-xs text-slate-600">
            If the characteristic polynomial of an <MathView math="n \times n" /> matrix <MathView math="A" /> is:
          </p>
          <MathView
            math="p(\lambda) = \lambda^n + c_{n-1}\lambda^{n-1} + \dots + c_1\lambda + c_0"
            block
            className="text-base font-semibold"
          />
          <p className="text-xs text-slate-600">
            Then, according to the Cayley-Hamilton theorem, replacing scalar <MathView math="\lambda" /> with matrix <MathView math="A" /> yields:
          </p>
          <MathView
            math="p(A) = A^n + c_{n-1}A^{n-1} + \dots + c_1 A + c_0 I = \mathbf{O}"
            block
            className="text-lg font-bold text-indigo-700"
          />
        </div>
      </div>

      {/* Concrete Substitution for this matrix */}
      <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-4">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-800">
          Applied Substitution For Your Matrix
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="p-4 bg-white rounded-xl border border-indigo-100 shadow-2xs text-center flex-1">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
              Scalar Polynomial in λ
            </span>
            <MathView math={polynomialTex.replace("p(\\lambda) = ", "")} block className="text-base font-semibold text-slate-800" />
          </div>

          <div className="flex flex-col items-center justify-center text-indigo-600">
            <RefreshCw className="w-5 h-5 animate-pulse" />
            <span className="text-[10px] font-bold uppercase mt-1">Replace λ with A</span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-indigo-200 shadow-2xs text-center flex-1">
            <span className="text-[11px] font-semibold text-indigo-600 block mb-1">
              Matrix Polynomial in A
            </span>
            <MathView
              math={matrixEquationTex.replace(" = \\mathbf{O}", "").replace("p(A) = ", "")}
              block
              className="text-base font-bold text-indigo-950"
            />
          </div>
        </div>

        <div className="text-center pt-2">
          <span className="text-xs text-indigo-900 font-medium">
            Goal: Evaluate each term and verify that the sum equals the zero matrix <MathView math="\mathbf{O}" />.
          </span>
        </div>
      </div>

      {/* Two Essential Educational Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
          <p className="font-semibold text-slate-800 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
            Why replace λ with A?
          </p>
          <p className="leading-relaxed">
            The Cayley-Hamilton theorem states that every square matrix satisfies its own characteristic polynomial. Therefore, substituting the matrix into the polynomial must produce the zero matrix <MathView math="\mathbf{O}" />.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
          <p className="font-semibold text-slate-800 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0" />
            Why does constant c₀ become c₀I?
          </p>
          <p className="leading-relaxed">
            In matrix algebra, you cannot add a bare scalar to a matrix. Because <MathView math="A^0 = I" /> (the identity matrix), the constant term <MathView math="c_0" /> is multiplied by <MathView math="I_n" /> so all terms have dimension <MathView math="n \times n" />.
          </p>
        </div>
      </div>
    </div>
  );
};
