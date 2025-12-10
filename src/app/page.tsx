import { HoverLink } from "@/components/hoverlink";
import { RecentMovies } from "@/components/movies";
import { NowPlaying } from "@/components/nowplaying";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div
        className="w-[100vw] h-[15vh] z-10 absolute left-0 top-0 border-b-0 border-[#f5f5f5] border-dashed"
        style={{
          borderLeftStyle: "dashed",
          borderRightStyle: "dashed",
          borderImageSource:
            "repeating-linear-gradient(to right, #f5f5f5 0, #f5f5f5 10px, transparent 10px, transparent 20px)",
          borderImageSlice: "1",
        }}
      >
        {/* <div className="w-[672px] h-[15vh] mx-auto flex items-center justify-end pr-[30px]"> */}
        {/*   <Link */}
        {/*     href="/guestbook" */}
        {/*     className="font-[500] cursor-alias flex items-center gap-[5px]" */}
        {/*   > */}
        {/*     guestbook <ExternalLink size={18} /> */}
        {/*   </Link> */}
        {/* </div> */}
      </div>
      <div
        className="w-[672px] min-h-[100vh] mx-auto border-x-0 border-[#f5f5f5] border-dashed pt-[8vh]"
        style={{
          borderLeftStyle: "dashed",
          borderRightStyle: "dashed",
          borderImageSource:
            "repeating-linear-gradient(to bottom, #f5f5f5 0, #f5f5f5 10px, transparent 10px, transparent 20px)",
          borderImageSlice: "1",
        }}
      >
        <Image
          src="/me.jpeg"
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
        <p className="text-[#474747] text-[17px] mt-[8px]">
          I'm a student at the{" "}
          <HoverLink
            href="https://cs.illinois.edu"
            className="font-[500]"
            color="#E84A27"
          >
            University of Illinois, Urbana-Champaign
          </HoverLink>
          , where I'm studying{" "}
          <span className="font-[500]">Computer Science</span>. I especially
          enjoy all things tech but also love learning random tidbits about
          basically everything (btw, you're a fish).
        </p>

        <p className="text-[#474747] text-[17px] mt-[12px]">
          When I'm free I love listening to music <NowPlaying /> or watching
          movies. Some movies I've watched recently include <RecentMovies />
        </p>
        <div>
          <h3 className="font-[quando] m-[0] text-[#000] text-[22px] mt-[28px]">
            Stack
          </h3>
          <div className="text-[#474747] text-[17px] mt-[4px]">
            I mostly live in the{" "}
            <HoverLink color="#4577C0" href="">
              TypeScript
            </HoverLink>{" "}
            ecosystem, building full-stack apps with{" "}
            <HoverLink color="#58C4DC" href="">
              React
            </HoverLink>
            ,{" "}
            <HoverLink color="#4F4F4F" href="">
              Next.js
            </HoverLink>
            , and{" "}
            <HoverLink color="#F472B6" href="">
              Bun
            </HoverLink>{" "}
            (lately I’ve been enjoying{" "}
            <HoverLink color="#E34798" href="">
              Elysia
            </HoverLink>{" "}
            with{" "}
            <HoverLink color="#CEF66C" opacity="90" href="">
              Drizzle
            </HoverLink>
            ).
            <p className="h-[8px]" />I maintain a soft spot for systems
            programming with <HoverLink href="">C++</HoverLink> and{" "}
            <HoverLink color="#EBA842" opacity="80" href="">
              Zig
            </HoverLink>
            , and occasionally build mobile apps with{" "}
            <HoverLink color="#2D67D0" href="">
              Flutter
            </HoverLink>{" "}
            or{" "}
            <HoverLink color="#58C4DC" href="">
              React Native
            </HoverLink>
            . I recently started digging deeper into Data Science and AI/ML with
            Python.
            <p className="h-[8px]" /> I also like to tinker around with Arduinos
            and ESP32s when I'm free.
            <p className="mt-[12px] italic font-[quando] text-[15px]">
              tl;dr - If it involves code, I'm probably into it
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-[quando]  text-[#000] text-[22px] mt-[20px]">
            Projects
          </h3>
          <p className="text-[#474747] text-[17px] mt-[6px]">
            {/* I work mostly with <span>TypeScript</span> */}
            Some text blah blah blah blah
          </p>
        </div>
        <div>
          <h3 className="font-[quando]  text-[#000] text-[22px] mt-[20px]">
            Contact Me
          </h3>
          <div className="text-[#474747] text-[17px] mt-[4px]">
            You can find me at practically every platform online, but here are
            some of my favourites:
            <ul className="list-disc mt-[8px] ml-[40px]">
              <li>
                <HoverLink
                  href="mailto:arnavbansal101@gmail.com"
                  color="#EA4335"
                  opacity="30"
                >
                  email:{" "}
                  <span className="font-medium">arnavbansal101@gmail.com</span>
                </HoverLink>
              </li>
              <li>
                <HoverLink
                  href="https://github.com/bansalarnav"
                  color="#333333"
                  opacity="30"
                >
                  github: <span className="font-medium">@bansalarnav</span>
                </HoverLink>
              </li>
              <li>
                <HoverLink href="https://x.com/arnvbnsl" color="#1DA1F2">
                  x/twitter: <span className="font-medium">@arnvbnsl</span>
                </HoverLink>
              </li>
              <li>
                <HoverLink
                  href="https://discord.com/users/tperm."
                  color="#5865F2"
                >
                  discord: <span className="font-medium">@tperm.</span>
                </HoverLink>
              </li>
              <li>
                <HoverLink href="https://letterboxd.com/tperm" color="#00D735">
                  letterboxd: <span className="font-medium">@tperm</span>
                </HoverLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-[10vh] flex justify-center items-center mt-[40px] border-t-1 border-[#00000020]">
          footer
        </div>
      </div>
    </>
  );
}
