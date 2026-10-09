"use client";

import React, { useState } from "react";
import { Fraction } from "@/lib/fraction";
import { Matrix, MatrixMath } from "@/lib/matrix";
import { Sparkles, Trash2, Dices, ArrowRight, BookOpen, AlertCircle, Check } from "lucide-react";

interface MatrixInputProps {
  size: number;
  setSize: (size: number) => void;
  matrixData: string[][];
  setMatrixData: (data: string[][]) => void;
  onVerify: (matrix: Matrix) => void;
  onOpenExamples: () => void;
  onTryDemo: () => void;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({
  size,
  setSize,
  matrixData,
  setMatrixData,
  onVerify,
  onOpenExamples,
  onTryDemo,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle cell text change
  const handleCellChange = (r: number, c: number, val: string) => {
    setErrorMessage(null);
    const updated = matrixData.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === r && colIndex === c) {
          return val;
        }
        return cell;
      })
    );
    setMatrixData(updated);
  };

  // Change matrix dimensions (2, 3, 4)
  const handleSizeChange = (newSize: number) => {
    setErrorMessage(null);
    setSize(newSize);
    const newGrid: string[][] = [];
    for (let i = 0; i < newSize; i++) {
      const row: string[] = [];
      for (let j = 0; j < newSize; j++) {
        // preserve old values if available
        if (i < matrixData.length && j < matrixData[i].length && matrixData[i][j] !== "") {
          row.push(matrixData[i][j]);
        } else {
          row.push(i === j ? "1" : "0");
        }
      }
      newGrid.push(row);
    }
    setMatrixData(newGrid);
  };

  // Clear matrix to all zeroes
  const handleClear = () => {
    setErrorMessage(null);
    const cleared = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => "")
    );
    setMatrixData(cleared);
  };

  // Random matrix generator
  const handleRandom = () => {
    setErrorMessage(null);
    const randomGrid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => {
        // Generate nice small integers from -4 to 5
        const val = Math.floor(Math.random() * 9) - 3;
        return val.toString();
      })
    );
    setMatrixData(randomGrid);
  };

  // Validation and submit
  const handleValidateAndSubmit = () => {
    setErrorMessage(null);

    // Check for empty cells
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const val = matrixData[r]?.[c]?.trim();
        if (!val) {
          setErrorMessage(`Cell at Row ${r + 1}, Column ${c + 1} is empty. Please enter a numerical value.`);
          return;
        }
      }
    }

    // Try parsing all cells
    try {
      const parsedMatrix: Matrix = [];
      for (let r = 0; r < size; r++) {
        const row: Fraction[] = [];
        for (let c = 0; c < size; c++) {
          const raw = matrixData[r][c].trim();
          try {
            const frac = Fraction.from(raw);
            row.push(frac);
          } catch {
            setErrorMessage(
              `Invalid number "${raw}" at Row ${r + 1}, Column ${c + 1}. Please enter an integer, decimal, or fraction (e.g. 3, -2, 0.5, 3/4).`
            );
            return;
          }
        }
        parsedMatrix.push(row);
      }

      onVerify(parsedMatrix);
    } catch (e: any) {
      setErrorMessage(e.message || "Failed to process the matrix. Please review the numbers entered.");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 md:p-8 transition-all">
      {/* Top Controls: Matrix Size Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Matrix Dimension (Square Matrix)
          </label>
          <div className="flex items-center gap-2 mt-1.5">
            {[2, 3, 4].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSizeChange(s)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  size === s
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200 ring-2 ring-indigo-600 ring-offset-2"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {s} × {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onTryDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
            title="Load standard demonstration matrix and run full verification"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Try Demo
          </button>
          <button
            type="button"
            onClick={onOpenExamples}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Load Example
          </button>
          <button
            type="button"
            onClick={handleRandom}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Fill with random integer values"
          >
            <Dices className="w-3.5 h-3.5" />
            Random Matrix
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors cursor-pointer"
            title="Clear all cells"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* Matrix Input Bracket UI */}
      <div className="py-8 flex flex-col items-center justify-center">
        <div className="text-center mb-4">
          <div className="font-serif italic text-2xl font-semibold text-slate-800">
            A =
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click any cell to edit • Supports integers (e.g. 2, -3), decimals (e.g. 1.5), and fractions (e.g. 1/2)
          </p>
        </div>

        {/* Matrix Brackets Frame */}
        <div className="relative inline-flex items-center p-3 sm:p-5 bg-slate-50/70 rounded-2xl border border-slate-200/60 shadow-inner">
          {/* Left Bracket */}
          <div className="w-3.5 sm:w-4 self-stretch border-l-3 sm:border-l-4 border-t-3 sm:border-t-4 border-b-3 sm:border-b-4 border-slate-700 rounded-l-md" />

          {/* Grid of Inputs */}
          <div
            className="grid gap-2 sm:gap-3 px-3 sm:px-5 py-2"
            style={{
              gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: size }).map((_, r) =>
              Array.from({ length: size }).map((_, c) => {
                const cellVal = matrixData[r]?.[c] ?? "";
                const isDiag = r === c;
                return (
                  <div key={`cell-${r}-${c}`} className="relative group">
                    <input
                      type="text"
                      inputMode="text"
                      value={cellVal}
                      onChange={(e) => handleCellChange(r, c, e.target.value)}
                      placeholder="0"
                      className={`w-14 h-14 sm:w-18 sm:h-18 text-center text-base sm:text-lg font-mono font-medium rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        isDiag
                          ? "bg-white border-indigo-200 text-indigo-950 font-semibold shadow-xs"
                          : "bg-white border-slate-200 text-slate-800 shadow-2xs"
                      }`}
                      aria-label={`Row ${r + 1}, Column ${c + 1}`}
                    />
                    <span className="absolute bottom-1 right-1.5 text-[9px] font-mono text-slate-300 pointer-events-none group-focus-within:text-indigo-400">
                      a{r + 1}{c + 1}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Bracket */}
          <div className="w-3.5 sm:w-4 self-stretch border-r-3 sm:border-r-4 border-t-3 sm:border-t-4 border-b-3 sm:border-b-4 border-slate-700 rounded-r-md" />
        </div>
      </div>

      {/* Error Message Callout */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Calculation Notice</p>
            <p className="mt-0.5 text-rose-700">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Primary Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-600" />
          Client-side instant calculation • Exact rational precision arithmetic
        </div>

        <button
          type="button"
          onClick={handleValidateAndSubmit}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-md shadow-indigo-200 hover:shadow-lg transition-all cursor-pointer group"
        >
          <span>Verify Theorem</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
