
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const FooterAnimation = dynamic(() => import('@/components/footer-animation').then(mod => mod.FooterAnimation));

export function Footer() {
  return (
    <footer className="relative flex flex-col gap-2 sm:flex-row py-12 w-full shrink-0 items-center px-4 md:px-6 border-t overflow-hidden min-h-[350px]">
        <div className="flex-grow z-10">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} AmberOps Inc. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6 mt-2">
            <Link href="/legal/terms-of-service" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="/legal/privacy-policy" className="text-xs hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </Link>
          </nav>
        </div>
        <div className="absolute right-0 bottom-0 z-0">
            <FooterAnimation />
        </div>
      </footer>
  )
}
