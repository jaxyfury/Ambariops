
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { name, email, role } = await request.json();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();
        
        const updateData: { [key: string]: any } = { updatedAt: new Date() };
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role;

        const result = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        );

        if (!result) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const { _id, ...userWithoutId } = result;

        return NextResponse.json({ ...userWithoutId, id: _id.toString() });
    } catch (error) {
        console.error('Failed to update user:', error);
        return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();

        const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ id });
    } catch (error) {
        console.error('Failed to delete user:', error);
        return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
    }
}
