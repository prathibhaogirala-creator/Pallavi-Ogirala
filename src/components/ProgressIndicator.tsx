"use client";

import React from "react";
import { Check, ChevronRight } from "lucide-react";

export interface StepDef {
  number: number;
  title: string;
  shortTitle: string;
}

export const VERIFICATION_STEPS: StepDef[] = [
  { number: 1, title: "Original Matrix A", shortTitle: "1. Input A" },
  { number: 2, title: "Find λI - A", shortTitle: "2. λI - A" },
  { number: 3, title: "Characteristic Polynomial", shortTitle: "3. Poly p(λ)" },
  { number: 4, title: "Characteristic Equation", shortTitle: "4. Eq p(λ)=0" },
  { number: 5, title: "Substitute Matrix A", shortTitle: "5. Substitute" },
  { number: 6, title: "Calculate Powers Aᵏ", shortTitle: "6. Powers Aᵏ" },
  { number: 7, title: "Final Evaluation", shortTitle: "7. Term Sum" },
  { number: 8, title: "Verification Result", shortTitle: "8. Result" },
];

interface ProgressIndicatorProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  showAll: boolean;
  setShowAll: (showAll: boolean) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  setCurrentStep,
  showAll,
  setShowAll,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 mb-6">
      {/* Top Header with Progress and Show All toggle */}
      <div className="flex items-center justify-between gap-4 pb-3 mb-3 border-b border-slate-100 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Verification Roadmap
          </span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
            {showAll ? "Viewing All 8 Steps" : `Step ${currentStep} of 8`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              showAll
                ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {showAll ? "Switch to Stepper View" : "Show All Steps"}
          </button>
        </div>
      </div>

      {/* Steps Pill Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
        {VERIFICATION_STEPS.map((step) => {
          const isActive = currentStep === step.number && !showAll;
          const isPassed = currentStep > step.number || showAll;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => {
                setCurrentStep(step.number);
                if (showAll) setShowAll(false);
              }}
              className={`flex items-center gap-2 p-2 rounded-xl text-left transition-all cursor-pointer group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-600/30"
                  : isPassed
                  ? "bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-900 border border-indigo-100/70"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : isPassed
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                }`}
              >
                {isPassed && !isActive ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  step.number
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold truncate leading-tight">
                  {step.shortTitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
