
'use client';
import { AppLayout } from '@/components/layout/app-layout';
import { AdminSidebarNav } from '@/components/layout/admin-sidebar-nav';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Preloader } from '@/components/preloader';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';

    if (status === 'loading') {
        return <Preloader />;
    }

    if (status === 'unauthenticated' || (session?.user as any)?.role !== 'Admin') {
        redirect(`${homeUrl}/auth`);
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
