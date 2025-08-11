import { SidebarProvider, SidebarInset, SidebarTrigger } from "@amberops/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@amberops/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@amberops/ui/dropdown-menu";
import { Button } from "@amberops/ui/button";
import { ThemeToggle } from "../theme-toggle";
import { LanguageSwitcher } from "../language-switcher";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-lg sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
          <SidebarTrigger className="sm:hidden" />
          <div className="ml-auto flex items-center gap-2">
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
                    <AvatarImage src="https://avatar.vercel.sh/admin" alt="@admin" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
