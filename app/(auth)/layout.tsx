import Navbar from "@/components/app_components/Navbar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <main>
        <Navbar />
        {children}
      </main>
  )
}
