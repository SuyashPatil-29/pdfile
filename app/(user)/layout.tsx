import Navbar from "@/components/app_components/dashboard/Navbar";
import { getAuthSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
//   const session = await getAuthSession();
//   if (!session?.user.email) redirect("/signin");

  return (
    <div className="flex flex-col min-h-screen pb-16 bg-white"
    // style={{backgroundImage: "url(/assets/docs-right.svg)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "left"}}
    >
      <Navbar />
      {children}
    </div>
  );
}