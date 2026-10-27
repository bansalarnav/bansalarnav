import sharp from "sharp";

const rgbToHsl = (r: number, g: number, b: number) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }
  return { h, s, l };
};

const hslToRgb = (h: number, s: number, l: number) => {
  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const channel = (t: number) => {
    let tn = t;
    if (tn < 0) tn += 1;
    if (tn > 1) tn -= 1;
    if (tn < 1 / 6) return p + (q - p) * 6 * tn;
    if (tn < 1 / 2) return q;
    if (tn < 2 / 3) return p + (q - p) * (2 / 3 - tn) * 6;
    return p;
  };
  return {
    r: Math.round(channel(h + 1 / 3) * 255),
    g: Math.round(channel(h) * 255),
    b: Math.round(channel(h - 1 / 3) * 255),
  };
};

const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((c) => Math.round(c).toString(16).padStart(2, "0"))
    .join("")}`;

export const extractAccentColor = async (
  url: string,
): Promise<string | undefined> => {
  try {
    const response = await fetch(url);
    if (!response.ok) return undefined;
    const buffer = Buffer.from(await response.arrayBuffer());

    const { data, info } = await sharp(buffer)
      .resize(64, 96, { fit: "cover" })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { channels } = info;
    const buckets = new Map<
      string,
      { n: number; r: number; g: number; b: number }
    >();

    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const { s, l } = rgbToHsl(r, g, b);
      if (s < 0.25 || l < 0.2 || l > 0.85) continue;
      const key = `${r >> 5},${g >> 5},${b >> 5}`;
      const current = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
      current.n += 1;
      current.r += r;
      current.g += g;
      current.b += b;
      buckets.set(key, current);
    }

    let best: { h: number; s: number; l: number; weight: number } | undefined;
    for (const bucket of buckets.values()) {
      const r = bucket.r / bucket.n;
      const g = bucket.g / bucket.n;
      const b = bucket.b / bucket.n;
      const { h, s, l } = rgbToHsl(r, g, b);
      const weight = bucket.n * (0.5 + s) * (1 - Math.abs(l - 0.55));
      if (!best || weight > best.weight) best = { h, s, l, weight };
    }

    if (!best) return undefined;

    const saturated = Math.min(0.75, Math.max(best.s, 0.5));
    const lightness = Math.min(0.6, Math.max(best.l, 0.38));
    const { r, g, b } = hslToRgb(best.h, saturated, lightness);
    return toHex(r, g, b);
  } catch {
    return undefined;
  }
};
