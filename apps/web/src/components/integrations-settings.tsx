
'use client';

import { useState } from 'react';
import {
  Button,
} from '@amberops/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Switch } from '@amberops/ui/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@amberops/ui/components/ui/dialog';
import { PlusCircle, Slack, GitMerge, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const integrationsList = [
  {
    name: 'Slack',
    description: 'Receive notifications in your Slack channels.',
    icon: Slack,
    connected: true,
  },
  {
    name: 'PagerDuty',
    description: 'Send critical alerts directly to PagerDuty.',
    icon: Bell,
    connected: false,
  },
  {
    name: 'GitHub',
    description: 'Link commits and PRs to tasks.',
    icon: GitMerge,
    connected: false,
  },
];

export function IntegrationsSettings() {
  const [integrations, setIntegrations] = useState(integrationsList);

  const toggleIntegration = (name: string) => {
    setIntegrations(
      integrations.map((int) =>
        int.name === name ? { ...int, connected: !int.connected } : int
      )
    );
    toast.success(`Integration with ${name} updated.`);
  };
  
   const handleAddIntegration = () => {
    toast.success('New integration added (simulation).');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>
            Connect AmberOps with your favorite third-party services.
          </CardDescription>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Integration
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Integration</DialogTitle>
                    <DialogDescription>
                        Select a new service to connect with AmberOps. This is a placeholder and no real connection will be made.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p>Integration options would be listed here.</p>
                </div>
                <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button onClick={handleAddIntegration}>Add</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

      </CardHeader>
      <CardContent className="divide-y divide-border">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-4">
              <integration.icon className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{integration.name}</p>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </div>
            </div>
            <Switch
              checked={integration.connected}
              onCheckedChange={() => toggleIntegration(integration.name)}
              aria-label={`Toggle ${integration.name} integration`}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
