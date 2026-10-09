"use client";

import React from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { MatrixDisplay } from "../MatrixDisplay";
import { MathView } from "../MathView";
import { Plus, Equal, Calculator } from "lucide-react";

interface StepProps {
  result: CayleyHamiltonResult;
}

export const Step7FinalSubstitution: React.FC<StepProps> = ({ result }) => {
  const { scaledTerms, sampleCellBreakdowns, finalMatrix, matrixEquationTex } = result;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Stage 7 of 8
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            Term-by-Term Scalar Scaling & Summation
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Multiply each matrix power by its polynomial coefficient and compute the matrix sum.
          </p>
        </div>
      </div>

      {/* Target Matrix Expression */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Target Matrix Polynomial Expression
        </span>
        <MathView
          math={matrixEquationTex.replace(" = \\mathbf{O}", "")}
          block
          className="text-lg md:text-xl font-bold text-slate-800"
        />
      </div>

      {/* Component Matrices List */}
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Individual Evaluated Matrix Terms:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scaledTerms.map((term, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs"
            >
              <div className="space-y-1 text-center sm:text-left">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100">
                  Term {idx + 1}
                </span>
                <p className="text-sm font-bold text-slate-800">
                  <MathView math={`\\text{Term: } ${term.label}`} />
                </p>
                <p className="text-xs text-slate-500">
                  {term.power === 0
                    ? `Scalar ${term.coeff.toTex()} × Identity Matrix I`
                    : `Scalar ${term.coeff.toTex()} × Matrix A^${term.power}`}
                </p>
              </div>

              <MatrixDisplay
                matrix={term.matrix}
                label={term.label}
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cell-by-Cell Summation Verification Showcase */}
      <div className="p-5 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-3">
        <div className="flex items-center gap-2 text-indigo-950 font-semibold text-xs uppercase tracking-wider">
          <Calculator className="w-4 h-4 text-indigo-600" />
          <span>Cell-by-Cell Arithmetic Demonstration</span>
        </div>
        <p className="text-xs text-slate-600">
          Observe how adding the corresponding entries across all component matrices cancels to zero:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleCellBreakdowns.map((b, idx) => {
            const sumExpr = b.terms.map((t) => t.value.toTex()).join(" + ").replace(/\+ -/g, "- ");
            return (
              <div
                key={idx}
                className="p-3 bg-white rounded-xl border border-indigo-100 shadow-2xs text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                  <span>Entry ({b.row}, {b.col})</span>
                  <span className="font-bold text-emerald-600">= 0</span>
                </div>
                <div className="overflow-x-auto font-mono text-slate-700 text-xs py-1">
                  <MathView math={`${sumExpr} = ${b.sum.toTex()}`} block={false} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resulting Matrix Sum Display */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Final Matrix Summation
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-white">
          <div className="text-sm md:text-base font-serif">
            <MathView
              math={matrixEquationTex.replace(" = \\mathbf{O}", "").replace("p(A) = ", "")}
              block={false}
              className="text-white brightness-200"
            />
          </div>
          <Equal className="w-6 h-6 text-indigo-400 shrink-0" />
          <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
            <MatrixDisplay matrix={finalMatrix} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
};
