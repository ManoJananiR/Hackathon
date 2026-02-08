"use client";

export default function ChapterInput({ chapterState, setChapterState }: any) {
  const chapters = chapterState.chapters ?? [];

  function update(idx: number, patch: any) {
    const next = chapters.map((c: any, i: number) => (i === idx ? { ...c, ...patch } : c));
    setChapterState({ ...chapterState, chapters: next });
  }

  function addChapter() {
    setChapterState({
      ...chapterState,
      chapters: [...chapters, { title: `Chapter ${chapters.length + 1}`, text: "" }],
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Chapter text (type/paste)</div>
        <button className="text-sm underline" onClick={addChapter}>+ Add chapter</button>
      </div>

      {chapters.map((c: any, idx: number) => (
        <div key={idx} className="space-y-2">
          <input
            className="w-full rounded-lg border p-2 text-sm"
            value={c.title}
            onChange={(e) => update(idx, { title: e.target.value })}
          />
          <textarea
            className="w-full rounded-lg border p-2 text-sm"
            rows={6}
            value={c.text}
            onChange={(e) => update(idx, { text: e.target.value })}
            placeholder="Paste chapter text here..."
          />
        </div>
      ))}
    </div>
  );
}
