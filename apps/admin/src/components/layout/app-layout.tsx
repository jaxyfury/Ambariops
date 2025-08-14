
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
import { SidebarTrigger } from '@amberops/ui/components/ui/sidebar';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@amberops/ui/components/ui/tooltip';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

type User = {
  name: string;
  email: string;
  role: string;
  image: string;
};

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';

  useEffect(() => {
    const storedUser = localStorage.getItem('amberops_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('amberops_jwt');
    localStorage.removeItem('amberops_user');
    toast.success('Successfully logged out!');
    window.location.href = `${homeUrl}/auth`;
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-lg sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarTrigger
              className="sm:hidden"
              aria-label="Toggle Menu"
              data-testid="sidebar-toggle-mobile"
            />
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
                aria-label="Open user menu"
                data-testid="user-menu-button"
              >
                <Avatar>
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0) ?? 'A'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-6 overflow-y-auto relative">{children}</main>
    </div>
  );
}
