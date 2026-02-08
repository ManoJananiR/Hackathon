import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    // VERY IMPORTANT:
    // This simulates Tambo deciding UI based on user command
    const uiSchema = [];

    if (message.toLowerCase().includes("summary")) {
      uiSchema.push({ type: "summary" });
    }

    if (message.toLowerCase().includes("similar")) {
      uiSchema.push({ type: "similarBooks" });
    }

    if (message.toLowerCase().includes("rating")) {
      uiSchema.push({ type: "rating" });
    }

    if (message.toLowerCase().includes("compare")) {
      uiSchema.push({ type: "comparisonChart" });
    }

    // fallback
    if (uiSchema.length === 0) {
      uiSchema.push(
        { type: "summary" },
        { type: "rating" }
      );
    }

    return NextResponse.json({ uiSchema });
  } catch (err) {
    console.error("Tambo route error:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 }
    );
  }
}
