
'use client';

import type { DocumentationArticle } from '@amberops/lib';

// In a larger app, this might be a shared client, but for the home app's limited needs,
// a direct fetch is clean and simple.
export async function fetchDocumentationArticles(): Promise<DocumentationArticle[]> {
    // The API routes are served from the `web` app, but from the browser's perspective,
    // they are at the root of the domain. We can use a relative path.
    const res = await fetch('/api/v1/documentation');
    if (!res.ok) {
        throw new Error('Failed to fetch documentation articles');
    }
    return res.json();
}
