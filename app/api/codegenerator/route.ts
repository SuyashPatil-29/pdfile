import { getAuthSession } from "@/lib/authOptions";
import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getAuthSession();

  if (!session)
    return NextResponse.json({ error: "Unauthroized request", status: 401 });

  const { language } = (await req.json()) as {
    language: string;
  }
  if (!language)
    return NextResponse.json({
      error: "Invalid request, incorrect payload",
      status: 400,
    });

  const newCodeGenerator = await db.codeGenerator.create({
    data: {
      language,
      userId: session.user.id,
    },
  });

  await db.generation.create({
    data: {
      userId: session.user.id,
      type: "code-generator",
    },
  });

  return NextResponse.json(newCodeGenerator);
}
// Import your Prisma client

// ...

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized request", status: 401 });

  const codeGenerators = await db.codeGenerator.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return NextResponse.json(codeGenerators);
}
