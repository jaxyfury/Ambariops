import type { Meta, StoryObj } from '@storybook/react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '../components/ui/sidebar';
import { AmberOpsLogo } from '../components/icons';
import { Button } from '../components/ui/button';
import { LayoutDashboard, Server, Settings } from 'lucide-react';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

const SidebarContentComponent = () => (
  <>
    <SidebarHeader>
      <div className="flex items-center gap-2">
        <AmberOpsLogo className="w-8 h-8"/>
        <span className="text-xl font-headline font-semibold group-data-[collapsible=icon]:hidden">AmberOps</span>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Dashboard" isActive>
            <LayoutDashboard />
            <span>Dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Clusters">
            <Server />
            <span>Clusters</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Settings">
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </>
);

export const Default: Story = {
  render: () => (
    <div className="flex min-h-[600px]">
      <Sidebar>
        <SidebarContentComponent />
      </Sidebar>
      <SidebarInset>
        <header className="p-4 border-b">
          <SidebarTrigger />
        </header>
        <main className="p-4">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p>This is the main content area. The sidebar can be toggled.</p>
        </main>
      </SidebarInset>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
     <div className="flex min-h-[600px]">
      <SidebarProvider defaultOpen={false}>
        <Sidebar>
          <SidebarContentComponent />
        </Sidebar>
        <SidebarInset>
           <header className="p-4 border-b">
            <SidebarTrigger />
           </header>
           <main className="p-4">
            <h1 className="text-2xl font-bold">Main Content</h1>
            <p>The sidebar is collapsed by default.</p>
           </main>
        </SidebarInset>
      </SidebarProvider>
  ),
};
