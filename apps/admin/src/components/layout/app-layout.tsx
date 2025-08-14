
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
import Link from 'next/link';
import toast from 'react-hot-toast';

export function AppLayout({ children }: { children: React.ReactNode }) {
    const user = { name: 'Admin User', email: 'admin@amberops.com', role: 'Admin', image: `https://avatar.vercel.sh/admin` };
    const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';

    const handleSignOut = async () => {
        window.location.href = `${homeUrl}/auth`;
        toast.success('Successfully logged out!');
    }

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-lg sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger className="sm:hidden" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Menu</p>
          </TooltipContent>
        </Tooltip>
        
        <div className="flex-1 flex items-center justify-center gap-4" />
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Avatar>
                  <AvatarImage
                    src={user.image}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name?.charAt(0) ?? 'A'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleSignOut()}
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
