"use client";

import React from "react";
import { X, Sigma, Code2, GraduationCap, CheckCircle2, Cpu } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Sigma className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                About the Cayley-Hamilton Verification Tool
              </h2>
              <p className="text-xs text-slate-500">
                Interactive Engineering Linear Algebra Learning System
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 leading-relaxed">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              Pedagogical Objective
            </h3>
            <p>
              This tool was designed for undergraduate engineering and mathematics students. Rather than acting as a black-box calculator, it reveals every single intermediate calculation — from constructing <span className="font-mono font-semibold">λI - A</span>, to symbolic cofactor expansion, sequential matrix powers, and term-by-term scalar scaling.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-600" />
              100% Client-Side Exact Rational Engine
            </h3>
            <p>
              All matrix computations execute locally in your browser using an exact BigInt rational fraction math engine (<span className="font-mono">Fraction</span>). Determinants, characteristic coefficients, and matrix multiplications maintain zero floating-point drift on integer and rational inputs, guaranteeing identically zero verification results!
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-600" />
              Modern Technology Stack
            </h3>
            <ul className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px] text-slate-700">
              <li className="p-2 rounded bg-slate-50 border border-slate-100">• Next.js 16 (App Router)</li>
              <li className="p-2 rounded bg-slate-50 border border-slate-100">• React 19 & TypeScript</li>
              <li className="p-2 rounded bg-slate-50 border border-slate-100">• Tailwind CSS</li>
              <li className="p-2 rounded bg-slate-50 border border-slate-100">• KaTeX Math Typography</li>
              <li className="p-2 rounded bg-slate-50 border border-slate-100">• Lucide Modern Icons</li>
              <li className="p-2 rounded bg-slate-50 border border-slate-100">• Canvas Confetti</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-slate-500 text-[11px]">
          Created for engineering students worldwide • Free and open educational tool
        </div>
      </div>
    </div>
  );
};
