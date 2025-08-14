
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request, { params }: { params: { slug?: string[] } }) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const slug = params.slug?.[0];

    if (slug) {
      if (!ObjectId.isValid(slug)) {
        return NextResponse.json({ message: 'Invalid host ID' }, { status: 400 });
      }
      const host = await db.collection('hosts').findOne({ _id: new ObjectId(slug) });
      if (!host) {
        return NextResponse.json({ message: 'Host not found' }, { status: 404 });
      }
      return NextResponse.json({ ...host, id: host._id.toString() });
    }

    const hosts = await db.collection('hosts').find({}).toArray();
    const formattedHosts = hosts.map(h => ({ ...h, id: h._id.toString() }));
    return NextResponse.json(formattedHosts);
  } catch (error) {
    console.error('Failed to fetch hosts:', error);
    return NextResponse.json({ message: 'Failed to fetch hosts' }, { status: 500 });
  }
}
