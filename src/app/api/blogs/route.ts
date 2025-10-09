import { db } from "@/db";
import { blogs } from "@/db/schema/blog";
import { and, asc, desc, ilike, inArray, isNull, not, SQL } from "drizzle-orm";
import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { EOrder } from "../../../../types/global.types";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams

    const q = searchParams.get("q");
    const limit = searchParams.get("limit");
    const order = searchParams.get("order");
    const slugs = searchParams.get("slugs")?.split(",") || [];

    const filters: SQL[] = [];

    if (q) filters.push(ilike(blogs.title, `%${q}%`));
    if (slugs.length > 0) filters.push(inArray(blogs.slug, slugs));

    const foundBlogs = await db
        .select({
            id: blogs.id,
            title: blogs.title,
            slug: blogs.slug,
            summary: blogs.summary,
            publishedAt: blogs.publishedAt,
            keywords: blogs.keywords,
            coverImage: blogs.coverImage,
            length: blogs.length
        })
        .from(blogs)
        .where(and(...filters, not(isNull(blogs.publishedAt)))) // ensure blogs are published
        .orderBy(order === EOrder.Asc ? asc(blogs.publishedAt) : desc(blogs.publishedAt))
        .limit(Number(limit) || 100); // TODO: this should not be hardcoded

    return NextResponse.json(foundBlogs);
}