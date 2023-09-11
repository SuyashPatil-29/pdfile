import SignedInNavbar from "@/components/app_components/navbars/HomeNavbar";
import { Button } from "@/components/ui/button";
import { Kanit } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const BebasNeue = Kanit({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
});

export default function Home() {
  return (
    <div className={`h-full w-full bg-black pt-6`}>
<SignedInNavbar />
      <div
        className="h-[70vh]"
        style={{
          backgroundImage: "url(/assets/docs-left.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >

        <div
          className={` ${BebasNeue.className} flex items-center justify-around pl-20`}
        >
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-white text-4xl font-semibold">
              From Code Generation to Book
            </h1>
            <h1 className="text-white text-4xl font-semibold">
              Conversations: AI-Powered PDF
            </h1>
            <h1 className="text-white text-4xl font-semibold">Chat & More</h1>
            <p className=" text-muted-foreground">We harnesses the power of artificial intelligence to help improve students
              <br /> critical thinking skills with AI, rather than replace those skills.</p>
            <div className="flex gap-4 -mt-10">
              <Link href="/signup">
                <Button className="bg-white text-black text-xl rounded-xl px-[30px] py-[25px] mt-[40px] hover:bg-white hover:scale-110 transition duration-200 ease-in-out">
                  Get Started
                </Button>
              </Link>
              <Link href="/signin">
                <Button className="bg-white text-black text-xl rounded-xl px-[30px] py-[25px] mt-[40px] hover:bg-white hover:scale-110 transition duration-200 ease-in-out">
                  Login
                </Button>
              </Link>
            p</div>
          </div>
          <div>
            <Image
              src="/assets/folder-iso-gradient.png"
              height={600}
              width={600}
              alt="pdf image"
              className=" pt-12"
            />
          </div>
        </div>
      </div>
      <div className="min-h-[30vh] bg-white">
        <div className="w-full h-full flex items-center justify-center pt-40 pb-10 bg-white">
          <h1 className="text-6xl font-bold">
            Features
          </h1>
        </div>
        <div className="w-full h-full flex items-center justify-center pt-40 pb-10 bg-white">
          <h1 className="text-6xl font-bold">
            Features
          </h1>
        </div>
        <div className="w-full h-full flex items-center justify-center pt-40 pb-10 bg-white">
          <h1 className="text-6xl font-bold">
            Features
          </h1>
        </div>

        </div>
      </div>
  );
}
