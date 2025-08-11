
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@amberops/ui';
import { mockServices } from '@amberops/api';
import { ArrowUpRight, CheckCircle2, XCircle, Clock, HardDrive, MoreHorizontal, Play, Square, RefreshCw } from 'lucide-react';

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

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        title="Services"
        description="A list of all services running across your clusters."
      />
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cluster</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Running Hosts</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                    {service.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getServiceStatusIcon(service.status)}
                      <span className="capitalize">{service.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Link href={`/clusters/${service.clusterId}`} className="hover:underline">
                      {service.clusterName}
                    </Link>
                  </TableCell>
                  <TableCell>{service.version}</TableCell>
                  <TableCell>{service.runningHosts} / {service.totalHosts}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/services/${service.id}`}>
                            View <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Play className="mr-2 h-4 w-4" />
                                Start
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Square className="mr-2 h-4 w-4" />
                                Stop
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Restart
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
