import { getAuthSession } from "@/lib/authOptions";
import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getAuthSession();

  if (!session)
    return NextResponse.json({ error: "Unauthenticated request", status: 401 });

  const user = await db.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  return NextResponse.json(user);
}

// pages/api/getUser.js

// import { getAuthSession } from "@/lib/authOptions";
// import { db } from "@/lib/prismadb";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   const session = await getAuthSession();

//   if (!session)
//     return NextResponse.json({ error: "Unauthenticated request", status: 401 });

//   try {
//     const user = await db.user.findUnique({
//       where: {
//         email: session?.user.email,
//       },
//       include: {
//         tutors: true,       // Include the 'tutors' relation  // Include the 'generations' relation
//       },
//     });

//     // Check if the user exists
//     if (!user) {
//       return NextResponse.json({ error: "User not found", status: 404 });
//     }

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return NextResponse.json({ error: "Internal Server Error", status: 500 });
//   }
// }

