
'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@amberops/ui/components/ui/card';
import { Skeleton } from '@amberops/ui/components/ui/skeleton';
import type { LegalDocument } from '@amberops/lib';


async function fetchLegalDoc(type: 'terms' | 'privacy'): Promise<LegalDocument | null> {
    const res = await fetch(`/api/v1/legal/${type}`);
    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error('Failed to fetch legal document');
    }
    return res.json();
}

export default function LegalPage({ params }: { params: { type: string } }) {
    const [doc, setDoc] = useState<LegalDocument | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const docType = params.type === 'terms-of-service' ? 'terms' : 'privacy-policy' ? 'privacy' : null;

    useEffect(() => {
        if (!docType) {
            notFound();
            return;
        }

        const loadDoc = async () => {
            setIsLoading(true);
            const fetchedDoc = await fetchLegalDoc(docType);
            setDoc(fetchedDoc);
            setIsLoading(false);
        };
        
        loadDoc();
    }, [docType]);

    if (!docType) {
        notFound();
    }
    
    const title = docType === 'terms' ? 'Terms of Service' : 'Privacy Policy';

    return (
        <div className="container py-12">
            {isLoading || !doc ? (
                 <div>
                    <Skeleton className="h-10 w-2/3 mb-4" />
                    <Skeleton className="h-6 w-1/3 mb-10" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-4/5" />
                </div>
            ) : (
                <>
                    <PageHeader title={title} description={`Last updated at ${new Date(doc.updatedAt).toLocaleDateString()}`} />
                    <Card>
                        <CardContent className="prose dark:prose-invert max-w-none pt-6">
                            <div dangerouslySetInnerHTML={{ __html: doc.content }} />
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}

