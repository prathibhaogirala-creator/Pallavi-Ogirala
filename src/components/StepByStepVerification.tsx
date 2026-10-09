"use client";

import React, { useState } from "react";
import { CayleyHamiltonResult } from "@/lib/cayleyHamilton";
import { ProgressIndicator } from "./ProgressIndicator";
import { Step1OriginalMatrix } from "./steps/Step1OriginalMatrix";
import { Step2LambdaMinusA } from "./steps/Step2LambdaMinusA";
import { Step3CharacteristicPoly } from "./steps/Step3CharacteristicPoly";
import { Step4CharacteristicEq } from "./steps/Step4CharacteristicEq";
import { Step5Substitution } from "./steps/Step5Substitution";
import { Step6MatrixPowers } from "./steps/Step6MatrixPowers";
import { Step7FinalSubstitution } from "./steps/Step7FinalSubstitution";
import { Step8VerificationResult } from "./steps/Step8VerificationResult";
import { ChevronLeft, ChevronRight, RotateCcw, Printer, Eye } from "lucide-react";

interface StepByStepVerificationProps {
  result: CayleyHamiltonResult;
  onReset: () => void;
  onPrint: () => void;
}

export const StepByStepVerification: React.FC<StepByStepVerificationProps> = ({
  result,
  onReset,
  onPrint,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Progress Indicator Roadmap */}
      <ProgressIndicator
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        showAll={showAll}
        setShowAll={setShowAll}
      />

      {/* Main Content Area */}
      {showAll ? (
        /* Unified Vertical Scroll showing all 8 steps sequentially */
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between bg-indigo-50/70 border border-indigo-200/60 p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-semibold text-indigo-950">
                Full Solution Walkthrough (All 8 Stages)
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowAll(false)}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline cursor-pointer"
            >
              Switch back to Stepper View
            </button>
          </div>

          <Step1OriginalMatrix result={result} />
          <Step2LambdaMinusA result={result} />
          <Step3CharacteristicPoly result={result} />
          <Step4CharacteristicEq result={result} />
          <Step5Substitution result={result} />
          <Step6MatrixPowers result={result} />
          <Step7FinalSubstitution result={result} />
          <Step8VerificationResult
            result={result}
            onVerifyAnother={onReset}
            onViewFullSolution={() => setShowAll(true)}
            onPrintReport={onPrint}
          />
        </div>
      ) : (
        /* Step-by-Step Interactive View */
        <div className="space-y-6">
          <div className="transition-all duration-300">
            {currentStep === 1 && <Step1OriginalMatrix result={result} />}
            {currentStep === 2 && <Step2LambdaMinusA result={result} />}
            {currentStep === 3 && <Step3CharacteristicPoly result={result} />}
            {currentStep === 4 && <Step4CharacteristicEq result={result} />}
            {currentStep === 5 && <Step5Substitution result={result} />}
            {currentStep === 6 && <Step6MatrixPowers result={result} />}
            {currentStep === 7 && <Step7FinalSubstitution result={result} />}
            {currentStep === 8 && (
              <Step8VerificationResult
                result={result}
                onVerifyAnother={onReset}
                onViewFullSolution={() => setShowAll(true)}
                onPrintReport={onPrint}
              />
            )}
          </div>

          {/* Stepper Navigation Footer */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex-wrap">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentStep === 1
                  ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Step
            </button>

            <div className="text-xs font-medium text-slate-500">
              Stage <span className="font-bold text-slate-800">{currentStep}</span> of 8
            </div>

            <div className="flex items-center gap-2">
              {currentStep < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Verify New Matrix</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
