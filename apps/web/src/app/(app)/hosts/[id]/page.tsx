
'use client';

import { notFound, useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from '@amberops/ui';
import { mockHosts, mockServices } from '@amberops/api';
import { Cpu, MemoryStick, HardDrive, Server, Power, CheckCircle2, XCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

function getServiceStatusIcon(status: 'started' | 'stopped' | 'maintenance') {
  switch (status) {
    case 'started':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'stopped':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'maintenance':
      return <Clock className="h-4 w-4 text-yellow-500" />;
  }
}

export default function HostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const host = mockHosts.find((h) => h.id === params.id);

  if (!host) {
    notFound();
  }

  const runningServices = mockServices.filter(s => s.clusterId === host.clusterId);

  const handleReboot = () => {
    toast.loading(`Rebooting host ${host.name}...`, {
      duration: 2000,
    });
    // In a real app, you would initiate a task and navigate to the tasks page.
    setTimeout(() => {
        toast.success(`Host ${host.name} reboot initiated.`);
        router.push('/tasks');
    }, 2000);
  };

  return (
    <div>
      <PageHeader
        title={host.name}
        description={`Host details for ${host.ip}`}
        actions={(
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast("Actions clicked!")}>Actions</Button>
                <Button onClick={handleReboot}>
                <Power className="mr-2 h-4 w-4" />
                Reboot Host
                </Button>
            </div>
        )}
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Badge variant={host.status === 'healthy' ? 'default' : 'destructive'} className="text-lg capitalize">{host.status}</Badge>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{host.cpuCores} Cores</div>
                <p className="text-xs text-muted-foreground">{host.os}</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory</CardTitle>
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{host.memoryUsedGb}GB / {host.memoryTotalGb}GB</div>
                <p className="text-xs text-muted-foreground">Usage</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{host.storageUsedGb}GB / {host.storageTotalGb}GB</div>
                <p className="text-xs text-muted-foreground">Usage</p>
            </CardContent>
        </Card>
      </div>

       <Card>
          <CardHeader>
            <CardTitle>Running Services</CardTitle>
            <CardDescription>Services and components running on this host.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Version</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {runningServices.map(service => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getServiceStatusIcon(service.status)}
                        <span className="capitalize">{service.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{service.version}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
