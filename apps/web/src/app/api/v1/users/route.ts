
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = await db.collection('users').find({}).toArray();
    
    // Convert ObjectId to string for each user
    const formattedUsers = users.map(user => ({
      ...user,
      id: user._id.toString(),
      _id: undefined, // remove original _id
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const { name, email, role } = await request.json();
        
        if (!name || !email || !role) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        // Check if user already exists
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
        }

        const newUser = {
            name,
            email,
            role,
            avatar: `https://avatar.vercel.sh/${email}`,
            lastLogin: new Date().toISOString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('users').insertOne(newUser);
        
        return NextResponse.json({ ...newUser, id: result.insertedId.toString() }, { status: 201 });

    } catch (error) {
        console.error('Failed to add user:', error);
        return NextResponse.json({ message: 'Failed to add user' }, { status: 500 });
    }
}
