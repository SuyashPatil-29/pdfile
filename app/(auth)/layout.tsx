import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/authOptions";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthSession();
  if (session) redirect("/dashboard");

  return (
    <div className="h-screen flex justify-center items-center bg-black"
    style={{backgroundImage: "url(/assets/docs-right.svg)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "left"}}
    >
      <div className="m-4 md:m-6 absolute top-0 left-0 text-white">
        <Link href="/">
          <Button variant="ghost">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}