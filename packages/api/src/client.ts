
import type { DocumentationArticle, PricingTier, Testimonial, FAQ } from '@amberops/lib';

// All API calls from the `home` app are proxied through the `web` app
const API_URL = '/api/v1';

export async function fetchDocumentationArticles(): Promise<DocumentationArticle[]> {
    const res = await fetch(`${API_URL}/documentation`);
    if (!res.ok) {
        throw new Error('Failed to fetch documentation articles');
    }
    return res.json();
}

export async function fetchPricingTiers(): Promise<PricingTier[]> {
    const res = await fetch(`${API_URL}/pricing`);
     if (!res.ok) {
        throw new Error('Failed to fetch pricing tiers');
    }
    return res.json();
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
    const res = await fetch(`${API_URL}/testimonials`);
    if (!res.ok) {
        throw new Error('Failed to fetch testimonials');
    }
    return res.json();
}

export async function fetchFaqs(): Promise<FAQ[]> {
    const res = await fetch(`${API_URL}/faqs`);
    if (!res.ok) {
        throw new Error('Failed to fetch FAQs');
    }
    return res.json();
}
