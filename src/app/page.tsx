import { HoverLink } from "@/components/hoverlink";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className="w-[100vw] h-[15vh] z-10 absolute left-0 top-0 border-b-2 border-[#f5f5f5] border-dashed"
        style={{
          borderLeftStyle: "dashed",
          borderRightStyle: "dashed",
          borderImageSource:
            "repeating-linear-gradient(to right, #f5f5f5 0, #f5f5f5 10px, transparent 10px, transparent 20px)",
          borderImageSlice: "1",
        }}
      >
        <div className="w-[40vw] h-[15vh] mx-auto flex items-center justify-end pr-[30px]">
          <Link
            href="/guestbook"
            className="font-[500] cursor-alias flex items-center gap-[5px]"
          >
            guestbook <ExternalLink size={18} />
          </Link>
        </div>
      </div>
      <div
        className="w-[40vw] min-h-[100vh] mx-auto border-x-2 border-[#f5f5f5] border-dashed pt-[15vh]"
        style={{
          borderLeftStyle: "dashed",
          borderRightStyle: "dashed",
          borderImageSource:
            "repeating-linear-gradient(to bottom, #f5f5f5 0, #f5f5f5 10px, transparent 10px, transparent 20px)",
          borderImageSlice: "1",
        }}
      >
        <Image
          src="/me.jpg"
          alt="Me"
          width={80}
          height={80}
          className="rounded-[10px]"
        />
        <div className="mt-[20px]">
          <span className="text-[34px] m-0 font-[quando]">Hi, I'm Arnav</span>
          <span className="ml-[20px] text-[#767676] font-[quando] text-[18px]">
            a.k.a tperm
          </span>
        </div>
        <p className="text-[#474747] text-[17px] mt-[10px]">
          I'm a student at the{" "}
          <HoverLink
            href="https://cs.illinois.edu"
            className="font-[500]"
            color="#E84A27"
          >
            University of Illinois, Urbana-Champaign
          </HoverLink>
          , studying <span className="font-[500]">Computer Science</span>. I
          especially enjoy all things tech but also love learning random tidbits
          about basically everything (did you know we're all fish?).
        </p>
      </div>
    </>
  );
}
