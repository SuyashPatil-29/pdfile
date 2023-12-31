import Link from "next/link";
import { GraduationCap, Instagram } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";
import { Sidebar } from "./Sidebar";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { HeaderLink } from "../HeaderLink";
import { UserDropdown } from "./Userdropdown";

export default function Navbar() {
  return (
    <header className=" h-20 border-b z-50 sticky shrink-0 flex items-center justify-between px-6 md:px-10 top-0 left-0 shadow-sm bg-background">
      <Sidebar />
      <div className="hidden md:flex items-center space-x-10">
        <Link href="/dashboard" className="flex items-center">
          <GraduationCap className="h-6 w-6 mr-2.5" />
          <h1 className="font-semibold text-xl">{siteConfig.name}</h1>
        </Link>
        <div className="flex items-center space-x-8 text-sm font-medium">
          <HeaderLink href="/dashboard">Dashboard</HeaderLink>
          <HeaderLink href="/chat">File Chat</HeaderLink>
          <HeaderLink href="/codegenerator">Code Generator</HeaderLink>
        </div>
      </div>

      <div className="flex items-center">
        <a href="https://www.instagram.com/_suyashpatil_/" className="mr-3">
          <Button variant="ghost" size="icon">
            <Instagram className="h-5 w-5" />
          </Button>
        </a>
        <UserDropdown />
      </div>
    </header>
  );
}