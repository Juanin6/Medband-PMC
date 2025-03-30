import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      messages,
      temperature: 0.7,
      system:
        "You are a helpful AI assistant that provides clear, concise, and accurate information. Be friendly and conversational in your responses.",
    });
    console.log(result);
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in POST request:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
