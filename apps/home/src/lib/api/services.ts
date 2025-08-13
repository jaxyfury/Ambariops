
'use client';

import type { DocumentationArticle } from '@amberops/lib';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// In a larger app, this might be a shared client, but for the home app's limited needs,
// a direct fetch is clean and simple.
export async function fetchDocumentationArticles(): Promise<DocumentationArticle[]> {
    const res = await fetch(`${API_URL}/v1/documentation`);
    if (!res.ok) {
        throw new Error('Failed to fetch documentation articles');
    }
    return res.json();
}
