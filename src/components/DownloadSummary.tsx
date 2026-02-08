export default function DownloadSummary({ text }: { text: string }) {
  const download = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "book-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={download}
      className="bg-black text-white px-4 py-2 rounded text-sm"
    >
      ⬇ Download Summary
    </button>
  );
}
