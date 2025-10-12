import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import querystring from "node:querystring";
import { HoverLink } from "./hoverlink";

interface NowPlayingProps {
  className?: string;
}

export const NowPlaying = async ({ className }: NowPlayingProps) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const basicToken = Buffer.from(`${clientId}:${clientSecret}`).toString(
    "base64",
  );

  const response = await (
    await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    })
  ).json();

  const sdk = SpotifyApi.withAccessToken(clientId as string, response);
  const currentlyPlaying = await sdk.player.getCurrentlyPlayingTrack();

  if (currentlyPlaying === null || currentlyPlaying.item === null) {
    return null;
  }

  return (
    <span className={className}>
      (currently listening to{" "}
      <HoverLink
        href={currentlyPlaying.item.external_urls.spotify}
        color="#1DB954"
      >
        <span className="font-[500]">{currentlyPlaying.item.name}</span>
      </HoverLink>{" "}
      by{" "}
      <span className="font-[500]">
        {/* @ts-ignore */}
        {currentlyPlaying.item.artists.map((artist) => artist.name).join(", ")}
      </span>
      )
    </span>
  );
};
