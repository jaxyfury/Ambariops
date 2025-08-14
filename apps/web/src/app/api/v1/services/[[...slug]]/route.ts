
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
        return NextResponse.json({ message: 'Invalid service ID' }, { status: 400 });
      }
      const service = await db.collection('services').findOne({ _id: new ObjectId(slug) });
      if (!service) {
        return NextResponse.json({ message: 'Service not found' }, { status: 404 });
      }
      return NextResponse.json({ ...service, id: service._id.toString() });
    }

    const services = await db.collection('services').find({}).toArray();
    const formattedServices = services.map(s => ({ ...s, id: s._id.toString() }));
    return NextResponse.json(formattedServices);
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return NextResponse.json({ message: 'Failed to fetch services' }, { status: 500 });
  }
}
