
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
        return NextResponse.json({ message: 'Invalid alert ID' }, { status: 400 });
      }
      const alert = await db.collection('alerts').findOne({ _id: new ObjectId(slug) });
      if (!alert) {
        return NextResponse.json({ message: 'Alert not found' }, { status: 404 });
      }
      return NextResponse.json({ ...alert, id: alert._id.toString() });
    }

    const alerts = await db.collection('alerts').find({}).toArray();
    const formattedAlerts = alerts.map(a => ({ ...a, id: a._id.toString() }));
    return NextResponse.json(formattedAlerts);
  } catch (error) {
    console.error('Failed to fetch alerts:', error);
    return NextResponse.json({ message: 'Failed to fetch alerts' }, { status: 500 });
  }
}
