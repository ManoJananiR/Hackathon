"use client";
export default function BuyLinks({ book }: any) {
  return (
    <div>
      <div className="text-sm font-medium">Links</div>
      <ul className="mt-2 space-y-2">
        {book.buyLinks?.map((l: any) => (
          <li key={l.url}>
            <a className="text-sm underline" href={l.url} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
