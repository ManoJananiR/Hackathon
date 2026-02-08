export type UISchema =
  | { type: "summary" }
  | { type: "similarBooks" }
  | { type: "rating" }
  | { type: "genre" }
  | { type: "comparisonChart" };

export const defaultSchema: UISchema[] = [
  { type: "summary" },
  { type: "similarBooks" },
  { type: "rating" },
  { type: "genre" },
];
