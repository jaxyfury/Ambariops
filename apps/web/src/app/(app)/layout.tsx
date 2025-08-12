
'use client';
import { AppLayout } from '@/components/layout/app-layout';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <AppLayout>
        <Breadcrumbs />
        {children}
      </AppLayout>
    </SidebarProvider>
  );
}
