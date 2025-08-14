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
} from '../components/ui/sidebar';
import { AmberOpsLogo } from '../components/icons';
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
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

const MockAppLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="flex-1 p-6">{children}</div>
);

const SidebarContentComponent = () => (
  <>
    <SidebarHeader>
      <div className="flex items-center gap-2">
        <AmberOpsLogo className="w-8 h-8"/>
        <span className="text-xl font-headline font-semibold group-data-[state=collapsed]:hidden">AmberOps</span>
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
    <div className="flex min-h-[600px] bg-background">
      <Sidebar>
        <SidebarContentComponent />
      </Sidebar>
      <MockAppLayout>
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p>This is the main content area. The sidebar can be toggled.</p>
      </MockAppLayout>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => (
     <div className="flex min-h-[600px] bg-background">
      <SidebarProvider defaultOpen={false}>
        <Sidebar>
          <SidebarContentComponent />
        </Sidebar>
        <MockAppLayout>
            <h1 className="text-2xl font-bold">Main Content</h1>
            <p>The sidebar is collapsed by default.</p>
        </MockAppLayout>
      </SidebarProvider>
    </div>
  ),
};
