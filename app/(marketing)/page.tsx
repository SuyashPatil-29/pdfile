import { Button } from "@/components/ui/button";
import { Alfa_Slab_One } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const BebasNeue = Alfa_Slab_One({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export default function Home() {
  return (
    <div
      className={` ${BebasNeue.className} h-full w-full flex items-center justify-around bg-black pl-10`}
      style={{backgroundImage: "url(/assets/blue-purple-1.svg)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}
    >
      <div>
        <h1 className="text-[70px] bg-gradient-to-r from-pink-500 tracking-wide via-yellow-500 to-purple-500 bg-clip-text text-transparent cursor-crosshair">
          WELCOME TO PDFILE
        </h1>
        <h1 className="text-[40px] bg-gradient-to-r from-green-300 tracking-wide to-yellow-500 bg-clip-text text-transparent" >TALK TO YOUR PDF</h1>
        <li className=" text-white text-xl tracking-wide mt-[40px] mb-2">
          Ask questions and get answers tailoured to your PDF
        </li>
        <li className=" text-white text-xl tracking-wide mb-2">
          Summarize, make short notes and get a quick overview of your PDF
        </li>
        <li className=" text-white text-xl tracking-wide">
          Make studying for exams super easy, productive and effective
        </li>
        <div className="flex gap-4">
          <Link href="/signup">
            <Button className="bg-white text-black text-xl rounded-md px-[30px] py-[25px] mt-[40px] hover:bg-white hover:scale-110 transition duration-200 ease-in-out">
              Get Started
            </Button>
          </Link>
          <Link href="/signin">
            <Button className="bg-white text-black text-xl rounded-md px-[30px] py-[25px] mt-[40px] hover:bg-white hover:scale-110 transition duration-200 ease-in-out">
              Login
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Image
          src="/assets/folder-iso-gradient.png"
          height={600}
          width={600}
          alt="pdf image"
          className=""
        />
      </div>
    </div>
  );
}
