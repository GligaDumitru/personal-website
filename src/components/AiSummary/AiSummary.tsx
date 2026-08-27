"use client";

import { useEffect, useState } from "react";

export interface AiSummaryProps {
  summary: string;
}

const AiSummary = ({ summary }: AiSummaryProps) => {
  const [isComputing, setIsComputing] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsComputing(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mt-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 p-3">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="relative flex size-1.5">
          {isComputing && (
            <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping" />
          )}
          <span className="relative inline-flex size-1.5 rounded-full bg-blue-500" />
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-neutral-400">
          {isComputing ? "Analyzing profile…" : "AI Analysis"}
        </span>
      </div>

      {isComputing ? (
        <div className="space-y-1.5 animate-pulse">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-neutral-700" />
          <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-neutral-700" />
        </div>
      ) : (
        <p className="text-sm text-gray-600 dark:text-neutral-400 transition-opacity duration-300">
          {summary}
        </p>
      )}
    </div>
  );
};

export default AiSummary;
