
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
import { Alert, AlertDescription, AlertTitle } from '@amberops/ui/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@amberops/ui/components/ui/button';

export default function SettingsPage() {
  const isAdmin = true; // This would be determined by the user's session role

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage application settings and user access."
      />
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <GeneralSettings />
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
