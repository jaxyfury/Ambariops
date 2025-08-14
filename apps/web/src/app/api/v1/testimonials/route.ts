
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Testimonial } from '@amberops/lib';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const testimonials = await db.collection('testimonials').find({}).toArray();
    const formattedTestimonials = testimonials.map(t => ({ ...t, id: t._id.toString() }));
    return NextResponse.json(formattedTestimonials);
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
    return NextResponse.json({ message: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { name, role, quote, avatar } = await request.json() as Omit<Testimonial, 'id'>;
        
        if (!name || !role || !quote || !avatar) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        const newTestimonial = { name, role, quote, avatar };

        const result = await db.collection('testimonials').insertOne(newTestimonial);
        
        return NextResponse.json({ ...newTestimonial, id: result.insertedId.toString() }, { status: 201 });

    } catch (error) {
        console.error('Failed to add testimonial:', error);
        return NextResponse.json({ message: 'Failed to add testimonial' }, { status: 500 });
    }
}
