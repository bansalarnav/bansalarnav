import { db } from "@/db";
import { messages } from "@/db/schema";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Link from "next/link";

type User = {
  name: string;
  email: string;
  picture: string;
};

export default async function Page() {
  const store = await cookies();
  const token = store.get("token")?.value;
  const user: User | null = token
    ? (jwt.verify(token, process.env.JWT_SECRET as string) as User)
    : null;

  const msgs = await db.select().from(messages).limit(25);

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
        <div className="w-[672px] h-[15vh] mx-auto flex items-center justify-between px-[30px]">
          <div className="font-[500]  flex items-center gap-[5px]">
            arnav's guestbook
          </div>
          <Link
            href="/"
            className="font-[500] cursor-alias flex items-center gap-[5px]"
          >
            home
          </Link>
        </div>
      </div>
      <div
        className="w-[672px] min-h-[100vh] mx-auto border-x-2 border-[#f5f5f5] border-dashed pt-[15vh]"
        style={{
          borderLeftStyle: "dashed",
          borderRightStyle: "dashed",
          borderImageSource:
            "repeating-linear-gradient(to bottom, #f5f5f5 0, #f5f5f5 10px, transparent 10px, transparent 20px)",
          borderImageSlice: "1",
        }}
      >
        {user ? (
          `Hello there, ${user.name}`
        ) : (
          <a href={`/api/auth/google`}>
            sign in with google to leave a message
          </a>
        )}
        {msgs.map((msg) => {
          return (
            <div key={msg.id}>
              <p>{msg.message}</p>
              <p>-- {msg.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
