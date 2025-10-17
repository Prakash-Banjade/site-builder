import { serverFetch } from '@/lib/data-access.ts/server-fetch'
import type { MetadataRoute } from 'next'
import { TPagesResponse } from '../../types/page.types';
import { TBlogsResponse_Public } from '../../types/blog.types';
import { HOME_SLUG } from '@/CONSTANTS';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const nextUrl = process.env.NEXT_PUBLIC_URL!

    const pagesResponse = await serverFetch("/pages", { next: { revalidate: 60 } });
    const pages: TPagesResponse["data"] = (pagesResponse.ok) ? await pagesResponse.json() : [];

    const blogsResponse = await serverFetch("/blogs", { next: { revalidate: 60 } });
    const blogs: TBlogsResponse_Public = (blogsResponse.ok) ? await blogsResponse.json() : [];

    const pagesSitemap: MetadataRoute.Sitemap = pages.map(p => {
        return ({
            url: `${nextUrl}/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: 'yearly',
            priority: p.slug === HOME_SLUG ? 1 : 0.8
        })

    });

    const blogsSitemap: MetadataRoute.Sitemap = blogs.map(b => ({
        url: `${nextUrl}/blogs/${b.slug}`,
        lastModified: b.updatedAt,
        changeFrequency: 'yearly',
        priority: 0.8
    }));

    return [
        ...pagesSitemap,
        ...blogsSitemap,
    ]
}