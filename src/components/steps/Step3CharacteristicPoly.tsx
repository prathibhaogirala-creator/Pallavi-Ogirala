"use client";

import React from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { MathView } from "../MathView";
import { BookOpen, Sparkles } from "lucide-react";

interface StepProps {
  result: CayleyHamiltonResult;
}

export const Step3CharacteristicPoly: React.FC<StepProps> = ({ result }) => {
  const { n, determinantExpansionTex, expansionExplanation, polynomialTex, coefficients } = result;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Stage 3 of 8
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            Compute the Characteristic Polynomial <MathView math="p(\lambda) = \det(\lambda I - A)" />
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Evaluate the determinant of <MathView math="(\lambda I - A)" /> and collect like powers of <MathView math="\lambda" />.
          </p>
        </div>
      </div>

      {/* Determinant Expansion Walkthrough */}
      <div className="p-6 rounded-xl bg-slate-50 border border-slate-200/70 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Step-by-Step Determinant Expansion ({n}×{n})
          </p>
          <span className="text-[11px] font-medium text-slate-500">
            Algebraic expansion
          </span>
        </div>

        <div className="space-y-3 bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
          {determinantExpansionTex.map((step, idx) => (
            <div key={idx} className="pt-3 first:pt-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {idx === 0
                    ? "Set up the determinant matrix"
                    : idx === determinantExpansionTex.length - 1
                    ? "Simplified characteristic polynomial"
                    : "Expand determinant terms"}
                </span>
              </div>
              <MathView math={step} block className="text-base md:text-lg pl-7" />
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-600">
          {expansionExplanation}
        </p>
      </div>

      {/* Resulting Polynomial Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/80 border border-indigo-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center gap-1.5 justify-center md:justify-start text-xs font-bold uppercase tracking-wider text-indigo-700">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Characteristic Polynomial Obtained</span>
          </div>
          <div className="text-xl md:text-2xl font-serif font-bold text-slate-900">
            <MathView math={polynomialTex} block={false} />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-indigo-100/70 text-indigo-900 font-semibold border border-indigo-200">
            Degree: n = {n}
          </div>
          <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
            Monic: leading coeff = 1
          </div>
        </div>
      </div>

      {/* Mathematical insight */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
        <p className="font-semibold text-slate-800 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          Polynomial Invariants Check
        </p>
        <p>
          • The coefficient of <MathView math={`\\lambda^{${n - 1}}`} /> is always <MathView math={`-\\operatorname{tr}(A) = ${coefficients[1].toTex()}`} />.
        </p>
        <p>
          • The constant term <MathView math="c_0" /> is always <MathView math={`(-1)^${n}\\det(A) = ${coefficients[n].toTex()}`} />.
        </p>
      </div>
    </div>
  );
};
