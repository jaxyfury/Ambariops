
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@amberops/ui';
import { Card, CardContent } from '@amberops/ui/components/ui/card';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import type { DocumentationArticle } from '@amberops/lib';
import { fetchDocumentationArticles } from '@amberops/api/client';

async function fetchArticle(slug: string): Promise<DocumentationArticle | null> {
    try {
        // This is not efficient, but works for the prototype without a dedicated 'fetchBySlug' endpoint
        const articles = await fetchDocumentationArticles();
        return articles.find(a => a.slug === slug) || null;
    } catch (error) {
        console.error("Failed to fetch article:", error);
        return null;
    }
}


export default function DocumentationArticlePage({ params }: { params: { slug: string } }) {
    const [article, setArticle] = useState<DocumentationArticle | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadArticle = async () => {
            setIsLoading(true);
            const fetchedArticle = await fetchArticle(params.slug);
            if (!fetchedArticle) {
                notFound();
            } else {
                setArticle(fetchedArticle);
            }
            setIsLoading(false);
        };
        loadArticle();
    }, [params.slug]);

    return (
        <div className="container py-12">
            {isLoading || !article ? (
                <div>
                    <Skeleton className="h-10 w-2/3 mb-4" />
                    <Skeleton className="h-6 w-1/3 mb-10" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            ) : (
                <>
                    <PageHeader title={article.title} description={`Last updated at ${new Date(article.updatedAt).toLocaleDateString()}`} />
                    <Card>
                        <CardContent className="prose dark:prose-invert max-w-none pt-6">
                           <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
