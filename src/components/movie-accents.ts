export const MOVIE_ACCENTS = [
  "#E84A27",
  "#4577C0",
  "#58C4DC",
  "#F472B6",
  "#E34798",
  "#CEF66C",
  "#EBA842",
  "#2D67D0",
  "#EA4335",
  "#1DA1F2",
  "#00E054",
  "#5865F2",
];

export const pickAccents = (count: number): string[] => {
  const pool = [...MOVIE_ACCENTS];
  const picked: string[] = [];
  for (let i = 0; i < count; i += 1) {
    if (pool.length === 0) {
      pool.push(...MOVIE_ACCENTS);
    }
    const index = Math.floor(Math.random() * pool.length);
    picked.push(pool.splice(index, 1)[0]);
  }
  return picked;
};
