
'use client';

import Link from 'next/link';
import { Button } from '@amberops/ui/components/ui/button';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { AnimatedThemeToggle } from '@/components/animated-theme-toggle';
import { ArrowRight } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center border-b bg-background/80 backdrop-blur-lg">
            <Link href="/" className="flex items-center justify-center gap-2" prefetch={false}>
                <AmberOpsLogo className="h-8 w-8" />
                <span className="text-xl font-semibold font-headline">AmberOps</span>
            </Link>
            <nav className="ml-auto items-center hidden md:flex gap-4 sm:gap-6">
                <Link
                    href="/#features"
                    className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
                    prefetch={false}
                >
                    Features
                </Link>
                <Link
                    href="/#pricing"
                    className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
                    prefetch={false}
                >
                    Pricing
                </Link>
                <Link
                    href="/documentation"
                    className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
                    prefetch={false}
                >
                    Docs
                </Link>
                <Link
                    href="/#faq"
                    className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
                    prefetch={false}
                >
                    FAQ
                </Link>
                <Link
                    href="/#contact"
                    className="text-sm font-medium hover:text-primary transition-colors underline-offset-4"
                    prefetch={false}
                >
                    Contact
                </Link>
                <AnimatedThemeToggle />
                <Button asChild variant="ghost">
                    <Link href="/auth">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/auth?action=signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </nav>
            <Button asChild variant="outline" className="ml-auto md:hidden">
                <Link href="/auth">Login</Link>
            </Button>
        </header>
    )
}
