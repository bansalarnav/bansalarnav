import { unstable_cache } from "next/cache";
import Parser from "rss-parser";
import { extractAccentColor } from "./accent-color";
import { MovieLink } from "./movielink";

const LETTERBOXD_USERNAME = "tperm";

interface LatestMoviesProps {
  className?: string;
  count?: number;
}

type LetterboxdItem = {
  title?: string;
  link?: string;
  filmTitle?: string;
  filmYear?: string;
  content?: string;
  description?: string;
};

type Movie = {
  href: string;
  name: string;
  poster?: string;
  accent?: string;
};

const extractPoster = (item: LetterboxdItem): string | undefined => {
  const html = item.content ?? item.description ?? "";
  const match = /<img src="([^"]+)"/.exec(html);
  return match?.[1];
};

const getMovies = unstable_cache(
  async (count: number): Promise<Movie[]> => {
    const parser = new Parser<Record<string, unknown>, LetterboxdItem>({
      customFields: {
        item: [
          ["letterboxd:filmTitle", "filmTitle"],
          ["letterboxd:filmYear", "filmYear"],
        ],
      },
    });

    const feed = await parser.parseURL(
      `https://letterboxd.com/${LETTERBOXD_USERNAME}/rss/`,
    );
    const items = feed.items.slice(0, count);

    return Promise.all(
      items.map(async (item) => {
        const poster = extractPoster(item);
        return {
          href: item.link ?? "#",
          name: item.filmTitle ?? item.title ?? "a film",
          poster,
          accent: poster ? await extractAccentColor(poster) : undefined,
        };
      }),
    );
  },
  ["letterboxd-latest-movies"],
  { revalidate: 3600, tags: ["letterboxd"] },
);

export const LatestMovies = async ({
  className,
  count = 3,
}: LatestMoviesProps) => {
  let movies: Movie[] = [];
  try {
    movies = await getMovies(count);
  } catch {
    return null;
  }

  if (movies.length === 0) {
    return null;
  }

  return (
    <span className={className}>
      <style>{`
        .movie-link {
          background-size: 100% 40%;
          background-repeat: no-repeat;
          background-position: bottom;
          transition: background-size 200ms ease;
        }
        .movie-link:hover {
          background-size: 100% 100%;
        }
      `}</style>
      Recently I've watched{" "}
      {movies.map((movie, index) => {
        const separator =
          index === 0 ? "" : index === movies.length - 1 ? ", and " : ", ";
        return (
          <span key={movie.href}>
            {separator}
            <MovieLink
              href={movie.href}
              name={movie.name}
              poster={movie.poster}
              accent={movie.accent}
            />
          </span>
        );
      })}
      .
    </span>
  );
};
