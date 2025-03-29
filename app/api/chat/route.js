import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Usa tu API Key de OpenAI
});

export async function POST(req) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
    stream: true, // Activa respuestas en streaming
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
