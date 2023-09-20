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
  const targetTutor = await db.tutor.findUnique({
    where: {
      id: params.id,
      userId: session.user.id,
    },
  });

  if (!targetTutor) {
    return NextResponse.json({ error: "Invalid request", status: 400 });
  }

  const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: `You are a tutoring AI named ${targetTutor.title} based on this data source: ${targetTutor.source}.
      Respond to the user's questions appropriately based on the data source.
      IMPORTANT NOTICE : Refuse to answer any questions unrelated to the data source.`,
  };

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    temperature: 1,
    messages: [instructionMessage, ...messages],
    stream: true,
  });

  messages.unshift({
    role: "system",
    content: `You are a tutoring AI named ${targetTutor.title} based on this data source: ${targetTutor.source}.
      Respond to the user's questions appropriately based on the data source.
      IMPORTANT NOTICE : Refuse to answer any questions unrelated to the data source.`
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onStart: async () => {
      await db.message.create({
        data: {
          userId: session.user.id,
          tutorId: targetTutor.id,
          content: messages[messages.length - 1].content!,
          role: "user",
        },
      });
    },
    onCompletion: async (completion) => {
      await db.message.create({
        data: {
          userId: session.user.id,
          tutorId: targetTutor.id,
          content: completion,
          role: "assistant",
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
}
