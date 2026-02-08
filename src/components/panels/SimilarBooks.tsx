"use client";

export default function SimilarBooks({ book }: any) {
  return (
    <ul>
      {book.similar?.map((b: any, i: number) => (
        <li key={i}>{b.title}</li>
      ))}
    </ul>
  );
}
