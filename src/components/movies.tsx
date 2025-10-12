import RSSParser from "rss-parser";

export const RecentMovies = async ({ className }: { className?: string }) => {
  const parser = new RSSParser();
  const feed = await parser.parseURL("https://letterboxd.com/tperm/rss/");

  return (
    <>
      {feed.items.slice(0, 3).map((item) => {
        return (
          <span key={item.link}>
            <Movie
              className={className}
              title={(item.title as string).split(",").slice(0, -1).join(",")}
            />
            {item === feed.items[2]
              ? ""
              : item === feed.items[1]
                ? " and "
                : ", "}
          </span>
        );
      })}
    </>
  );
};

const Movie = ({ title, className }: { title: string; className?: string }) => {
  return <span className={className}>{title}</span>;
};
