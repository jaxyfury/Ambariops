
'use client';
import { AppLayout } from '@/components/layout/app-layout';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Preloader } from '@/components/preloader';

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <Preloader />;
    }

    if (status === 'unauthenticated') {
        redirect('http://localhost:3001/auth');
    }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <SidebarNav />
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
