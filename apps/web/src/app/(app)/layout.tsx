
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Breadcrumbs } from '@amberops/ui/components/breadcrumbs';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';
import { Preloader } from '@amberops/ui/components/preloader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // This check runs only on the client-side
    const token = localStorage.getItem('amberops_jwt');
    if (token) {
      setIsAuthenticated(true);
    } else {
      const homeUrl =
        process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
      window.location.href = `${homeUrl}/auth`;
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading || !isAuthenticated) {
    return <Preloader />;
  }

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
