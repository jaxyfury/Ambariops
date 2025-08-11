'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { suggestTroubleshootingSteps } from '@/ai/flows/suggest-troubleshooting-steps';
import type { Alert } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, ListOrdered } from 'lucide-react';

interface TroubleshootingStepsProps {
  alert: Alert;
}

export function TroubleshootingSteps({ alert }: TroubleshootingStepsProps) {
  const [steps, setSteps] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getSteps() {
      try {
        setLoading(true);
        const result = await suggestTroubleshootingSteps({
          alertDescription: alert.description,
          relatedLogs: alert.relatedLogs,
        });
        setSteps(result.suggestedSteps);
      } catch (error) {
        console.error('Error fetching troubleshooting steps:', error);
        setSteps(['Could not generate troubleshooting steps at this time.']);
      } finally {
        setLoading(false);
      }
    }
    if (alert) {
      getSteps();
    }
  }, [alert]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <CardTitle>AI-Powered Troubleshooting</CardTitle>
        </div>
        <CardDescription>
          Suggested steps to resolve the &quot;{alert.name}&quot; alert.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
