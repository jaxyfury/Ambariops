
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { randomBytes } from 'crypto';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const user = await db.collection('users').findOne({ email });

    if (user) {
      // In a real application, you would:
      // 1. Generate a secure, unique token.
      const token = randomBytes(32).toString('hex');
      const passwordResetToken = await bcrypt.hash(token, 10);
      const passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour from now

      // 2. Store the hashed token and its expiry date in the user's document.
      await db.collection('users').updateOne(
        { _id: user._id },
        { $set: { passwordResetToken, passwordResetExpires } }
      );

      // 3. Send an email to the user with a link containing the raw token.
      // e.g., using a service like SendGrid, Nodemailer, or AWS SES.
      // The link would look like: https://yourapp.com/auth/reset-password?token=${token}
      console.log(`Password reset token for ${email}: ${token}`);
      console.log('In a real app, an email would be sent.');
    } else {
        // Even if the user doesn't exist, we send a generic success response
        // to prevent email enumeration attacks.
        console.log(`Password reset requested for non-existent user: ${email}`);
    }

    // Always return a success response to prevent attackers from knowing which emails are registered.
    return NextResponse.json({ message: 'If an account with that email exists, a password reset link has been sent.' });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ message: 'An internal server error occurred' }, { status: 500 });
  }
}
