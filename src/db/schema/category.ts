import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { blogs } from "./blog";
import { relations } from "drizzle-orm";

export const categoryTable = pgTable(
    "categories",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        name: text("name").notNull(),

        createdAt: timestamp("created_at").notNull().defaultNow(),
        updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
    },
    (table) => ({
        nameUnique: uniqueIndex("categories_name_unique").on(table.name),
    })
);

export const usersRelations = relations(blogs, ({ many }) => ({
    blogs: many(blogs),
}));