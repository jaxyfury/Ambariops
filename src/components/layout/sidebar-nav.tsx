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
  Laptop,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { AmberOpsLogo } from '@/components/icons';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/clusters', label: 'Clusters', icon: Server },
  { href: '/services', label: 'Services', icon: HardDrive },
  { href: '/hosts', label: 'Hosts', icon: Laptop },
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
  const isAlertsActive = isActive('/alerts');

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
                 <Accordion type="single" collapsible defaultValue={isAlertsActive ? "alerts" : undefined}>
                    <AccordionItem value="alerts" className="border-b-0">
                      <AccordionTrigger
                        asChild
                        className={cn(
                          "w-full justify-start h-auto py-2 px-3 text-sm hover:bg-sidebar-accent rounded-md",
                          isAlertsActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                      >
                        <div className='flex items-center gap-2'>
                         <item.icon className="w-4 h-4" />
                         <span>{item.label}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-0 pl-7 pt-1">
                        <ul className="space-y-1">
                          {item.subItems.map(subItem => (
                            <li key={subItem.href}>
                               <SidebarMenuButton size="sm" isActive={pathname === subItem.href} asChild>
                                <Link href={subItem.href}>
                                  <span>{subItem.label}</span>
                                </Link>
                              </SidebarMenuButton>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                 </Accordion>
              ) : (
                <SidebarMenuButton isActive={isActive(item.href)} asChild>
                  <Link href={item.href}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarMenu className="p-2 mt-auto">
          {bottomNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton isActive={isActive(item.href)} asChild>
                <Link href={item.href}>
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </div>
    </Sidebar>
  );
}
