"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

export const UserAvatar = () => {
  const { data: session } = useSession();

  return (
    <Avatar className="!h-7 !w-7">
      <AvatarImage src={session?.user.image || ""} />
      <AvatarFallback>
        <Skeleton className="h-8 w-8 rounded-full" />
      </AvatarFallback>
    </Avatar>
  );
};
