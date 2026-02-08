"use client";

export default function BookHeader({ book }: any) {
  return (
    <>
      <h2 className="text-xl font-bold">{book.title}</h2>
      <p className="text-sm text-gray-600 mt-2">{book.description}</p>
    </>
  );
}
