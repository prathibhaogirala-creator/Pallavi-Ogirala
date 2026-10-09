"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Calculator,
  BookOpen,
  History as HistoryIcon,
  Info,
  Menu,
  X,
  Sigma,
} from "lucide-react";

export type ActiveTab = "home" | "calculator" | "theory" | "history" | "about";

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenExamples: () => void;
  onTryDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExamples,
  onTryDemo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: null },
    { id: "calculator", label: "Matrix Calculator", icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: "theory", label: "Theory & Guide", icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: "history", label: "History", icon: <HistoryIcon className="w-3.5 h-3.5" /> },
    { id: "about", label: "About", icon: <Info className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Sigma className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight block">
                Cayley-Hamilton
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block">
                Verification Tool
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenExamples}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              Examples
            </button>
            <button
              type="button"
              onClick={onTryDemo}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs shadow-indigo-200 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Try Demo</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onTryDemo}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white shadow-2xs cursor-pointer"
            >
              Demo
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-left ${
                activeTab === item.id
                  ? "bg-indigo-50 text-indigo-700 font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenExamples();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold text-center"
            >
              Browse Examples
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
