
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const logs = await db.collection('activityLogs').find({}).sort({ timestamp: -1 }).toArray();
    const formattedLogs = logs.map(log => ({ ...log, id: log._id.toString() }));
    return NextResponse.json(formattedLogs);
  } catch (error) {
    console.error('Failed to fetch activity logs:', error);
    return NextResponse.json({ message: 'Failed to fetch activity logs' }, { status: 500 });
  }
}
