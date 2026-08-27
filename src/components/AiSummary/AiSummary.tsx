"use client";

import { useEffect, useState } from "react";

export interface AiSummaryProps {
  summary: string;
}

const COOLDOWN_SECONDS = 30;
const STORAGE_KEY = "ai-summary";

const AiSummary = ({ summary: initialSummary }: AiSummaryProps) => {
  const [summary, setSummary] = useState(initialSummary);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState<"failed" | "cooldown" | null>(null);

  // Sync from sessionStorage after mount, same reasoning as ThemeProvider:
  // this must match server-rendered HTML on first paint, so the swap has
  // to happen post-hydration, not in the initial useState. Gating the
  // whole reveal behind a "hydrated" skeleton would avoid the brief flash
  // this can cause for a returning same-tab visitor, but was measured to
  // reintroduce a real CLS/LCP cost for every visitor to fix a rare edge
  // case, so it's a swap-in-place instead.
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setSummary(stored);
  }, []);

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
    setError(null);
    setSummary("");

    try {
      const response = await fetch("/api/regenerate-summary", {
        method: "POST",
      });

      if (response.status === 429) {
        setError("cooldown");
        return;
      }
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
      sessionStorage.setItem(STORAGE_KEY, text);
    } catch {
      setError("failed");
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
          {error === "cooldown" && (
            <p className="mt-1 text-xs text-gray-500 dark:text-neutral-400">
              You can only regenerate once every {COOLDOWN_SECONDS}s — please
              wait.
            </p>
          )}
          {error === "failed" && (
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
