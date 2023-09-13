import { getAuthSession } from "@/lib/authOptions";
import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getAuthSession();

  if (!session)
    return NextResponse.json({ error: "Unauthroized request", status: 401 });

  const { title, description, source } = (await req.json()) as {
    title: string;
    description: string;
    source: string;
  }
  if (!title || !description || !source)
    return NextResponse.json({
      error: "Invalid request, incorrect payload",
      status: 400,
    });

  const newTutor = await db.tutor.create({
    data: {
      title,
      description,
      source,
      userId: session.user.id,
    },
  });

  await db.generation.create({
    data: {
      userId: session.user.id,
      type: "tutor",
    },
  });

  return NextResponse.json(newTutor);
}
// Import your Prisma client

// ...

export async function GET(req: NextRequest) {
  const session = await getAuthSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized request", status: 401 });

  console.log(session.user.id);

  const tutors = await db.tutor.findMany({
    where: {
      userId: session.user.id,
    },
  });

  console.log(tutors);

  return NextResponse.json(tutors);
}
