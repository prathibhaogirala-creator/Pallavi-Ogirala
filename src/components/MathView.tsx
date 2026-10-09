"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
  ariaLabel?: string;
}

export const MathView: React.FC<MathViewProps> = ({
  math,
  block = false,
  className = "",
  ariaLabel,
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        output: "htmlAndMathml",
      });
    } catch (err) {
      console.error("KaTeX rendering error:", err);
      return `<span class="text-rose-600 font-mono text-xs">${math}</span>`;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={`overflow-x-auto py-2 my-1 text-slate-900 scrollbar-thin ${className}`}
        aria-label={ariaLabel}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block align-middle text-slate-900 ${className}`}
      aria-label={ariaLabel}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
