import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  picture: text("picture").notNull(),
  message: text("message").notNull(),
});
