"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Server,
  HardDrive,
  Siren,
  FileText,
  ListChecks,
  ScrollText,
  Settings,
  AlertCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { AmberOpsLogo } from '@/components/icons';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clusters', label: 'Clusters', icon: Server },
  { href: '/services', label: 'Services', icon: HardDrive },
  { href: '/hosts', label: 'Hosts', icon: HardDrive },
  {
    label: 'Alerts',
    icon: Siren,
    subItems: [
      { href: '/alerts', label: 'Current Alerts' },
      { href: '/alerts/definitions', label: 'Definitions' },
    ],
  },
  { href: '/config', label: 'Configuration', icon: FileText },
  { href: '/tasks', label: 'Tasks / Ops', icon: ListChecks },
  { href: '/logs', label: 'Logs', icon: ScrollText },
];

const bottomNavItems = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/help', label: 'Help', icon: AlertCircle },
];

export function SidebarNav() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Sidebar>
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2">
            <AmberOpsLogo className="w-8 h-8"/>
            <h1 className="text-xl font-headline font-semibold">AmberOps</h1>
        </div>
        <SidebarMenu className="flex-1 p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              {item.subItems ? (
                 <SidebarGroup>
                    <SidebarMenuButton
                      asChild
                      isActive={item.subItems.some(sub => isActive(sub.href))}
                    >
                        <span>
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </span>
                    </SidebarMenuButton>
                 </SidebarGroup>
              ) : (
                <Link href={item.href}>
                  <SidebarMenuButton isActive={isActive(item.href)}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu className="p-2 mt-auto">
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton isActive={isActive(item.href)}>
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </Sidebar>
  );
}
