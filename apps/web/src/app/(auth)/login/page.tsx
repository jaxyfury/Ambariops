
'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

// This page is a placeholder to demonstrate the redirect flow.
export default function LoginPage() {
  useEffect(() => {
    // Redirect to the actual login page hosted on the 'home' app.
    const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
    window.location.href = `${homeUrl}/auth`;
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <p>Redirecting to login...</p>
    </div>
  );
}
