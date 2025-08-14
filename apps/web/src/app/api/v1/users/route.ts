
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

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
        const { name, email, role, password } = await request.json();
        
        if (!name || !email || !role || !password) {
            return NextResponse.json({ message: 'Missing required fields (name, email, role, password)' }, { status: 400 });
        }
        
        const client = await clientPromise;
        const db = client.db();
        
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User with this email already exists' }, { status: 409 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            role,
            password: hashedPassword,
            image: `https://avatar.vercel.sh/${email}`,
            lastLogin: new Date().toISOString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection('users').insertOne(newUser);
        
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json({ ...userWithoutPassword, id: result.insertedId.toString() }, { status: 201 });

    } catch (error) {
        console.error('Failed to add user:', error);
        return NextResponse.json({ message: 'Failed to add user' }, { status: 500 });
    }
}
