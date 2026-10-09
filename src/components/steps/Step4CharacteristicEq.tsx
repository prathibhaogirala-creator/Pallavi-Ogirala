"use client";

import React from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { MathView } from "../MathView";
import { HelpCircle, Equal } from "lucide-react";

interface StepProps {
  result: CayleyHamiltonResult;
}

export const Step4CharacteristicEq: React.FC<StepProps> = ({ result }) => {
  const { polynomialTex, equationTex } = result;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Stage 4 of 8
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            Form the Characteristic Equation
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Equate the characteristic polynomial to zero: <MathView math="p(\lambda) = 0" />.
          </p>
        </div>
      </div>

      {/* Comparison: Polynomial vs Equation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Polynomial */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Characteristic Polynomial
          </span>
          <div className="text-lg font-serif font-bold text-slate-800">
            <MathView math={polynomialTex} block={false} />
          </div>
          <p className="text-xs text-slate-500">
            An algebraic polynomial in the scalar variable <MathView math="\lambda" />.
          </p>
        </div>

        {/* Equation */}
        <div className="p-5 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-2">
          <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wide flex items-center gap-1.5">
            <Equal className="w-4 h-4 text-indigo-600" />
            Characteristic Equation
          </span>
          <div className="text-lg font-serif font-bold text-indigo-950">
            <MathView math={equationTex} block={false} />
          </div>
          <p className="text-xs text-indigo-800/80">
            Obtained by setting the characteristic polynomial <MathView math="p(\lambda)" /> equal to zero.
          </p>
        </div>
      </div>

      {/* Clear Educational Definition from Prompt */}
      <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 text-sm">
        <div className="flex items-center gap-2 text-slate-900 font-semibold">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <span>Core Mathematical Principle</span>
        </div>
        <blockquote className="p-3 rounded-lg bg-white border-l-4 border-indigo-500 italic text-slate-700 text-xs sm:text-sm">
          "The characteristic polynomial is obtained from <MathView math="\det(\lambda I - A)" />. The corresponding equation obtained by setting it equal to zero is called the characteristic equation."
        </blockquote>
        <p className="text-xs text-slate-600 leading-relaxed">
          The scalar roots of this characteristic equation are the <strong>eigenvalues</strong> (<MathView math="\lambda_1, \lambda_2, \dots, \lambda_n" />) of the matrix <MathView math="A" />. The Cayley-Hamilton theorem asks what happens when, instead of scalar roots, we substitute the entire matrix <MathView math="A" /> itself into this equation!
        </p>
      </div>
    </div>
  );
};
