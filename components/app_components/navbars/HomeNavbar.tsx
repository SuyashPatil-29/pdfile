import { GraduationCap } from "lucide-react";
import { SigninButton } from "./SigninButton";
import { Button } from "@/components/ui/button";

export default function SignedInNavbar() {
  return (
    <nav className="h-20 bg-black text-white z-50 sticky shrink-0 flex items-center justify-between px-6 md:px-12 lg:px-24 top-0 left-0 bg-background">
      <div className="flex items-center">
        <GraduationCap className="h-6 w-6 mr-2" />
        <h1 className="font-semibold">PDFILE</h1>
      </div>
      <div className="flex items-center gap-2">
        <a href="https://discord.gg/rCGEZwWUPt">
          <Button
            variant="ghost"
            className="hover:opacity-70 duration-500 hover:bg-inherit"
          >
            Discord
          </Button>
        </a>
        <SigninButton />
      </div>
    </nav>
  );
}