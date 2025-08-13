
'use client';

import { useState } from 'react';
import {
  Button,
} from '@amberops/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Switch } from '@amberops/ui/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@amberops/ui/components/ui/dialog';
import { PlusCircle, Slack, GitMerge, Bell, Bot, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@amberops/ui/components/ui/alert';

const initialIntegrations = [
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
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const toggleIntegration = (name: string, connect: boolean) => {
    setIntegrations(
      integrations.map((int) =>
        int.name === name ? { ...int, connected: connect } : int
      )
    );
    toast.success(`Integration with ${name} ${connect ? 'enabled' : 'disabled'}.`);
  };
  
   const handleAddIntegration = () => {
    if (!selectedIntegration) {
      toast.error('Please select an integration to add.');
      return;
    }
    toggleIntegration(selectedIntegration, true);
    setIsModalOpen(false);
    setSelectedIntegration(null);
  };

  const handleSaveApiKey = () => {
    toast.success('API Key saved. Make sure to set the environment variable.');
  }

  const availableIntegrations = integrations.filter(int => !int.connected);

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <Bot className="h-6 w-6 text-primary" />
                <CardTitle>Generative AI Provider</CardTitle>
            </div>
            <CardDescription>
              Provide your own Gemini API key to power AI features like health summaries and troubleshooting.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="gemini-api-key">Gemini API Key</Label>
                <div className="flex gap-2">
                    <Input id="gemini-api-key" type="password" placeholder="sk-..." />
                    <Button onClick={handleSaveApiKey}>Save Key</Button>
                </div>
            </div>
             <Alert>
                <KeyRound className="h-4 w-4" />
                <AlertTitle>Security Note</AlertTitle>
                <AlertDescription>
                  For this key to be used, you must set it as an environment variable named <code className="font-mono bg-muted px-1 py-0.5 rounded">GEMINI_API_KEY</code> in the <code className="font-mono bg-muted px-1 py-0.5 rounded">.env</code> file at the root of this project and restart the application. This is the secure way to handle API keys.
                </AlertDescription>
            </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Third-Party Integrations</CardTitle>
            <CardDescription>
              Connect AmberOps with your favorite third-party services.
            </CardDescription>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
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
                          Select a new service to connect with AmberOps.
                      </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-2">
                      {availableIntegrations.length > 0 ? (
                          availableIntegrations.map(int => (
                              <Button
                                  key={int.name}
                                  variant={selectedIntegration === int.name ? 'secondary' : 'outline'}
                                  className="w-full justify-start gap-3 p-6"
                                  onClick={() => setSelectedIntegration(int.name)}
                              >
                                  <int.icon className="h-6 w-6" />
                                  <div className="text-left">
                                      <p className="font-semibold">{int.name}</p>
                                      <p className="font-normal text-muted-foreground">{int.description}</p>
                                  </div>
                              </Button>
                          ))
                      ) : (
                          <p className="text-center text-muted-foreground">All available integrations are already connected.</p>
                      )}
                  </div>
                  <DialogFooter>
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                      <Button onClick={handleAddIntegration} disabled={!selectedIntegration}>Add</Button>
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
                onCheckedChange={(checked) => toggleIntegration(integration.name, checked)}
                aria-label={`Toggle ${integration.name} integration`}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
