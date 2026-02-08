"use client";

export function RenderPanels({ schema, book }: any) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {schema.map((panel: any, i: number) => {
        switch (panel.type) {
          case "summary":
            return (
              <div key={i} className="p-4 border rounded">
                <h3>Summary</h3>
                <p>{book.summary}</p>
              </div>
            );
          case "rating":
            return <div key={i}>⭐ Rating: {book.rating}</div>;
          case "genre":
            return <div key={i}>📚 Genre: {book.genre}</div>;
          case "similarBooks":
            return (
              <div key={i}>
                <h3>Similar Books</h3>
                <ul>
                  {book.similarBooks.map((b: string) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            );
        }
      })}
    </div>
  );
}
