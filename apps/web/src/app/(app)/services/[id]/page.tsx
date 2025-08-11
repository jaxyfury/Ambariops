
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui';
import { mockServices } from '@amberops/api';
import { Play, Square, RefreshCw } from 'lucide-react';

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = mockServices.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={service.name}
        description={`Service details for ${service.name} on cluster ${service.clusterName}`}
      >
        <Button variant="outline"><Play className="mr-2 h-4 w-4" />Start</Button>
        <Button variant="outline"><Square className="mr-2 h-4 w-4" />Stop</Button>
        <Button><RefreshCw className="mr-2 h-4 w-4" />Restart Service</Button>
      </PageHeader>
      <Card>
          <CardHeader>
              <CardTitle>Service Status</CardTitle>
              <CardDescription>Current state and health of the {service.name} service.</CardDescription>
          </CardHeader>
        <CardContent>
             <div className="text-center py-20 bg-muted rounded-lg">
                <h2 className="font-headline text-2xl">Service Detail Page</h2>
                <p className="text-muted-foreground">More details about the {service.name} service will be displayed here.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
