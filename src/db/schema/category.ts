import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { blogs } from "./blog";
import { relations } from "drizzle-orm";

export enum ECategoryType {
    EVENT = "event",
    BLOG = "blog",
}

export const categoryTable = pgTable(
    "categories",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        name: text("name").notNull(),

        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
        type: text("type").$type<ECategoryType>().default(ECategoryType.BLOG).notNull(),
    },
    (table) => ({
        nameUnique: uniqueIndex("categories_name_unique").on(table.name),
    })
);

export const categoryRelations = relations(categoryTable, ({ many }) => ({
    blogs: many(blogs),
}));

export type TCategoryTableSelect = typeof categoryTable.$inferSelect;