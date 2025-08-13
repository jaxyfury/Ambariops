
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const client = await clientPromise;
        const db = client.db();
        
        const doc = await db.collection('documentation').findOne({ slug });

        if (!doc) {
            return NextResponse.json({ message: 'Document not found' }, { status: 404 });
        }

        const { _id, ...docWithoutId } = doc;

        return NextResponse.json({ ...docWithoutId, id: _id.toString() });

    } catch (error) {
        console.error('Failed to fetch document:', error);
        return NextResponse.json({ message: 'Failed to fetch document' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const { title, content } = await request.json();

        const client = await clientPromise;
        const db = client.db();

        const result = await db.collection('documentation').findOneAndUpdate(
            { slug },
            { $set: { title, content, updatedAt: new Date() } },
            { returnDocument: 'after' }
        );

        if (!result) {
            return NextResponse.json({ message: 'Document not found' }, { status: 404 });
        }
        
        const { _id, ...docWithoutId } = result;

        return NextResponse.json({ ...docWithoutId, id: _id.toString() });
    } catch (error) {
        console.error('Failed to update document:', error);
        return NextResponse.json({ message: 'Failed to update document' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const client = await clientPromise;
        const db = client.db();

        const result = await db.collection('documentation').deleteOne({ slug });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Document not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Document deleted successfully' });
    } catch (error) {
        console.error('Failed to delete document:', error);
        return NextResponse.json({ message: 'Failed to delete document' }, { status: 500 });
    }
}
