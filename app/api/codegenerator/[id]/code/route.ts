// app/api/chat/route.ts

import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/authOptions";
import { ChatCompletionRequestMessage } from "openai-edge";

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
// export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getAuthSession();

  if (!session)
    return NextResponse.json({ error: "Unauthenticated request", status: 401 });

  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  const targetCodenerator = await db.codeGenerator.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!targetCodenerator) {
    return NextResponse.json({ error: "Invalid request", status: 400 });
  }

  const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: `IMPORTANT NOTICE: "You are a code generator that generates in ${targetCodenerator.language}. You must answer only in markdown snippets. Use code comments for explanations.`
  };

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    temperature: 1,
    messages: [instructionMessage, ...messages],
    stream: true,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onStart: async () => {
      await db.codeGeneratorMessage.create({
        data: {
          userId: session.user.id,
          codeGeneratorId: targetCodenerator.id,
          content: messages[messages.length - 1].content!,
          role: "user",
        },
      });
    },
    onCompletion: async (completion) => {
      await db.codeGeneratorMessage.create({
        data: {
          userId: session.user.id,
          codeGeneratorId: targetCodenerator.id,
          content: completion,
          role: "assistant",
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
}
