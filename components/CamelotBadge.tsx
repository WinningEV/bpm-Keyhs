"use client";

import { getCamelotKey, getCamelotHSL } from "@/lib/camelot";

interface CamelotBadgeProps {
  musicalKey: number;
  mode: number;
  bpm?: number;
}

export default function CamelotBadge({ musicalKey, mode, bpm = 120 }: CamelotBadgeProps) {
  if (musicalKey < 0 || mode < 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
        N/A
      </span>
    );
  }

  const camelotKey = getCamelotKey(musicalKey, mode);
  const { css } = getCamelotHSL(camelotKey, bpm);

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-sm"
      style={{
        backgroundColor: css,
        boxShadow: `0 0 8px ${css}40`,
      }}
    >
      {camelotKey}
    </span>
  );
}
