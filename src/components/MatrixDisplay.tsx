"use client";

import React from "react";
import { Matrix } from "@/lib/matrix";
import { MathView } from "./MathView";

interface MatrixDisplayProps {
  matrix?: Matrix;
  tex?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  highlightDiagonal?: boolean;
}

export const MatrixDisplay: React.FC<MatrixDisplayProps> = ({
  matrix,
  tex,
  label,
  size = "md",
  className = "",
  highlightDiagonal = false,
}) => {
  if (tex) {
    const fullTex = label ? `${label} = ${tex}` : tex;
    return (
      <div className={`inline-flex items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-200/80 shadow-xs ${className}`}>
        <MathView math={fullTex} block={false} />
      </div>
    );
  }

  if (!matrix) return null;

  const n = matrix.length;
  const padding = size === "sm" ? "p-1.5 text-xs" : size === "lg" ? "p-3 text-base" : "p-2 text-sm";

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {label && (
        <span className="font-serif italic font-semibold text-slate-700 text-base">
          {label} =
        </span>
      )}
      <div className="relative inline-flex items-center">
        {/* Left Matrix Bracket */}
        <div className="w-2.5 self-stretch border-l-2 border-t-2 border-b-2 border-slate-700 rounded-l-sm" />

        {/* Matrix Grid */}
        <div
          className="grid gap-1 px-2.5 py-1"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {matrix.map((row, r) =>
            row.map((cell, c) => {
              const isDiag = highlightDiagonal && r === c;
              return (
                <div
                  key={`${r}-${c}`}
                  className={`min-w-[42px] h-9 flex items-center justify-center font-mono font-medium rounded ${padding} ${
                    isDiag
                      ? "bg-indigo-50 text-indigo-900 border border-indigo-200"
                      : "bg-white text-slate-800 border border-slate-100 shadow-2xs"
                  }`}
                >
                  <MathView math={cell.toTex()} />
                </div>
              );
            })
          )}
        </div>

        {/* Right Matrix Bracket */}
        <div className="w-2.5 self-stretch border-r-2 border-t-2 border-b-2 border-slate-700 rounded-r-sm" />
      </div>
    </div>
  );
};
