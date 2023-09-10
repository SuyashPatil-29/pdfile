"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export function SigninButton() {
  const { data: session, status } = useSession();

  return (
    <>
      {status == "loading" ? (
        <Skeleton className="w-[104px] h-9 shrink-0" />
      ) : (
        <>
          {session ? (
            <Link href="/dashboard">
              <Button variant="secondary">Dashboard</Button>
            </Link>
          ) : (
            <Button variant="secondary" onClick={() => signIn()}>
              Sign In
            </Button>
          )}
        </>
      )}
    </>
  );
}