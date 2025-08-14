
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { PricingTier } from '@amberops/lib';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const tiers = await db.collection('pricingTiers').find({}).toArray();
    const formattedTiers = tiers.map(tier => ({ ...tier, id: tier._id.toString() }));
    return NextResponse.json(formattedTiers);
  } catch (error) {
    console.error('Failed to fetch pricing tiers:', error);
    return NextResponse.json({ message: 'Failed to fetch pricing tiers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { title, price, period, description, features, isFeatured } = await request.json() as Omit<PricingTier, 'id'>;
        
        if (!title || !price || !period || !description || !features) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        const newTier = { title, price, period, description, features, isFeatured: isFeatured || false };

        const result = await db.collection('pricingTiers').insertOne(newTier);
        
        return NextResponse.json({ ...newTier, id: result.insertedId.toString() }, { status: 201 });

    } catch (error) {
        console.error('Failed to add pricing tier:', error);
        return NextResponse.json({ message: 'Failed to add pricing tier' }, { status: 500 });
    }
}
