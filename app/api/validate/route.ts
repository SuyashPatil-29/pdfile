import { getAuthSession } from "@/lib/authOptions";
import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();

  if (!session)
    return NextResponse.json({ error: "Unauthenticated request", status: 401 });

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      tutors: {
        include: {
          messages: true,
        },
      },
      generations: true,
      codeGenerators: true,
      messages: true,
    },
  });

  return NextResponse.json(user);
}
