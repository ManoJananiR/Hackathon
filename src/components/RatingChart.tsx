"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RatingChart({ rating }: { rating: number }) {
  const data = [{ name: "Rating", value: rating || 0 }];

  return (
    <div className="bg-white border rounded p-4 h-full">
      <h2 className="font-semibold mb-2">⭐ Book Rating</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Bar dataKey="value" fill="#000" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
