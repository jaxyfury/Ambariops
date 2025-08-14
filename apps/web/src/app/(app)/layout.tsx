
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Breadcrumbs } from '@amberops/ui/components/breadcrumbs';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';
import { Preloader } from '@amberops/ui/components/preloader';
import { useEffect, useState } from 'react';

export default function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // This check must run on the client side to access localStorage.
    const token = localStorage.getItem('amberops_jwt');
    if (token) {
      setIsAuthenticated(true);
    } else {
      const homeUrl =
        process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
      window.location.href = `${homeUrl}/auth`;
    }
    setIsLoading(false);
  }, []);

  // Show a preloader while we're verifying authentication.
  // This prevents the redirect loop.
  if (isLoading) {
    return <Preloader />;
  }

  // If not authenticated after checking, redirect to login.
  // This part will likely not be visible due to the immediate redirect above,
  // but it's a safe fallback.
  if (!isAuthenticated) {
    return <Preloader />;
  }

  // If authenticated, render the main app layout.
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarNav />
        <div className="flex flex-1 flex-col">
          <AppLayout>
            <Breadcrumbs />
            {children}
          </AppLayout>
        </div>
      </div>
    </SidebarProvider>
  );
}
