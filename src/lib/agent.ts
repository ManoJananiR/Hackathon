import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleChatMessage({
  message,
}: {
  message: string;
  origin?: string;
}) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a book assistant." },
      { role: "user", content: message },
    ],
  });

  return {
    messages: [
      {
        role: "assistant",
        content: completion.choices[0].message.content,
      },
    ],
  };
}
