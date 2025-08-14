
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { FAQ } from '@amberops/lib';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const faqs = await db.collection('faqs').find({}).toArray();
    const formattedFaqs = faqs.map(faq => ({ ...faq, id: faq._id.toString() }));
    return NextResponse.json(formattedFaqs);
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    return NextResponse.json({ message: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { question, answer } = await request.json() as Omit<FAQ, 'id'>;
        
        if (!question || !answer) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        const newFaq = { question, answer };

        const result = await db.collection('faqs').insertOne(newFaq);
        
        return NextResponse.json({ ...newFaq, id: result.insertedId.toString() }, { status: 201 });

    } catch (error) {
        console.error('Failed to add FAQ:', error);
        return NextResponse.json({ message: 'Failed to add FAQ' }, { status: 500 });
    }
}
