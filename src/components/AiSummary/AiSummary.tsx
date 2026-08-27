"use client";

import { useEffect, useState } from "react";

export interface AiSummaryProps {
  summary: string;
}

const COOLDOWN_SECONDS = 30;

const AiSummary = ({ summary: initialSummary }: AiSummaryProps) => {
  const [summary, setSummary] = useState(initialSummary);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(
      () => setCooldown((current) => Math.max(0, current - 1)),
      1000,
    );
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    setError(false);
    setSummary("");

    try {
      const response = await fetch("/api/regenerate-summary", {
        method: "POST",
      });
      if (!response.ok || !response.body) throw new Error("request failed");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setSummary(text);
      }

      if (!text) throw new Error("empty response");
    } catch {
      setError(true);
    } finally {
      setIsRegenerating(false);
      setCooldown(COOLDOWN_SECONDS);
    }
  };

  const isWaitingForFirstChunk = isRegenerating && summary.length === 0;
  const canRegenerate = !isRegenerating && cooldown === 0;

  return (
    <div className="mt-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 p-3">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            {isRegenerating && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75 animate-ping" />
            )}
            <span className="relative inline-flex size-1.5 rounded-full bg-blue-500" />
          </span>
          <span className="text-xs font-medium text-gray-500 dark:text-neutral-400">
            {isRegenerating ? "Regenerating…" : "AI Analysis"}
          </span>
        </div>

        <button
          type="button"
          onClick={handleRegenerate}
          disabled={!canRegenerate}
          className="text-xs text-gray-500 dark:text-neutral-400 hover:text-gray-800 dark:hover:text-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {cooldown > 0 ? `Regenerate (${cooldown}s)` : "Regenerate"}
        </button>
      </div>

      {isWaitingForFirstChunk ? (
        <div className="space-y-1.5 animate-pulse">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-neutral-700" />
          <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-neutral-700" />
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            {summary}
            {isRegenerating && (
              <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-gray-400 dark:bg-neutral-500 align-middle animate-pulse" />
            )}
          </p>
          {error && (
            <p className="mt-1 text-xs text-red-500 dark:text-red-400">
              Couldn&apos;t regenerate right now — try again shortly.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AiSummary;
