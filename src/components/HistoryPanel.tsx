"use client";

import React from "react";
import { HistoryItem } from "@/lib/storage";
import { MatrixDisplay } from "./MatrixDisplay";
import { MathView } from "./MathView";
import { Fraction } from "@/lib/fraction";
import { Trash2, FolderOpen, History as HistoryIcon, CheckCircle2, Clock } from "lucide-react";

interface HistoryPanelProps {
  history: HistoryItem[];
  onOpenItem: (item: HistoryItem) => void;
  onDeleteItem: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  onOpenItem,
  onDeleteItem,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-10 text-center space-y-3 max-w-xl mx-auto my-8">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <HistoryIcon className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">
          No Verification History Yet
        </h3>
        <p className="text-xs text-slate-500">
          Matrices you verify in the calculator are automatically saved here for quick review.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-indigo-600" />
            Verification History
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Locally saved on your device • {history.length} item{history.length > 1 ? "s" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={onClearHistory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      {/* History Items List */}
      <div className="space-y-4">
        {history.map((item) => {
          let fracMatrix;
          try {
            fracMatrix = item.matrixData.map((row) =>
              row.map((val) => Fraction.from(val))
            );
          } catch {
            fracMatrix = undefined;
          }

          return (
            <div
              key={item.id}
              className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {item.size} × {item.size}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{item.timestamp}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <div className="text-sm font-serif font-bold text-slate-800">
                  <MathView math={item.polynomialTex} />
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {fracMatrix && (
                  <MatrixDisplay matrix={fracMatrix} size="sm" />
                )}

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenItem(item)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    Open
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteItem(item.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
