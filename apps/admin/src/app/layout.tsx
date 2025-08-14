
'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { AdminSidebarNav } from '@/components/layout/admin-sidebar-nav';
import { Breadcrumbs } from '@amberops/ui/components/breadcrumbs';
import { SidebarProvider } from '@amberops/ui/components/ui/sidebar';
import { Preloader } from '@amberops/ui/components/preloader';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@amberops/ui';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@amberops/lib';
import "@amberops/design-tokens/globals.css";


const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const queryClient = new QueryClient();

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // This is a simple simulation. In a real app, you'd check a session.
      // For this prototype, we'll assume if they get here, they are the admin.
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }, []);


  return (
    <html lang="en" suppressHydrationWarning>
        <body className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
            <QueryClientProvider client={queryClient}>
                {isLoading ? <Preloader /> : (
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
                )}
                 <Toaster position="bottom-right" />
            </QueryClientProvider>
            </ThemeProvider>
        </body>
    </html>
  );
}
