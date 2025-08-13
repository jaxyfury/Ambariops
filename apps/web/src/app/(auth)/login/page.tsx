
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// This page is a placeholder to demonstrate the redirect flow.
// In a real app with NextAuth.js session management, this might
// check for a session and redirect if the user is already authenticated.
export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the actual login page hosted on the 'home' app.
    // In a production environment, this would be your main domain.
    router.replace('http://localhost:3001/login');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <p>Redirecting to login...</p>
    </div>
  );
}
