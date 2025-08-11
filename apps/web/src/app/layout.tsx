'use client';

import { Inter, Space_Grotesk } from 'next/font/google';
import '@amberops/design-tokens/globals.css';
import { cn } from '@amberops/ui/lib/utils';
import { ThemeProvider } from '@amberops/ui/components/theme-provider';
import { Toaster } from '@amberops/ui/components/ui/toaster';
import { useEffect } from 'react';
import { enableMocking } from '@amberops/api/mocks';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      enableMocking();
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <I18nextProvider i18n={i18n}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryClientProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
