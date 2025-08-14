
'use client';

import type { DocumentationArticle, PricingTier } from '@amberops/lib';

const API_URL = '/api';

// In a larger app, this might be a shared client, but for the home app's limited needs,
// a direct fetch is clean and simple.
export async function fetchDocumentationArticles(): Promise<DocumentationArticle[]> {
    const res = await fetch(`${API_URL}/v1/documentation`);
    if (!res.ok) {
        throw new Error('Failed to fetch documentation articles');
    }
    return res.json();
}

export async function fetchPricingTiers(): Promise<PricingTier[]> {
    const res = await fetch(`${API_URL}/v1/pricing`);
     if (!res.ok) {
        throw new Error('Failed to fetch pricing tiers');
    }
    return res.json();
}
