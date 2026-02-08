import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "Book title missing" },
        { status: 400 }
      );
    }

    const prompt = `
Write a clear, concise English summary of the book "${title}".
Base it on this description if helpful:
"${description || "N/A"}"

Requirements:
- Plain English
- 1–2 paragraphs
- Neutral tone
- No emojis
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const summary =
      completion.choices[0]?.message?.content ||
      "No summary generated.";

    return NextResponse.json({ summary });
  } catch (error: any) {
    console.error("SUMMARY API ERROR:", error);

    return NextResponse.json(
      { error: "Summary generation failed" },
      { status: 500 }
    );
  }
}
