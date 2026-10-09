"use client";

import React from "react";
import { MATRIX_EXAMPLES, MatrixExample } from "@/lib/examples";
import { MatrixDisplay } from "./MatrixDisplay";
import { Fraction } from "@/lib/fraction";
import { X, Play, Tag, Sparkles } from "lucide-react";

interface ExampleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (example: MatrixExample) => void;
}

export const ExampleSelector: React.FC<ExampleSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">
                Curated Matrix Examples
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select any predefined benchmark matrix to explore its characteristic polynomial and verification.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of Examples */}
        <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100">
          {MATRIX_EXAMPLES.map((ex) => {
            const fracMatrix = ex.data.map((row) =>
              row.map((val) => Fraction.from(val))
            );

            return (
              <div
                key={ex.id}
                className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                      {ex.title}
                    </h3>
                    {ex.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ex.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <MatrixDisplay matrix={fracMatrix} size="sm" />
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(ex);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Load
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
