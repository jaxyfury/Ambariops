
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request, { params }: { params: { type: 'terms' | 'privacy' } }) {
    try {
        const { type } = params;
        const client = await clientPromise;
        const db = client.db();
        
        const doc = await db.collection('legal').findOne({ type });

        if (!doc) {
            return NextResponse.json({ content: `No content found for ${type}.` });
        }

        return NextResponse.json(doc);

    } catch (error) {
        console.error(`Failed to fetch ${params.type}:`, error);
        return NextResponse.json({ message: `Failed to fetch ${params.type}` }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { type: 'terms' | 'privacy' } }) {
    try {
        const { type } = params;
        const { content } = await request.json();

        const client = await clientPromise;
        const db = client.db();

        const result = await db.collection('legal').findOneAndUpdate(
            { type },
            { $set: { content, updatedAt: new Date() } },
            { upsert: true, returnDocument: 'after' }
        );
        
        return NextResponse.json(result);
    } catch (error) {
        console.error(`Failed to update ${params.type}:`, error);
        return NextResponse.json({ message: `Failed to update ${params.type}` }, { status: 500 });
    }
}
