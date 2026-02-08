"use client";
import { useState } from "react";

export default function ChapterSummaries({ chapterState, setChapterState }: any) {
  const [localError, setLocalError] = useState<string | null>(null);

  async function summarize() {
    setLocalError(null);
    setChapterState({ ...chapterState, loading: true });

    try {
      const r = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chapters: chapterState.chapters }),
      });
      if (!r.ok) throw new Error(await r.text());
      const json = await r.json();

      setChapterState({ ...chapterState, loading: false, summaries: json.summaries });
    } catch (e: any) {
      setLocalError(String(e?.message ?? e));
      setChapterState({ ...chapterState, loading: false });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Chapter summaries</div>
        <button
          className="rounded-lg bg-black text-white px-3 py-2 text-sm disabled:opacity-50"
          onClick={summarize}
          disabled={chapterState.loading}
        >
          {chapterState.loading ? "Summarizing..." : "Summarize"}
        </button>
      </div>

      {localError ? <div className="mt-2 text-sm text-red-600">{localError}</div> : null}

      <div className="mt-3 space-y-3">
        {(chapterState.summaries ?? []).map((s: any, i: number) => (
          <div key={i} className="rounded-lg border p-3">
            <div className="text-sm font-semibold">{s.title}</div>
            <div className="mt-1 text-sm text-zinc-700 whitespace-pre-wrap">{s.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

