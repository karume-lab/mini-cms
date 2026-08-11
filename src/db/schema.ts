import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const directorates = sqliteTable("directorates", {
  id: text("id").primaryKey(), // e.g. "ict"
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  leadershipName: text("leadership_name"),
  leadershipTitle: text("leadership_title"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const pages = sqliteTable("pages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  type: text("type").notNull().default("custom"), // about, contact, notice-board, custom
  directorateId: text("directorate_id").references(() => directorates.id),
  content: text("content").notNull(), // JSON string from BlockNote
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
