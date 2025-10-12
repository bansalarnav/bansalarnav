import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.POSTGRES_URL as string);
export { db };
