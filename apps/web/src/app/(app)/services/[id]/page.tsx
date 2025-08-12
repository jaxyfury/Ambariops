
'use client';

import { notFound, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Badge } from '@amberops/ui';
import { mockServices, mockHosts } from '@amberops/api';
import { Play, Square, RefreshCw, CheckCircle2, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

function getServiceStatusIcon(status: 'started' | 'stopped' | 'maintenance') {
  switch (status) {
    case 'started':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    case 'stopped':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'maintenance':
      return <Clock className="h-5 w-5 text-yellow-500" />;
  }
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const service = mockServices.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }
  
  const serviceHosts = mockHosts.filter(h => h.clusterId === service.clusterId).slice(0, 5);

  const handleAction = (action: 'start' | 'stop' | 'restart') => {
      toast.loading(`Request to ${action} ${service.name} sent...`, {
          duration: 2000,
      });
      setTimeout(() => {
          toast.success(`Task to ${action} ${service.name} created.`);
          router.push('/tasks');
      }, 2000);
  };

  const handleRunServiceCheck = () => {
    toast.loading(`Running service check for ${service.name}...`, {
      duration: 2000,
    });
    setTimeout(() => {
      toast.success(`Service check for ${service.name} initiated.`);
      router.push('/tasks');
    }, 2000);
  }

  return (
    <div>
      <PageHeader
        title={service.name}
        description={`Service details for ${service.name} on cluster ${service.clusterName}`}
        actions={(
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleAction('start')}><Play className="mr-2 h-4 w-4" />Start</Button>
                <Button variant="outline" onClick={() => handleAction('stop')}><Square className="mr-2 h-4 w-4" />Stop</Button>
                <Button onClick={() => handleAction('restart')}><RefreshCw className="mr-2 h-4 w-4" />Restart Service</Button>
            </div>
        )}
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Service Status</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    {getServiceStatusIcon(service.status)}
                    <div>
                        <p className="text-2xl font-bold capitalize">{service.status}</p>
                        <p className="text-sm text-muted-foreground">Version: {service.version}</p>
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col space-y-2">
                   <Button asChild variant="link" className="justify-start p-0 h-auto"><Link href="/config">View Configurations</Link></Button>
                   <Button variant="link" className="justify-start p-0 h-auto" onClick={handleRunServiceCheck}>Run Service Check</Button>
                   <Button variant="link" className="justify-start p-0 h-auto" onClick={() => toast('Metrics view coming soon!')}>View Metrics</Button>
                </CardContent>
            </Card>
        </div>
         <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Service Hosts</CardTitle>
                    <CardDescription>{service.runningHosts} of {service.totalHosts} hosts are running this service.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Host</TableHead>
                            <TableHead>IP</TableHead>
                            <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {serviceHosts.map(host => (
                            <TableRow key={host.id}>
                                <TableCell className="font-medium">
                                     <Link href={`/hosts/${host.id}`} className="hover:underline">
                                        {host.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{host.ip}</TableCell>
                                <TableCell><Badge variant={host.status === 'healthy' ? 'default' : 'destructive'} className="capitalize">{host.status}</Badge></TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
