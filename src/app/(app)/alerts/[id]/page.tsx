import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockAlerts } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { AlertTriangle, Server, HardDrive, User, Clock } from 'lucide-react';
import Link from 'next/link';
import { TroubleshootingSteps } from '@/components/troubleshooting-steps';

function getSeverityBadgeVariant(severity: 'critical' | 'warning' | 'info'): 'destructive' | 'secondary' | 'default' {
    switch (severity) {
        case 'critical':
            return 'destructive';
        case 'warning':
            return 'secondary';
        case 'info':
        default:
            return 'default';
    }
}

export default function AlertDetailPage({ params }: { params: { id: string } }) {
  const alert = mockAlerts.find((a) => a.id === params.id);

  if (!alert) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={alert.name}
        description="Details for the triggered alert."
      >
        <Button variant="outline">Acknowledge</Button>
        <Button>Resolve</Button>
      </PageHeader>
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Alert Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 mt-1 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Severity</p>
                                <Badge variant={getSeverityBadgeVariant(alert.severity)} className="text-md capitalize">{alert.severity}</Badge>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 mt-1 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Timestamp</p>
                                <p className="font-semibold">{new Date(alert.timestamp).toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Server className="h-5 w-5 mt-1 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Cluster</p>
                                <Link href={`/clusters/${alert.clusterId}`} className="font-semibold hover:underline">{alert.clusterName}</Link>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <HardDrive className="h-5 w-5 mt-1 text-muted-foreground"/>
                            <div>
                                <p className="text-sm text-muted-foreground">Service</p>
                                <p className="font-semibold">{alert.serviceName}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6">
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-muted-foreground">{alert.description}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Related Logs</CardTitle>
                    <CardDescription>Relevant log entries around the time of the alert.</CardDescription>
                </CardHeader>
                <CardContent>
                    <pre className="bg-muted p-4 rounded-lg text-sm text-muted-foreground overflow-x-auto">
                        <code>{alert.relatedLogs}</code>
                    </pre>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
          <TroubleshootingSteps alert={alert} />
        </div>
      </div>
    </div>
  );
}
