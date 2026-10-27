import querystring from "node:querystring";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { FloatingNotes } from "./floating-notes";
import { SongLink } from "./songlink";

interface NowPlayingProps {
  className?: string;
}

const artistNames = (item: {
  artists?: { name: string }[];
  show?: { name: string };
}) => {
  if (item.artists) {
    return item.artists.map((artist) => artist.name).join(", ");
  }
  return item.show?.name ?? "";
};

const embedUrl = (item: {
  id: string;
  type?: string;
  artists?: { name: string }[];
}) =>
  `https://open.spotify.com/embed/${
    item.type === "episode" || !item.artists ? "episode" : "track"
  }/${item.id}`;

export const NowPlaying = async ({ className }: NowPlayingProps) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID as string;
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
      cache: "no-store",
    })
  ).json();

  const sdk = SpotifyApi.withAccessToken(clientId, response);

  const currentlyPlaying = await sdk.player.getCurrentlyPlayingTrack();

  if (currentlyPlaying?.item) {
    const item = currentlyPlaying.item;

    return (
      <>
        <span className={className}>
          Currently listening to{" "}
          <span className="relative inline-block align-middle">
            <svg
              viewBox="0 0 512 512"
              className="record-spin relative z-10 ml-[2px] mr-[4px] inline-block h-[15px] w-[15px] shrink-0 fill-[#111] align-middle"
              aria-hidden="true"
            >
              <path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256-96a96 96 0 1 1 0 192 96 96 0 1 1 0-192zm0 224a128 128 0 1 0 0-256 128 128 0 1 0 0 256zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
              <path
                d="M256 24a232 232 0 0 1 164 68L256 256z"
                fill="#ffffff"
                opacity="0.45"
              />
            </svg>
            <FloatingNotes />
          </span>
          <SongLink
            href={item.external_urls.spotify}
            name={item.name}
            embedUrl={embedUrl(item)}
          />{" "}
          by <span className="font-[500]">{artistNames(item)}</span>
        </span>
        <style>{`
          .record-spin {
            animation: record-spin 3s linear infinite;
            transform-origin: center;
          }
          @keyframes record-spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .record-spin {
              animation: none;
            }
          }
        `}</style>
      </>
    );
  }

  const recentlyPlayed = await sdk.player.getRecentlyPlayedTracks(1);
  const last = recentlyPlayed.items[0]?.track;

  if (!last) {
    return null;
  }

  return (
    <span className={className}>
      Last listened to{" "}
      <SongLink
        href={last.external_urls.spotify}
        name={last.name}
        embedUrl={embedUrl(last)}
      />{" "}
      by <span className="font-[500]">{artistNames(last)}</span>
    </span>
  );
};
