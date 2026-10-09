"use client";

import React, { useEffect } from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { MatrixDisplay } from "../MatrixDisplay";
import { MathView } from "../MathView";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  XCircle,
  Printer,
  RotateCcw,
  BookOpen,
  Sparkles,
  Download,
  Lightbulb,
} from "lucide-react";

interface StepProps {
  result: CayleyHamiltonResult;
  onVerifyAnother: () => void;
  onViewFullSolution: () => void;
  onPrintReport: () => void;
}

export const Step8VerificationResult: React.FC<StepProps> = ({
  result,
  onVerifyAnother,
  onViewFullSolution,
  onPrintReport,
}) => {
  const {
    A,
    polynomialTex,
    equationTex,
    matrixEquationTex,
    finalMatrix,
    isVerified,
    inverseFormulaTex,
    inverseMatrix,
  } = result;

  useEffect(() => {
    if (isVerified) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b"],
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  }, [isVerified]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-8">
      {/* Prominent Verification Status Card */}
      {isVerified ? (
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-lg space-y-4 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white stroke-[2.5]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest font-bold text-emerald-100">
              Theoretical Milestone Achieved
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              ✓ CAYLEY-HAMILTON THEOREM VERIFIED
            </h2>
            <div className="text-lg sm:text-xl font-serif pt-1 text-white/95">
              <MathView math="p(A) = \mathbf{O}" className="text-white brightness-200" />
            </div>
          </div>

          <p className="max-w-xl mx-auto text-sm text-emerald-50/90 leading-relaxed">
            "The matrix satisfies its own characteristic equation. Therefore, the Cayley-Hamilton theorem is verified for this matrix."
          </p>
        </div>
      ) : (
        <div className="p-6 md:p-8 rounded-2xl bg-rose-50 border border-rose-200 text-slate-800 shadow-sm space-y-3 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-100 text-rose-600">
            <XCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-rose-900">
            Verification could not be confirmed.
          </h2>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Floating-point precision limits or invalid non-square matrix inputs may be responsible. Ensure valid numbers and try again.
          </p>
        </div>
      )}

      {/* Complete Verification Summary Sheet */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Verification Summary Sheet
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800">
            Status: Confirmed Zero Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Original Matrix:
              </p>
              <div className="mt-1">
                <MatrixDisplay matrix={A} label="A" size="md" />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Characteristic Polynomial:
              </p>
              <div className="text-sm font-serif font-bold text-slate-800 mt-1">
                <MathView math={polynomialTex} />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Characteristic Equation:
              </p>
              <div className="text-sm font-serif font-bold text-slate-800 mt-1">
                <MathView math={equationTex} />
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Matrix Polynomial Equation:
              </p>
              <div className="text-sm font-serif font-bold text-indigo-900 mt-1">
                <MathView math={matrixEquationTex} />
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Final Result Matrix:
              </p>
              <div className="mt-1">
                <MatrixDisplay matrix={finalMatrix} size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bonus Application: Matrix Inverse via Cayley-Hamilton */}
      {inverseFormulaTex && inverseMatrix && (
        <div className="p-5 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-3">
          <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
            <Lightbulb className="w-4 h-4 text-indigo-600" />
            <span>Bonus Practical Application: Matrix Inverse <MathView math="A^{-1}" /></span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Because <MathView math="\det(A) \neq 0" />, we can rearrange the Cayley-Hamilton equation to compute the matrix inverse directly without row reductions:
          </p>
          <div className="p-3 bg-white rounded-lg border border-indigo-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs font-serif font-medium text-slate-800">
              <MathView math={inverseFormulaTex} block={false} />
            </div>
            <MatrixDisplay matrix={inverseMatrix} label="A^{-1}" size="sm" />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onVerifyAnother}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xs transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Verify Another Matrix
        </button>

        <button
          type="button"
          onClick={onViewFullSolution}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-slate-600" />
          View Full Solution
        </button>

        <button
          type="button"
          onClick={onPrintReport}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-sm transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Print Report
        </button>
      </div>
    </div>
  );
};
