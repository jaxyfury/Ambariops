import { SidebarProvider, SidebarInset, Avatar, AvatarFallback, AvatarImage, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Button, SidebarTrigger, Tooltip, TooltipTrigger, TooltipContent } from "@amberops/ui";
import { SidebarNav } from "./sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import Link from "next/link";
import toast from "react-hot-toast";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-lg sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 py-2">
           <Tooltip>
                <TooltipTrigger asChild>
                    <SidebarTrigger className="sm:hidden" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>Toggle Menu</p>
                </TooltipContent>
            </Tooltip>
           <div className="flex-1" />
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
                    <AvatarImage src="https://avatar.vercel.sh/admin" alt="@admin" />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/help">Support</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success('Successfully logged out!')}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
