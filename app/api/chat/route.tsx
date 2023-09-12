
import { getAuthSession } from "@/lib/authOptions";
import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getAuthSession();

  if (!session)
    return NextResponse.json({ error: "Unauthroized request", status: 401 });

  const { title, description, source } = (await req.json()) as {
    title?: string;
    description?: string;
    source?: string;
  };

  if (!title || !description || !source)
    return NextResponse.json({
      error: "Invalid request, incorrect payload",
      status: 400,
    });

//   const isLimitExceeded = await limitExceeded(session);
//   if (isLimitExceeded)
//     return NextResponse.json({ error: "Limit exceeded", status: 401 });

const newTutor = await db.tutor.create({
  data: {
    title,
    description,
    source,
    email: session.user.email,
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

export async function GET(req: NextRequest) {
  const session = await getAuthSession();

  if (!session)
    return NextResponse.json({ error: "Unauthenticated request", status: 401 });

  try {
    const tutors = await db.tutor.findMany(); // Use findMany to retrieve all tutors
    return NextResponse.json(tutors);
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return NextResponse.json({ error: "An error occurred while fetching tutors", status: 500 });
  }
}