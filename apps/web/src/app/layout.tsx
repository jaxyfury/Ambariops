
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '@amberops/design-tokens/globals.css';
import { cn } from '@amberops/ui/lib/utils';
import { ThemeProvider } from '@amberops/ui/components/theme-provider';
import { Toaster } from '@amberops/ui/components/ui/toaster';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'AmberOps Console',
  description: 'A modern management console for your operations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
