"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ComparisonChart({ books }: { books: any[] }) {
  const data = books.map((b) => ({
    name: b.title.slice(0, 10) + "...",
    rating: b.rating,
    pages: b.pages,
  }));

  return (
    <div className="bg-white border rounded p-4">
      <h2 className="font-semibold mb-2">📊 Book Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rating" fill="#000" />
          <Bar dataKey="pages" fill="#999" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
