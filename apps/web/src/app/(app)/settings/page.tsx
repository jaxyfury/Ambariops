
'use client';

import { PageHeader } from '@/components/page-header';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@amberops/ui';
import { UserManagement } from '@/components/user-management';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage application settings and user access."
      />
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                General application settings will be here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This section is under development. Please check back later for general settings options.</p>
            </CardContent>
            <CardFooter>
                 <Button disabled>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect with third-party services.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This section is under development. Please check back later to manage integrations.</p>
            </CardContent>
             <CardFooter>
                <Button disabled>Add Integration</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys and access tokens for programmatic access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This section is under development. Please check back later to generate and manage API keys.</p>
            </CardContent>
             <CardFooter>
                <Button disabled>Generate New Key</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
