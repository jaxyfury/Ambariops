
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection('users').findOne({ email: credentials.email });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          // Return user object without the password
          const { password, ...userWithoutPassword } = user;
          return { ...userWithoutPassword, id: user._id.toString() };
        }
        
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        // Add custom properties from the user object
        (token as any).role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      (session.user as any).id = token.id;
      (session.user as any).role = (token as any).role;
      return session;
    },
     async signIn({ user, account, profile }) {
      const client = await clientPromise;
      const db = client.db();
      const usersCollection = db.collection("users");

      if (account?.provider === "google" || account?.provider === "github") {
        const existingUser = await usersCollection.findOne({ email: user.email as string });

        if (!existingUser) {
          await usersCollection.insertOne({
            name: user.name,
            email: user.email,
            image: user.image,
            role: "Viewer", // Default role for OAuth sign-ups
            provider: account.provider,
            lastLogin: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
           await usersCollection.updateOne({ email: user.email as string }, { $set: { lastLogin: new Date() } });
        }
      }
      return true;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
