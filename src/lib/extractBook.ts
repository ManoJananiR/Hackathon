export function extractBookQuery(message: string): string {
  // Very basic heuristic. You can improve later (NER / LLM).
  // Examples:
  // "compare Dune with similar books" -> "Dune"
  // "Atomic Habits rating and buy links" -> "Atomic Habits"
  const cleaned = message
    .replace(/(compare|show|give|buy|links|rating|author|genre|summary|summarize|similar|books|and|with|popularity|proxy)/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

  // fallback to original if heuristic removes too much
  return cleaned.length >= 2 ? cleaned : message.trim();
}