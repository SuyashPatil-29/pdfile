import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import AllProviders from "@/components/app_components/providers/Providers";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className="scroll-smooth">
        <AllProviders>
          {children}
          <Toaster />
        </AllProviders>
      </body>
    </html>
  );
}