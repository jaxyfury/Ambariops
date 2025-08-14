
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
        return NextResponse.json({ message: 'Invalid cluster ID' }, { status: 400 });
      }
      const cluster = await db.collection('clusters').findOne({ _id: new ObjectId(slug) });
      if (!cluster) {
        return NextResponse.json({ message: 'Cluster not found' }, { status: 404 });
      }
      return NextResponse.json({ ...cluster, id: cluster._id.toString() });
    }

    const clusters = await db.collection('clusters').find({}).toArray();
    const formattedClusters = clusters.map(c => ({ ...c, id: c._id.toString() }));
    return NextResponse.json(formattedClusters);
  } catch (error) {
    console.error('Failed to fetch clusters:', error);
    return NextResponse.json({ message: 'Failed to fetch clusters' }, { status: 500 });
  }
}
