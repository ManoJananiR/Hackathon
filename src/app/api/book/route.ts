import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { book } = await req.json();

    if (!book) {
      return NextResponse.json({ error: "Book required" }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
      book
    )}&maxResults=5&key=${apiKey}`;

    const res = await fetch(url);

    if (!res.ok) throw new Error("Google Books API failed");

    const data = await res.json();

    const books = (data.items || []).map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors?.join(", ") || "Unknown",
      rating: item.volumeInfo.averageRating || 0,
      pages: item.volumeInfo.pageCount || 0,
      published: item.volumeInfo.publishedDate || "N/A",
      description:
        item.volumeInfo.description ||
        "No detailed description available.",
      thumbnail:
        item.volumeInfo.imageLinks?.thumbnail ||
        "https://via.placeholder.com/128x190?text=No+Image",
    }));

    const mainBook = books[0];

    return NextResponse.json({
      summary: {
        title: mainBook?.title,
        origin: `First published in ${mainBook?.published}`,
        context: mainBook?.description,
      },
      books,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
