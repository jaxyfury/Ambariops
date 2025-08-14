
'use client';

import '@amberops/design-tokens/globals.css';
import { cn } from '@amberops/lib';
import { ThemeProvider } from '@amberops/ui';
import { Preloader } from '@amberops/ui/components/preloader';
import { Breadcrumbs } from '@amberops/ui/components/breadcrumbs';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter, Space_Grotesk } from 'next/font/google';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AdminSidebarNav } from '../components/layout/admin-sidebar-nav';
import { AppLayout } from '../components/layout/app-layout';
import type { User } from '@amberops/lib';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const queryClient = new QueryClient();

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('amberops_user');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        if (user.role === 'Admin') {
          setIsAuthorized(true);
        } else {
          // If the user is not an admin, redirect them to the main web app.
          const webUrl = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';
          window.location.href = webUrl;
        }
      } catch (error) {
         // If there's an error (e.g., malformed JSON), redirect to login
        const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
        window.location.href = `${homeUrl}/auth`;
      }
    } else {
      // If there's no user, redirect to the login page.
      const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
      window.location.href = `${homeUrl}/auth`;
    }
    setIsLoading(false);
  }, []);

  if (isLoading || !isAuthorized) {
    return <Preloader />;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <AdminSidebarNav />
                <div className="flex flex-1 flex-col">
                  <AppLayout>
                    <Breadcrumbs />
                    {children}
                  </AppLayout>
                </div>
              </div>
            </SidebarProvider>
            <Toaster position="bottom-right" />
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
