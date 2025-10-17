import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { TNavLinksDto } from "@/schemas/globals.schema";
import { IRichTextSchema } from "@/schemas/rich-text.schema";

export const header = pgTable(
    "header",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        navLinks: jsonb("navLinks").$type<TNavLinksDto>().notNull(),

        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
    }
);

export const footer = pgTable(
    "footer",
    {
        id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        navLinks: jsonb("navLinks").$type<TNavLinksDto>().notNull(),
        footerText: jsonb("footerText").$type<IRichTextSchema>().notNull(),

        createdAt: timestamp("createdAt").notNull().defaultNow(),
        updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
    }
);

export type THeaderSelect = typeof header.$inferSelect;
export type TFooterSelect = typeof footer.$inferSelect;