import { BlogsPageProps } from '@/app/(cms)/cms/blogs/page';
import { BlogCardSkeleton } from '@/components/site/blogs/blog-card';
import BlogsContainer from '@/components/site/blogs/blogs-container';
import BlogsSearchFilters_Public from '@/components/site/blogs/blogs-search-filters';
import RenderHero from '@/components/site/heros/render-hero';
import { Skeleton } from '@/components/ui/skeleton';
import { BLOGS_SLUG } from '@/CONSTANTS';
import { fetchPage } from '@/lib/utilities/fetchPage';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const generateMetadata = async (): Promise<Metadata> => {
    const page = await fetchPage(BLOGS_SLUG);

    return {
        title: page.metadata?.title,
        description: page.metadata?.description,
        keywords: page.metadata?.keywords
    }
}

export default async function BlogsPage() {
    const page = await fetchPage(BLOGS_SLUG);

    return (
        <>
            <RenderHero hero={page.heroSections[0]} />

            {/* Blogs Section */}
            <section className='container py-12'>
                {/* Search and Filter */}
                <Suspense fallback={<Skeleton className="h-12" />}>
                    <BlogsSearchFilters_Public />
                </Suspense>

                {/* Blog Posts Stack */}
                <div className="space-y-8">
                    <Suspense fallback={Array.from({ length: 3 }, (_, index) => <BlogCardSkeleton key={index} />)}>
                        <BlogsContainer />
                    </Suspense>
                </div>
            </section>
        </>
    )
}