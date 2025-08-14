'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@amberops/ui/components/ui/tooltip';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@amberops/ui/components/ui/avatar';
import { Button } from '@amberops/ui/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@amberops/ui/components/ui/dropdown-menu';
import { SidebarTrigger } from '@amberops/ui/components/ui/sidebar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 flex h-16 shrink-0 items-center gap-4 border-b bg-background/80 px-4 py-2 backdrop-blur-lg sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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

        <div className="flex flex-1 items-center justify-center gap-4" />

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
      <main className="relative flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
