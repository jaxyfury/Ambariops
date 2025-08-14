
'use client';

import type { DocumentationArticle, PricingTier, Testimonial, FAQ } from '@amberops/lib';

// Make requests to the same origin, to be proxied by Next.js rewrites
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

export async function fetchTestimonials(): Promise<Testimonial[]> {
    const res = await fetch(`${API_URL}/v1/testimonials`);
    if (!res.ok) {
        throw new Error('Failed to fetch testimonials');
    }
    return res.json();
}

export async function fetchFaqs(): Promise<FAQ[]> {
    const res = await fetch(`${API_URL}/v1/faqs`);
    if (!res.ok) {
        throw new Error('Failed to fetch FAQs');
    }
    return res.json();
}
