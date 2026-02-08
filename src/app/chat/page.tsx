"use client";

import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ book: input }),
    });

    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500">
      <div className="max-w-6xl mx-auto p-6 space-y-6 text-white">
        <h1 className="text-3xl font-bold">📚 Book Explorer</h1>

        {/* CHAT INPUT */}
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 rounded text-black"
            placeholder="e.g. Dune, Atomic Habits..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={send}
            className="bg-black/80 hover:bg-black text-white px-4 rounded"
          >
            Ask
          </button>
        </div>

        {loading && <p className="text-white/90">Loading...</p>}

        {/* 🧠 CONTEXT SUMMARY GRID (BIGGER) */}
        {data?.summary && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white/90 text-black p-6 rounded-xl shadow-lg">
            <div>
              <h2 className="font-semibold text-lg">📖 Book</h2>
              <p>{data.summary.title}</p>
            </div>

            <div>
              <h2 className="font-semibold text-lg">🌍 Origin</h2>
              <p>{data.summary.origin}</p>
            </div>

            {/* BIGGER CONTEXT AREA */}
            <div className="md:col-span-2">
              <h2 className="font-semibold text-lg">🧠 Context</h2>
              <p className="text-sm leading-relaxed">
                {data.summary.context}
              </p>
            </div>
          </div>
        )}

        {/* 📊 COMPARISON GRID */}
        {data?.books && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.books.map((b: any) => (
              <div
                key={b.id}
                className="rounded-xl p-4 bg-white/90 text-black space-y-2 shadow-lg"
              >
                <img
                  src={b.thumbnail}
                  className="h-40 mx-auto rounded"
                  alt={b.title}
                />
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm">✍ {b.authors}</p>
                <p className="text-sm">⭐ Rating: {b.rating}</p>
                <p className="text-sm">📄 Pages: {b.pages}</p>
                <p className="text-sm">📅 {b.published}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
