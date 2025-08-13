
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import type { DocumentationArticle } from '@amberops/lib';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const articles = await db.collection('documentation').find({}).toArray();
    
    const formattedArticles = articles.map(article => ({
      ...article,
      id: article._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json(formattedArticles);
  } catch (error) {
    console.error('Failed to fetch documentation:', error);
    return NextResponse.json({ message: 'Failed to fetch documentation' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { title, content, slug } = await request.json() as Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'>;
        
        if (!title || !content || !slug) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        const existingArticle = await db.collection('documentation').findOne({ slug });
        if (existingArticle) {
            return NextResponse.json({ message: 'Article with this slug already exists' }, { status: 409 });
        }

        const newArticle = {
            title,
            slug,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('documentation').insertOne(newArticle);
        
        return NextResponse.json({ ...newArticle, id: result.insertedId.toString() }, { status: 201 });

    } catch (error) {
        console.error('Failed to add article:', error);
        return NextResponse.json({ message: 'Failed to add article' }, { status: 500 });
    }
}
