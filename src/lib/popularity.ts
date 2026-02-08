export function popularityScore(rating?: number, ratingsCount?: number) {
  const r = rating ?? 0;
  const c = ratingsCount ?? 0;
  const log = Math.log10(1 + c);
  return log * 0.7 + r * 0.3;
}