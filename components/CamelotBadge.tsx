"use client";

import { getCamelotKey, getCamelotColor } from "@/lib/camelot";

interface CamelotBadgeProps {
  musicalKey: number;
  mode: number;
}

export default function CamelotBadge({ musicalKey, mode }: CamelotBadgeProps) {
  if (musicalKey < 0 || mode < 0) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
        N/A
      </span>
    );
  }

  const camelotKey = getCamelotKey(musicalKey, mode);
  const colorClass = getCamelotColor(camelotKey);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white ${colorClass}`}
    >
      {camelotKey}
    </span>
  );
}
