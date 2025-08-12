
'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@amberops/ui/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@amberops/ui/components/ui/dropdown-menu';
import { Button } from '@amberops/ui/components/ui/button';
import {
  SidebarTrigger,
} from '@amberops/ui/components/ui/sidebar';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@amberops/ui/components/ui/tooltip';

import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { QuickAccessNav } from '@/components/quick-access-nav';
import { GlobalSearch } from '@/components/global-search';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-lg sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="sm:hidden" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Menu</p>
          </TooltipContent>
        </Tooltip>
        
        <div className="flex-1 flex items-center justify-center gap-4">
           <GlobalSearch />
           <QuickAccessNav />
        </div>
        
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src="https://avatar.vercel.sh/admin"
                    alt="@admin"
                  />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => toast.success('Successfully logged out!')}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-6 overflow-y-auto relative">
        {children}
      </main>
    </div>
  );
}
