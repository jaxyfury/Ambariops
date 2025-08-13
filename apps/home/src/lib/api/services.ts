
'use client';

import type { DocumentationArticle } from '@amberops/lib';

const WEB_URL = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';

// In a larger app, this might be a shared client, but for the home app's limited needs,
// a direct fetch is clean and simple.
export async function fetchDocumentationArticles(): Promise<DocumentationArticle[]> {
    // The API routes are served from the `web` app, so we need the full URL.
    const res = await fetch(`${WEB_URL}/api/v1/documentation`);
    if (!res.ok) {
        throw new Error('Failed to fetch documentation articles');
    }
    return res.json();
}
