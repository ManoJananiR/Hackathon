import type { BookProfile } from "@/lib/bookTypes";

function popularityScore(rating?: number, ratingsCount?: number) {
  const r = rating ?? 0;
  const c = ratingsCount ?? 0;
  return Math.log10(1 + c) * 0.7 + r * 0.3;
}

export function toBuyLinksCards(book: BookProfile) {
  return (book.buyLinks ?? []).map((l, idx) => ({
    id: `buy_${idx}`,
    label: l.label,
    value: l.url,
    description: l.url,
    url: l.url,
  }));
}

export function toSimilarBooksCards(book: BookProfile, limit = 6) {
  return (book.similar ?? []).slice(0, limit).map((b, idx) => ({
    id: `sim_${idx}`,
    label: b.title,
    value: b.title,
    description: `${(b.authors ?? []).join(", ")}${b.rating ? ` • ★ ${b.rating}` : ""}${b.ratingsCount ? ` • (${b.ratingsCount})` : ""}`,
    url: null,
  }));
}

export function toPopularityChart(book: BookProfile, limit = 5) {
  const items = [
    { title: book.title, rating: book.rating, ratingsCount: book.ratingsCount },
    ...(book.similar ?? []).slice(0, limit).map((b) => ({
      title: b.title,
      rating: b.rating,
      ratingsCount: b.ratingsCount,
    })),
  ];

  const labels = items.map((x) => x.title);
  const data = items.map((x) => Number(popularityScore(x.rating, x.ratingsCount).toFixed(2)));

  return { labels, data };
}