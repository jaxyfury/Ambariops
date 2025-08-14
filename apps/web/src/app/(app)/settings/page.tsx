
'use client';

import { PageHeader } from '@amberops/ui/components/page-header';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@amberops/ui/components/ui/tabs';
import { GeneralSettings } from '@/components/general-settings';
import { IntegrationsSettings } from '@/components/integrations-settings';
import { ApiAccessSettings } from '@/components/api-access-settings';
import { UserManagement } from '@/components/user-management';
import { useSession } from 'next-auth/react';
import { Alert, AlertDescription, AlertTitle } from '@amberops/ui/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@amberops/ui/components/ui/button';

export default function SettingsPage() {
    const { data: session } = useSession();
    const isAdmin = (session?.user as any)?.role === 'Admin';

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage application settings and user access."
      />
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users" disabled={!isAdmin}>User Management</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings />
        </TabsContent>
        <TabsContent value="users">
            {isAdmin ? <UserManagement /> : (
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Access Denied</AlertTitle>
                    <AlertDescription>
                       You do not have permission to access this section. Please contact an administrator.
                       <br />
                        <Button asChild variant="link" className="p-0 h-auto mt-2">
                           <Link href="/admin/dashboard">Go to Admin Dashboard</Link>
                       </Button>
                    </AlertDescription>
                </Alert>
            )}
        </TabsContent>
        <TabsContent value="integrations" className="space-y-6">
          <IntegrationsSettings />
        </TabsContent>
        <TabsContent value="api">
          <ApiAccessSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
