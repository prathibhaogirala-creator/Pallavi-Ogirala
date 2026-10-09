"use client";

import React from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { MatrixDisplay } from "../MatrixDisplay";
import { MathView } from "../MathView";
import { HelpCircle, ArrowRight } from "lucide-react";

interface StepProps {
  result: CayleyHamiltonResult;
}

export const Step2LambdaMinusA: React.FC<StepProps> = ({ result }) => {
  const { n, A, I, lambdaMinusA_Tex } = result;

  // Build symbolic lambda*I matrix
  const lambdaI_rows = Array.from({ length: n })
    .map((_, r) =>
      Array.from({ length: n })
        .map((_, c) => (r === c ? "\\lambda" : "0"))
        .join(" & ")
    )
    .join(" \\\\ ");
  const lambdaI_Tex = `\\begin{pmatrix} ${lambdaI_rows} \\end{pmatrix}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Stage 2 of 8
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            Construct the Characteristic Matrix <MathView math="(\lambda I - A)" />
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Multiply the identity matrix by scalar parameter <MathView math="\lambda" /> and subtract matrix <MathView math="A" />.
          </p>
        </div>
      </div>

      {/* Step Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Identity Matrix */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-500">1. Identity Matrix <MathView math="I" /></p>
          <MatrixDisplay matrix={I} label="I" size="md" />
        </div>

        {/* Lambda * I */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-500">2. Scaled Matrix <MathView math="\lambda I" /></p>
          <div className="inline-flex items-center justify-center p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
            <MathView math={`\\lambda I = ${lambdaI_Tex}`} />
          </div>
        </div>

        {/* Original Matrix A */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-500">3. Matrix to Subtract <MathView math="A" /></p>
          <MatrixDisplay matrix={A} label="A" size="md" />
        </div>
      </div>

      {/* Subtraction Equation */}
      <div className="p-6 rounded-xl bg-indigo-50/40 border border-indigo-100 text-center space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">
          Subtraction Formulation
        </p>
        <div className="overflow-x-auto py-2">
          <MathView
            math={`\\lambda I - A = ${lambdaI_Tex} - ${result.texA} = ${lambdaMinusA_Tex}`}
            block
            className="text-base sm:text-lg font-semibold"
          />
        </div>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          Notice how the parameter <MathView math="\lambda" /> is subtracted only from the diagonal entries <MathView math="(\lambda - a_{ii})" />, while off-diagonal entries are negated <MathView math="(-a_{ij})" />.
        </p>
      </div>

      {/* Beginner-friendly explanation */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-sm text-slate-700">
        <div className="flex items-center gap-2 text-slate-900 font-semibold">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>Why do we calculate <MathView math="\det(\lambda I - A)" />?</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The characteristic polynomial of a square matrix <MathView math="A" /> is defined as <MathView math="p(\lambda) = \det(\lambda I - A)" />. It encapsulates all fundamental algebraic invariants of the matrix (such as trace, determinant, and eigenvalues) into a single algebraic polynomial in variable <MathView math="\lambda" />.
        </p>
      </div>
    </div>
  );
};
