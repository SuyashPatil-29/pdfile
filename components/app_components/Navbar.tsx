import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LogoutButton from "./LogoutButton";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center justify-between w-screen h-28 bg-transparent fixed top-0 left-0 px-11">
      <div className="flex justify-items-center items-center">
        <Link href="/">
          <Image
            src="/assets/file-text-front-gradient.png"
            width={75}
            height={75}
            alt="LOGO"
          />
        </Link>
      </div>
      <div>{session?.user ? <LogoutButton /> : null}</div>
    </div>
  );
};

export default Navbar;
