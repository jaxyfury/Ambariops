
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const definitions = await db.collection('alertDefinitions').find({}).toArray();
    const formatted = definitions.map(d => ({ ...d, id: d._id.toString() }));
    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Failed to fetch alert definitions:', error);
    return NextResponse.json({ message: 'Failed to fetch alert definitions' }, { status: 500 });
  }
}
