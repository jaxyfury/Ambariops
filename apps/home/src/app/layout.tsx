
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from 'next/font/google';
import "@amberops/design-tokens/globals.css";
import "@/styles/animated-theme.css";
import "@/styles/auth-form.css";
import "@/styles/animated-globe.css";
import "@/styles/footer-animation.css";
import "@/styles/not-found.css";
import "@/styles/pricing-card.css";
import { cn } from "@amberops/lib";
import { ThemeProvider } from "@amberops/ui/components/theme-provider";
import { Toaster } from "react-hot-toast";

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: "AmberOps - The Future of Cluster Management",
  description: "A modern, fast, and intuitive frontend for Apache Ambari, supercharged with AI-powered insights.",
  openGraph: {
    title: "AmberOps - The Future of Cluster Management",
    description: "A modern, fast, and intuitive frontend for Apache Ambari, supercharged with AI-powered insights.",
    url: "https://amberops.app",
    siteName: "AmberOps",
    images: [
      {
        url: "https://amberops.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
         className={cn(
          'min-h-screen bg-background font-body antialiased text-foreground',
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
            <Toaster position="bottom-right" />
        </ThemeProvider>
        </body>
    </html>
  );
}
