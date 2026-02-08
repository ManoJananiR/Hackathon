export const runtime = "nodejs";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { UISchema } from "@/lib/uiSchema";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY in .env.local" }, { status: 500 });
    }

    const { userCommand, book } = await req.json();

    const system = `
You are a UI planner for a Next.js app. Output ONLY JSON matching:
{
  "pageTitle": string,
  "layout": {
    "columns": 12,
    "panels": Array<{
      "type": oneOf[
        "BookHeader","AuthorCard","GenreCard","PopularityCard","BuyLinks",
        "ChapterInput","ChapterSummaries","SimilarBooks","ComparisonChart","Notes"
      ],
      "span": 1..12,
      "title"?: string,
      "props"?: object
    }>
  }
}
Rules:
- Only allowed types.
- Use spans: BookHeader 12, Summary/Charts 6-12, small cards 3-4.
- If command requests chapter summaries, include ChapterInput and ChapterSummaries.
- If command requests compare/similar/popularity, include SimilarBooks and ComparisonChart and PopularityCard.
- Always include BookHeader and BuyLinks.
- No markdown. JSON only.
`.trim();

    const resp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: system },
        { role: "user", content: JSON.stringify({ userCommand, book }) },
      ],
      // This helps push the model to return pure JSON:
      response_format: { type: "json_object" },
    });

    const content = resp.choices[0]?.message?.content ?? "{}";

    let json: unknown;
    try {
      json = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: "Model did not return valid JSON", raw: content },
        { status: 400 }
      );
    }

    const parsed = UISchema.parse(json);
    return NextResponse.json(parsed);
  } catch (e: any) {
    return NextResponse.json(
      { error: "Plan failed", detail: String(e?.message ?? e) },
      { status: 400 }
    );
  }
}