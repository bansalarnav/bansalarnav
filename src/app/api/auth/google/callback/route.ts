import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) return new Response("Bad Request", { status: 400 });

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  const res = await (
    await fetch(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`,
      {
        method: "POST",
      },
    )
  ).json();

  const accessToken = res.access_token;
  if (!accessToken) return new Response("Unauthorized", { status: 401 });

  const userInfo = await (
    await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
    )
  ).json();

  if (!userInfo) return new Response("Unauthorized", { status: 401 });

  const payload = {
    name: userInfo.name,
    email: userInfo.email,
    picture: userInfo.picture,
  };

  const response = NextResponse.redirect(new URL("/guestbook", request.url));
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);

  response.cookies.set("token", token, { httpOnly: true, path: "/" });

  return response;
};
