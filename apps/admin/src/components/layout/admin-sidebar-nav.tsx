'use client';

import { AmberOpsLogo } from '@amberops/ui/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@amberops/ui/components/ui/sidebar';
import { useSidebar } from '@amberops/ui/hooks/use-sidebar';
import {
  FileText,
  LayoutDashboard,
  ListOrdered,
  LogOut,
  MessageSquare,
  Shield,
  Tag,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminSidebarNav() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();
  const webUrl = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/users', label: 'Users', icon: Users },
    { href: '/documentation', label: 'Documentation', icon: FileText },
    { href: '/legal', label: 'Legal Pages', icon: Shield },
    { href: '/pricing', label: 'Pricing', icon: Tag },
    { href: '/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/faqs', label: 'FAQs', icon: ListOrdered },
  ];

  const bottomNavItems = [{ href: webUrl, label: 'Exit Admin', icon: LogOut }];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <AmberOpsLogo className="h-8 w-8" />
          {sidebarState === 'expanded' && (
            <h1 className="font-headline text-xl font-semibold">
              AmberOps Admin
            </h1>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex-1 p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                isActive={isActive(item.href)}
                asChild
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="p-2">
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild tooltip={item.label}>
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
