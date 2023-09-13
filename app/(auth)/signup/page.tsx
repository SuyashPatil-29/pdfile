"use client"
import UseGoogleButton from "@/components/app_components/auth/UseGoogleButton";
import Link from "next/link";

export default function SignIn() {
  return (
    <main className="flex flex-col space-y-6 max-w-sm items-center text-center">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          By continuing, you are setting up a PDFILE account and agree to
          our User Agreement and Privacy Policy.
        </p>
      </div>
      <UseGoogleButton>Sign up with Google</UseGoogleButton>
      <p className="text-sm text-muted-foreground">
        Already with PDFILE?{" "}
        <Link className="underline" href="/signin">
          Sign In
        </Link>
      </p>
    </main>
  );
}