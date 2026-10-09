"use client";

import React from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { MatrixDisplay } from "../MatrixDisplay";
import { MathView } from "../MathView";
import { MatrixMath } from "@/lib/matrix";
import { Info, CheckCircle2 } from "lucide-react";

interface StepProps {
  result: CayleyHamiltonResult;
}

export const Step1OriginalMatrix: React.FC<StepProps> = ({ result }) => {
  const { A, n } = result;
  const trace = MatrixMath.trace(A);
  const det = MatrixMath.determinant(A);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Stage 1 of 8
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            The Input Matrix A
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Initial specification of the square matrix to be verified.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
            Dimension: {n} × {n}
          </span>
        </div>
      </div>

      {/* Main Matrix Presentation */}
      <div className="flex flex-col md:flex-row items-center justify-around gap-6 p-6 rounded-xl bg-slate-50/70 border border-slate-200/60">
        <div className="text-center">
          <p className="text-xs font-medium text-slate-500 mb-2">Original Matrix Form</p>
          <MatrixDisplay matrix={A} label="A" size="lg" highlightDiagonal />
        </div>

        {/* Fundamental Invariant Properties */}
        <div className="w-full md:w-auto space-y-3 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 text-sm">
          <p className="font-semibold text-slate-700 text-xs uppercase tracking-wider">
            Matrix Invariants
          </p>
          <div className="flex items-center justify-between gap-6 py-1.5 px-3 rounded-lg bg-white border border-slate-100 shadow-2xs">
            <span className="text-slate-600 font-medium">Trace tr(A):</span>
            <span className="font-mono font-bold text-indigo-700">
              <MathView math={`\\operatorname{tr}(A) = ${trace.toTex()}`} />
            </span>
          </div>
          <div className="flex items-center justify-between gap-6 py-1.5 px-3 rounded-lg bg-white border border-slate-100 shadow-2xs">
            <span className="text-slate-600 font-medium">Determinant det(A):</span>
            <span className="font-mono font-bold text-indigo-700">
              <MathView math={`\\det(A) = ${det.toTex()}`} />
            </span>
          </div>
          <div className="flex items-center justify-between gap-6 py-1.5 px-3 rounded-lg bg-white border border-slate-100 shadow-2xs">
            <span className="text-slate-600 font-medium">Invertibility:</span>
            <span className={`font-semibold text-xs px-2 py-0.5 rounded ${det.isZero() ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
              {det.isZero() ? "Singular (det = 0)" : "Non-Singular (det ≠ 0)"}
            </span>
          </div>
        </div>
      </div>

      {/* Educational Note */}
      <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 flex items-start gap-3 text-slate-700 text-sm">
        <Info className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-indigo-950">
            Why must the matrix be square?
          </p>
          <p className="text-slate-600 text-xs leading-relaxed">
            The Cayley-Hamilton theorem applies strictly to square matrices (<MathView math="n \times n" />). Matrix multiplication <MathView math="A \cdot A" /> and the concept of an identity matrix <MathView math="I_n" /> require equal row and column dimensions.
          </p>
        </div>
      </div>
    </div>
  );
};
