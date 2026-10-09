"use client";

import React, { useState } from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { MatrixDisplay } from "../MatrixDisplay";
import { MathView } from "../MathView";
import { ChevronDown, ChevronUp, Layers, Check } from "lucide-react";

interface StepProps {
  result: CayleyHamiltonResult;
}

export const Step6MatrixPowers: React.FC<StepProps> = ({ result }) => {
  const { n, A, powers } = result;
  // State to toggle detailed row-column multiplication breakdown
  const [expandedPower, setExpandedPower] = useState<number | null>(2);

  // Filter powers >= 2
  const computedPowers = powers.filter((p) => p.power >= 2);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Stage 6 of 8
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-2">
            Calculate Required Matrix Powers
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Sequential evaluation of powers up to degree <MathView math={`n = ${n}`} />: {computedPowers.map((p) => `A^${p.power}`).join(", ")}.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
            {computedPowers.length} power{computedPowers.length > 1 ? "s" : ""} required
          </span>
        </div>
      </div>

      {/* Base Matrix A reminder */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">
            A¹
          </span>
          <span className="text-xs font-medium text-slate-600">Base Matrix (Given):</span>
        </div>
        <MatrixDisplay matrix={A} label="A" size="sm" />
      </div>

      {/* Power Cards */}
      <div className="space-y-4">
        {computedPowers.map((pCalc) => {
          const isExpanded = expandedPower === pCalc.power;
          const prevMatrix = powers.find((p) => p.power === pCalc.power - 1)!.matrix;

          return (
            <div
              key={pCalc.power}
              className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs transition-all"
            >
              {/* Power Header & Result */}
              <div className="p-5 bg-slate-50/70 border-b border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center md:text-left">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-mono text-xs font-bold">
                      A^{pCalc.power}
                    </span>
                    <span className="font-semibold text-slate-800 text-sm">
                      <MathView math={pCalc.expression} block={false} />
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {pCalc.power === 2
                      ? "Multiply matrix A by matrix A"
                      : `Multiply previously calculated A^${pCalc.power - 1} by A`}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <MatrixDisplay
                    matrix={pCalc.matrix}
                    label={`A^{${pCalc.power}}`}
                    size="md"
                  />

                  {pCalc.detail && (
                    <button
                      type="button"
                      onClick={() => setExpandedPower(isExpanded ? null : pCalc.power)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                    >
                      <span>{isExpanded ? "Hide Steps" : "Show Steps"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Expanded Multiplication Step Breakdown */}
              {isExpanded && pCalc.detail && (
                <div className="p-5 bg-white space-y-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-600" />
                      Row × Column Dot Product Breakdown
                    </p>
                    <span className="text-[11px] text-slate-400">
                      Standard Matrix Product: <MathView math="C_{ij} = \sum_k A_{ik} B_{kj}" />
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto p-1 scrollbar-thin">
                    {pCalc.detail.steps.map((st, sIdx) => {
                      const termsTex = st.terms
                        .map(
                          (t) =>
                            `(${t.a.toTex()})(${t.b.toTex()})`
                        )
                        .join(" + ");
                      return (
                        <div
                          key={sIdx}
                          className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-slate-500 font-mono text-[11px]">
                            <span>Cell ({st.row}, {st.col})</span>
                            <span className="font-bold text-slate-800">
                              = {st.sum.toTex()}
                            </span>
                          </div>
                          <div className="overflow-x-auto text-slate-700 font-mono text-[11px]">
                            <MathView math={`${termsTex}`} block={false} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
