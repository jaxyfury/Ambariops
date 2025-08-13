
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@amberops/ui';
import { Card, CardContent } from '@amberops/ui/components/ui/card';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import type { DocumentationArticle } from '@amberops/lib';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';

async function fetchArticle(slug: string): Promise<DocumentationArticle | null> {
    const res = await fetch(`${WEB_URL}/api/v1/documentation/${slug}`);
    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error('Failed to fetch article');
    }
    return res.json();
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
