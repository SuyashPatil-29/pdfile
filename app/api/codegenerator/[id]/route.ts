
import { getAuthSession } from "@/lib/authOptions";
import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getAuthSession();

  if (!session)
    return NextResponse.json({ error: "Unauthroized request", status: 401 });

  const codeGenerator = await db.codeGenerator.findUnique({
    where: {
      userId: session.user.id,
      id: params.id,
    },
    include: {
      messages: true,
    },
  });

  return NextResponse.json(codeGenerator);
}

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const session = await getAuthSession();

//   if (!session)
//     return NextResponse.json({ error: "Unauthroized request", status: 401 });

//   const deletedTutor = await db.tutor.delete({
//     where: {
//       id: params.id,
//       userId: session.user.id,
//     },
//   });

//   return NextResponse.json(deletedTutor);
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const session = await getAuthSession();

//   if (!session)
//     return NextResponse.json({ error: "Unauthroized request", status: 401 });
//   const { title, description } = (await req.json()) as {
//     title?: string;
//     description?: string;
//     source?: string;
//   };

//   const updatedTutor = await db.tutor.update({
//     where: {
//       userId: session?.user.id,
//       id: params.id,
//     },
//     data: {
//       title,
//       description,
//     },
//   });

//   return NextResponse.json(updatedTutor);
// }