import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";

// Define schema for input validation

const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  emailVerified: z.date().optional(),
  image: z.string().optional(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  accounts: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional(),
      access_token: z.string().optional(),
      expires_at: z.number().optional(),
      token_type: z.string().optional(),
      scope: z.string().optional(),
      id_token: z.string().optional(),
      session_state: z.string().optional(),
    })
  ),
  username: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  sessions: z.array(
    z.object({
      id: z.string(),
      sessionToken: z.string().optional(),
      userId: z.string(),
      expires: z.date(),
    })
  ),
  generations: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      date: z.date(),
      userId: z.string(),
      codeGeneratorId: z.string(),
    })
  ),
  unlimited: z.boolean().optional(),
  tutors: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      source: z.string(),
      userId: z.string(),
      createdAt: z.date(),
    })
  ),
  messages: z.array(
    z.object({
      id: z.string(),
      role: z.string(),
      content: z.string(),
      tutorId: z.string(),
      userId: z.string(),
    })
  ),
  codeGenerators: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      sourceCode: z.string(),
      userId: z.string(),
      createdAt: z.date(),
    })
  ),
  codeGeneratorMessages: z.array(
    z.object({
      id: z.string(),
      role: z.string(),
      content: z.string(),
      codeGeneratorId: z.string(),
      userId: z.string(),
      createdAt: z.date(),
    })
  ),
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
        name: '', // empty string
        emailVerified: null, // null for date fields
        image: null, // null for string fields
    
        // Include related fields with empty arrays
        tutors: {
          create: [],
        },
        
        // Include other related fields as needed
        // Example:
        generations: {
          create: [],
        },
        
        // ... add more related fields here
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