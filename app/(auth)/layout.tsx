import Navbar from "@/components/app_components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import Image from "next/image"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <main>
        <Navbar />
        {children}
        <Toaster />
      </main>
    </>
  )
}
