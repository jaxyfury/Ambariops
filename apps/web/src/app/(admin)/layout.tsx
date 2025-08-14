
'use client';
import { AppLayout } from '@/components/layout/app-layout';
import { AdminSidebarNav } from '@/components/layout/admin-sidebar-nav';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';
import { Preloader } from '@/components/preloader';
import { useState, useEffect } from 'react';


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // NOTE: In a real application with a dedicated auth service (e.g., Keycloak),
    // this layout would be wrapped in a higher-order component or middleware
    // that validates the user's session token and checks for the 'Admin' role.
    // If the check fails, it would redirect to the main login page.
    // We simulate a loading state here for demonstration purposes.
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Preloader />;
    }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebarNav />
        <div className="flex-1 flex flex-col">
          <AppLayout>
            <Breadcrumbs />
            {children}
          </AppLayout>
        </div>
      </div>
    </SidebarProvider>
  );
}
