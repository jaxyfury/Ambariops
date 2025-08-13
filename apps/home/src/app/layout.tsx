
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from 'next/font/google';
import "@amberops/design-tokens/globals.css";
import { cn } from "@amberops/lib";
import { ThemeProvider } from "@amberops/ui/components/theme-provider";

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: "AmberOps - Welcome",
  description: "Modern management for your data clusters.",
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
        </ThemeProvider>
        </body>
    </html>
  );
}
