import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

// Define schema for input validation

const UserSchema = z.object({
  username: z.string().min(1, "Username is required").max(50),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const { email, username, password } = UserSchema.parse(body);

    // Check if the email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserByEmail) {
      // Check if the user has an image
      if (existingUserByEmail.image && !username) {
        return NextResponse.json(
          {
            user: existingUserByEmail,
            message: "User with email already exists and has an image",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            user: null,
            message: "Email already exists, login or use a different email",
          },
          { status: 409 }
        );
      }
    }

    // Check if the username already exists
    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUserByUsername) {
      return NextResponse.json({
        user: null,
        message: "User with the username already exists. Login or use a different username",
      },{status: 409});
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "New user created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { user: null, message: "Something went wrong" },
      { status: 500 }
    );
  }
}