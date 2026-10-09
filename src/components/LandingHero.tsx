"use client";

import React from "react";
import { ArrowRight, Sparkles, BookOpen, Layers, CheckCircle2, Sigma } from "lucide-react";
import { MathView } from "./MathView";

interface LandingHeroProps {
  onStartVerification: () => void;
  onTryDemo: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartVerification,
  onTryDemo,
}) => {
  return (
    <div className="space-y-12 py-6 sm:py-10">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Engineering Linear Algebra Workbench</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Cayley-Hamilton Theorem{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900">
            Verification Tool
          </span>
        </h1>

        <p className="text-lg sm:text-xl font-medium text-slate-700">
          Verify that every square matrix satisfies its own characteristic equation.
        </p>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The Cayley-Hamilton theorem states that every square matrix satisfies its own characteristic polynomial. Enter a matrix below and follow the complete verification process.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={onStartVerification}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-md shadow-indigo-200 hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>Start Verification</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onTryDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Try Demo (3×3)</span>
          </button>
        </div>

        {/* Mathematical statement teaser badge */}
        <div className="pt-2">
          <span className="inline-block text-xs font-serif font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200/60">
            Theorem: <MathView math="p(A) = A^n + c_{n-1}A^{n-1} + \dots + c_0 I = \mathbf{O}" className="font-bold text-slate-700 mx-1" />
          </span>
        </div>
      </div>

      {/* Three Required Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Card 1 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sigma className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-base font-bold text-slate-900">
            1. Characteristic Polynomial
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Find the characteristic polynomial of your matrix. Expand <MathView math="\det(\lambda I - A)" /> dynamically and identify the exact polynomial coefficients.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Layers className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-base font-bold text-slate-900">
            2. Step-by-Step Calculation
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Understand every mathematical step instead of receiving only the final answer. Follow all 8 stages from matrix powers <MathView math="A^2, A^3" /> to dot products.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <h2 className="text-base font-bold text-slate-900">
            3. Automatic Verification
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Substitute the matrix into its characteristic equation and verify that the result is the zero matrix <MathView math="\mathbf{O}" /> with exact rational precision.
          </p>
        </div>
      </div>
    </div>
  );
};
