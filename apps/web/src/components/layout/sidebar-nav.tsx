
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
  History,
  PanelLeft,
  BookOpen,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@amberops/ui/components/ui/accordion';
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from '@amberops/ui/components/ui/sidebar';
import { useSidebar } from '@amberops/ui/hooks/use-sidebar';
import { AmberOpsLogo } from '@amberops/ui/components/icons';
import { cn } from '@amberops/lib';

export function SidebarNav() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, tooltip: 'Dashboard' },
    { href: '/clusters', label: 'Clusters', icon: Server, tooltip: 'Clusters' },
    { href: '/services', label: 'Services', icon: HardDrive, tooltip: 'Services' },
    { href: '/hosts', label: 'Hosts', icon: Laptop, tooltip: 'Hosts' },
    {
      label: 'Alerts',
      icon: Siren,
      tooltip: 'Alerts',
      subItems: [
        { href: '/alerts', label: 'Current Alerts', tooltip: 'Current Alerts' },
        { href: '/alerts/definitions', label: 'Definitions', tooltip: 'Alert Definitions' },
      ],
    },
    { href: '/config', label: 'Configuration', icon: FileText, tooltip: 'Configuration' },
    { href: '/tasks', label: 'Tasks / Ops', icon: ListChecks, tooltip: 'Tasks & Ops' },
    { href: '/activity', label: 'Activity', icon: History, tooltip: 'Activity Log' },
    { href: '/logs', label: 'Logs', icon: ScrollText, tooltip: 'Logs' },
  ];

  const bottomNavItems = [
     {
      label: 'Documentation',
      icon: BookOpen,
      tooltip: 'Documentation',
      subItems: [
        { href: '/documentation/dashboard', label: 'Dashboard Guide', tooltip: 'Dashboard Guide' },
      ],
    },
    { href: '/settings', label: 'Settings', icon: Settings, tooltip: 'Settings' },
    { href: '/help', label: 'Help', icon: AlertCircle, tooltip: 'Help' },
  ];


  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isAlertsActive = isActive('/alerts');
  const isDocsActive = isActive('/documentation');

  const renderNavMenu = (items: any[]) => {
    return items.map((item) => (
      <SidebarMenuItem key={item.label}>
        {item.subItems ? (
          <Accordion 
            type="single" 
            collapsible 
            defaultValue={
              (item.label === 'Alerts' && isAlertsActive) ? "accordion-item" : 
              (item.label === 'Documentation' && isDocsActive) ? "accordion-item" : undefined
            }
            disabled={sidebarState === 'collapsed'}
          >
              <AccordionItem value="accordion-item" className="border-b-0">
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href || item.subItems[0].href)}
                  tooltip={item.tooltip}
                  className="p-0"
                >
                  <AccordionTrigger className={cn(
                    "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!p-2 [&>span]:group-data-[collapsible=icon]:hidden [&>svg]:size-4 [&>svg]:shrink-0",
                    "hover:no-underline"
                  )}>
                      <div className="flex items-center gap-2">
                          <item.icon />
                          <span className="group-data-[state=collapsed]:hidden">{item.label}</span>
                      </div>
                  </AccordionTrigger>
                </SidebarMenuButton>
                <AccordionContent className="p-0 pl-7 pt-1 group-data-[state=collapsed]:hidden">
                  <ul className="space-y-1">
                    {item.subItems.map((subItem: any) => (
                      <li key={subItem.href}>
                         <SidebarMenuButton size="sm" isActive={pathname === subItem.href} asChild tooltip={subItem.tooltip}>
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
          <SidebarMenuButton isActive={isActive(item.href)} asChild tooltip={item.tooltip}>
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        )}
      </SidebarMenuItem>
    ))
  }


  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <AmberOpsLogo className="w-8 h-8"/>
            {sidebarState === 'expanded' && <h1 className="text-xl font-headline font-semibold">AmberOps</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="flex-1 p-2">
          {renderNavMenu(navItems)}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="p-2">
          {renderNavMenu(bottomNavItems)}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
