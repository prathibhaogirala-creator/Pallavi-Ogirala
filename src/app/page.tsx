"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header, ActiveTab } from "@/components/Header";
import { LandingHero } from "@/components/LandingHero";
import { MatrixInput } from "@/components/MatrixInput";
import { StepByStepVerification } from "@/components/StepByStepVerification";
import { ExampleSelector } from "@/components/ExampleSelector";
import { TheorySection } from "@/components/TheorySection";
import { HistoryPanel } from "@/components/HistoryPanel";
import { PrintableReport } from "@/components/PrintableReport";
import { AboutModal } from "@/components/AboutModal";
import { Matrix, MatrixMath } from "@/lib/matrix";
import { Fraction } from "@/lib/fraction";
import {
  verifyCayleyHamilton,
  CayleyHamiltonResult,
} from "@/lib/cayleyHamilton";
import { MATRIX_EXAMPLES, MatrixExample } from "@/lib/examples";
import {
  getHistory,
  saveHistoryItem,
  deleteHistoryItem,
  clearHistory,
  HistoryItem,
} from "@/lib/storage";
import {
  Calculator,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Printer,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [size, setSize] = useState<number>(3);
  const [matrixData, setMatrixData] = useState<string[][]>([
    ["2", "1", "0"],
    ["0", "3", "1"],
    ["1", "0", "2"],
  ]);
  const [verificationResult, setVerificationResult] =
    useState<CayleyHamiltonResult | null>(null);

  // Modals & History State
  const [examplesModalOpen, setExamplesModalOpen] = useState<boolean>(false);
  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);
  const [printReportOpen, setPrintReportOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Ref to scroll to verification section
  const verificationRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  // Run verification
  const handleVerify = (matrix: Matrix) => {
    try {
      const result = verifyCayleyHamilton(matrix);
      setVerificationResult(result);

      // Save to localStorage history
      const saved = saveHistoryItem({
        size: result.n,
        matrixData: matrixData,
        polynomialTex: result.polynomialTex,
        isVerified: result.isVerified,
      });
      setHistory(getHistory());

      // Scroll smoothly to verification area
      setTimeout(() => {
        verificationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (err: any) {
      alert("Verification Error: " + (err.message || "Invalid matrix data"));
    }
  };

  // Run Demo Matrix
  const handleTryDemo = () => {
    // Standard Demo: Example 3 (Prompt's classic 3x3)
    const demo = MATRIX_EXAMPLES.find((e) => e.id === "ex3-3x3") || MATRIX_EXAMPLES[0];
    handleSelectExample(demo);
    setActiveTab("calculator");
  };

  // Select an example from modal
  const handleSelectExample = (ex: MatrixExample) => {
    setSize(ex.size);
    const grid = ex.data.map((row) => row.map((val) => val.toString()));
    setMatrixData(grid);

    // Parse and verify automatically
    const parsedMatrix = ex.data.map((row) =>
      row.map((val) => Fraction.from(val))
    );
    const result = verifyCayleyHamilton(parsedMatrix);
    setVerificationResult(result);

    saveHistoryItem({
      size: ex.size,
      matrixData: grid,
      polynomialTex: result.polynomialTex,
      isVerified: result.isVerified,
    });
    setHistory(getHistory());

    // Switch to calculator tab and scroll
    setActiveTab("calculator");
    setTimeout(() => {
      verificationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // Open an item from history
  const handleOpenHistoryItem = (item: HistoryItem) => {
    setSize(item.size);
    setMatrixData(item.matrixData);
    try {
      const parsed = item.matrixData.map((row) =>
        row.map((val) => Fraction.from(val))
      );
      const res = verifyCayleyHamilton(parsed);
      setVerificationResult(res);
      setActiveTab("calculator");
      setTimeout(() => {
        verificationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (e) {
      alert("Failed to load history item");
    }
  };

  // Delete history item
  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteHistoryItem(id);
    setHistory(updated);
  };

  // Clear all history
  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your verification history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  // Start verification from landing hero
  const handleStartVerification = () => {
    setActiveTab("calculator");
    setTimeout(() => {
      calculatorRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  // Reset verification to enter another matrix
  const handleResetVerification = () => {
    setVerificationResult(null);
    calculatorRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExamples={() => setExamplesModalOpen(true)}
        onTryDemo={handleTryDemo}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB: HOME */}
        {activeTab === "home" && (
          <div className="space-y-12">
            <LandingHero
              onStartVerification={handleStartVerification}
              onTryDemo={handleTryDemo}
            />

            {/* Quick Interactive Demo Section directly on Home */}
            <div className="max-w-4xl mx-auto pt-6 border-t border-slate-200">
              <div className="text-center mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  Interactive Workbench
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">
                  Enter Your Matrix Below
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Or load one of our predefined textbook examples to begin immediate verification.
                </p>
              </div>

              <MatrixInput
                size={size}
                setSize={setSize}
                matrixData={matrixData}
                setMatrixData={setMatrixData}
                onVerify={handleVerify}
                onOpenExamples={() => setExamplesModalOpen(true)}
                onTryDemo={handleTryDemo}
              />
            </div>

            {/* Verification Result Area (if verified) */}
            {verificationResult && (
              <div ref={verificationRef} className="max-w-4xl mx-auto pt-10">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    Step-by-Step Educational Verification
                  </h2>
                  <button
                    type="button"
                    onClick={() => setPrintReportOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Assignment Report
                  </button>
                </div>
                <StepByStepVerification
                  result={verificationResult}
                  onReset={handleResetVerification}
                  onPrint={() => setPrintReportOpen(true)}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB: MATRIX CALCULATOR & VERIFICATION */}
        {activeTab === "calculator" && (
          <div className="space-y-10 max-w-4xl mx-auto">
            {/* Header info */}
            <div ref={calculatorRef} className="space-y-2 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                  <Calculator className="w-5 h-5" />
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Matrix Input & Verification Workbench
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Configure your square matrix dimensions, input real values, and follow the complete educational proof step by step.
              </p>
            </div>

            {/* Input Grid */}
            <MatrixInput
              size={size}
              setSize={setSize}
              matrixData={matrixData}
              setMatrixData={setMatrixData}
              onVerify={handleVerify}
              onOpenExamples={() => setExamplesModalOpen(true)}
              onTryDemo={handleTryDemo}
            />

            {/* Stepper Verification Area */}
            {verificationResult && (
              <div ref={verificationRef} className="pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Step-by-Step Mathematical Verification
                    </h2>
                    <p className="text-xs text-slate-500">
                      Follow the sequential expansion across all 8 verification stages.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPrintReportOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Report
                  </button>
                </div>
                <StepByStepVerification
                  result={verificationResult}
                  onReset={handleResetVerification}
                  onPrint={() => setPrintReportOpen(true)}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB: THEORY */}
        {activeTab === "theory" && <TheorySection />}

        {/* TAB: HISTORY */}
        {activeTab === "history" && (
          <HistoryPanel
            history={history}
            onOpenItem={handleOpenHistoryItem}
            onDeleteItem={handleDeleteHistoryItem}
            onClearHistory={handleClearHistory}
          />
        )}

        {/* TAB: ABOUT */}
        {activeTab === "about" && (
          <div className="max-w-3xl mx-auto py-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 md:p-10 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                  Educational System Overview
                </span>
                <h1 className="text-3xl font-extrabold text-slate-900">
                  Cayley-Hamilton Theorem Verification Tool
                </h1>
                <p className="text-sm text-slate-600 italic">
                  "Enter a Matrix. Verify the Theorem. Understand Every Step."
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-6">
                <p>
                  This project was built to address a major challenge in linear algebra education: standard calculators output final answers instantly without explaining the intermediate algebraic derivations.
                </p>
                <p>
                  For engineering students studying vibration analysis, control systems, and differential equations, understanding <em>why</em> <span className="font-serif italic font-bold">p(A) = 0</span> and <em>how</em> to compute matrix powers <span className="font-serif italic">A², A³</span> or the inverse <span className="font-serif italic">A⁻¹</span> is far more important than just knowing that the theorem holds.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Core Technical Highlights:
                  </h3>
                  <ul className="space-y-1 text-xs text-slate-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span><strong>Exact Rational Arithmetic:</strong> Uses BigInt fractions for zero-precision-loss calculations.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span><strong>Faddeev-LeVerrier & Laplace Engine:</strong> Computes characteristic polynomials dynamically without hardcoding.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span><strong>KaTeX Mathematical Typography:</strong> Crisp equations and real matrix brackets for academic presentations.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span><strong>Client-Side Execution:</strong> Zero network latency, privacy-respecting, and completely responsive.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
                <span>Designed for Engineering & Math Students</span>
                <button
                  type="button"
                  onClick={() => setActiveTab("calculator")}
                  className="font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  Go to Calculator →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200/80 py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Cayley-Hamilton Verification Tool</span>
            <span>•</span>
            <span>Interactive Linear Algebra Learning</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setExamplesModalOpen(true)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Examples
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("theory")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Theory
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("history")}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              History
            </button>
            <button
              type="button"
              onClick={() => setAboutModalOpen(true)}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              About
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ExampleSelector
        isOpen={examplesModalOpen}
        onClose={() => setExamplesModalOpen(false)}
        onSelect={handleSelectExample}
      />

      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />

      {verificationResult && (
        <PrintableReport
          result={verificationResult}
          isOpen={printReportOpen}
          onClose={() => setPrintReportOpen(false)}
        />
      )}
    </div>
  );
}
