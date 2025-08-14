
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// A basic search implementation that queries multiple collections
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
      return NextResponse.json({ message: 'Query parameter "q" is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const regex = new RegExp(q, 'i'); // Case-insensitive regex

    const [clusters, services, hosts] = await Promise.all([
      db.collection('clusters').find({ name: regex }).limit(5).toArray(),
      db.collection('services').find({ name: regex }).limit(5).toArray(),
      db.collection('hosts').find({ name: regex }).limit(5).toArray(),
    ]);

    const formatId = (item: any) => ({ ...item, id: item._id.toString() });

    return NextResponse.json({
      clusters: clusters.map(formatId),
      services: services.map(formatId),
      hosts: hosts.map(formatId),
    });
  } catch (error) {
    console.error('Search failed:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
