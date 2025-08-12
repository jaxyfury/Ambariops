import { AppLayout } from '@/components/layout/app-layout';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarInset, SidebarProvider } from '@amberops/ui';

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <AppLayout>
          <Breadcrumbs />
          {children}
        </AppLayout>
      </SidebarInset>
    </SidebarProvider>
  );
}
