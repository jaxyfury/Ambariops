
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const versions = await db.collection('configVersions').find({}).sort({ version: -1 }).toArray();
    const formatted = versions.map(v => ({ ...v, id: v._id.toString() }));
    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Failed to fetch config versions:', error);
    return NextResponse.json({ message: 'Failed to fetch config versions' }, { status: 500 });
  }
}
