import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { User } from '@amberops/lib';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        try {
          const client = await clientPromise;
          const db = client.db();
          const user = await db.collection('users').findOne({ email: credentials.email });

          if (!user) {
            console.log('No user found with email:', credentials.email);
            return null;
          }
          
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordCorrect) {
            console.log('Password incorrect for user:', credentials.email);
            return null;
          }

          console.log('User authenticated successfully:', user.email);
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
            console.error('Error during authorization:', error);
            return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            // @ts-ignore
            token.role = user.role;
        }
        return token;
    },
    async session({ session, token }) {
        if (session.user) {
            // @ts-ignore
            session.user.id = token.id;
            // @ts-ignore
            session.user.role = token.role;
        }
        return session;
    }
  },
  pages: {
    signIn: '/auth',
    error: '/auth', 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
