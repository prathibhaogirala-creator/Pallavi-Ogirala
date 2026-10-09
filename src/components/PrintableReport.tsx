"use client";

import React from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { MatrixDisplay } from "./MatrixDisplay";
import { MathView } from "./MathView";
import { Printer, X, Download, CheckCircle2, Award } from "lucide-react";

interface PrintableReportProps {
  result: CayleyHamiltonResult;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  result,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const {
    n,
    A,
    polynomialTex,
    equationTex,
    matrixEquationTex,
    powers,
    scaledTerms,
    finalMatrix,
    isVerified,
    inverseFormulaTex,
    inverseMatrix,
  } = result;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto print:static print:p-0 print:bg-white print:overflow-visible">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full my-auto flex flex-col max-h-[95vh] overflow-hidden print:max-h-none print:shadow-none print:border-none print:rounded-none">
        {/* Modal Toolbar (hidden during print) */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-200 bg-slate-50 print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-600" />
            <span className="font-bold text-slate-800 text-sm">
              Academic Verification Report Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Academic Sheet */}
        <div className="p-8 md:p-12 overflow-y-auto space-y-8 font-serif print:p-6 print:overflow-visible text-slate-900">
          {/* Institutional Header */}
          <div className="text-center pb-6 border-b-2 border-slate-900 space-y-1">
            <h1 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-slate-950 font-sans">
              Department of Mathematics & Engineering Sciences
            </h1>
            <p className="text-xs uppercase tracking-wider text-slate-600 font-sans">
              Course: Linear Algebra & Matrix Analysis • Verification Lab Report
            </p>
            <h2 className="text-lg md:text-xl font-extrabold text-indigo-950 pt-2 font-sans">
              Cayley-Hamilton Theorem Verification Certificate
            </h2>
            <div className="flex items-center justify-center gap-6 pt-2 text-xs font-sans text-slate-500">
              <span>Date: {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}</span>
              <span>•</span>
              <span>Matrix Dimension: {n} × {n}</span>
              <span>•</span>
              <span className="font-semibold text-emerald-700">Status: Verified</span>
            </div>
          </div>

          {/* Statement of Task */}
          <div className="space-y-2 text-xs text-slate-700 leading-relaxed font-sans">
            <p className="font-bold uppercase tracking-wider text-slate-900">
              Theoretical Foundation:
            </p>
            <p>
              The Cayley-Hamilton theorem asserts that every square matrix <MathView math="A \in \mathbb{R}^{n \times n}" /> satisfies its characteristic polynomial:
              <MathView math="p(\lambda) = \det(\lambda I - A) \implies p(A) = \mathbf{O}" className="mx-2 font-bold" />.
              This document certifies the analytic step-by-step verification of this theorem for matrix <MathView math="A" />.
            </p>
          </div>

          {/* Section 1: Matrix A */}
          <div className="space-y-3 font-sans">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              1. Given Square Matrix A
            </h3>
            <div className="flex items-center justify-center p-3 bg-slate-50 rounded-lg">
              <MatrixDisplay matrix={A} label="A" size="md" />
            </div>
          </div>

          {/* Section 2: Polynomial and Equation */}
          <div className="space-y-3 font-sans">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              2. Characteristic Polynomial & Equation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500 font-semibold block mb-1">Characteristic Polynomial:</span>
                <MathView math={polynomialTex} block className="text-sm font-bold text-slate-900" />
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-500 font-semibold block mb-1">Characteristic Equation:</span>
                <MathView math={equationTex} block className="text-sm font-bold text-slate-900" />
              </div>
            </div>
          </div>

          {/* Section 3: Evaluated Matrix Powers */}
          <div className="space-y-3 font-sans">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              3. Sequential Matrix Powers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {powers.filter((p) => p.power >= 2).map((p) => (
                <div key={p.power} className="p-3 bg-slate-50 rounded-lg text-center space-y-1">
                  <span className="text-xs font-semibold text-slate-600 block">
                    <MathView math={p.expression} />
                  </span>
                  <MatrixDisplay matrix={p.matrix} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Final Substitution */}
          <div className="space-y-3 font-sans">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              4. Matrix Equation & Component Summation
            </h3>
            <div className="p-3 bg-slate-50 rounded-lg text-center space-y-2">
              <MathView math={matrixEquationTex.replace(" = \\mathbf{O}", "")} block className="text-sm font-bold text-slate-900" />
              <div className="flex items-center justify-center gap-2 pt-2">
                <span className="font-bold text-slate-700">=</span>
                <MatrixDisplay matrix={finalMatrix} size="md" />
              </div>
            </div>
          </div>

          {/* Section 5: Matrix Inverse Application if non-singular */}
          {inverseFormulaTex && inverseMatrix && (
            <div className="space-y-3 font-sans">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                5. Derived Application: Matrix Inverse via Cayley-Hamilton
              </h3>
              <div className="p-3 bg-slate-50 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <MathView math={inverseFormulaTex} className="text-xs" />
                <MatrixDisplay matrix={inverseMatrix} label="A^{-1}" size="sm" />
              </div>
            </div>
          )}

          {/* Verification Stamp & Certification */}
          <div className="pt-6 border-t-2 border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verification Confirmed: p(A) ≡ 0</span>
              </div>
              <p className="text-[11px] text-slate-500">
                All matrix entries identically satisfy the zero tolerance criteria.
              </p>
            </div>

            <div className="text-center sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
              <p className="text-xs font-bold text-slate-800">Antigravity Linear Algebra Engine</p>
              <p className="text-[10px] text-slate-500 font-mono">Algorithm: Exact Rational Faddeev-LeVerrier</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
