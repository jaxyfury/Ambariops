import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockHosts } from '@/lib/mock-data';
import { ArrowUpRight, PlusCircle, Server } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

function getStatusBadgeVariant(status: 'healthy' | 'unhealthy' | 'restarting' | 'maintenance'): 'default' | 'destructive' | 'secondary' {
  switch (status) {
    case 'healthy':
      return 'default';
    case 'unhealthy':
      return 'destructive';
    case 'restarting':
    case 'maintenance':
      return 'secondary';
  }
}

export default function HostsPage() {
  return (
    <div>
      <PageHeader
        title="Hosts"
        description="A list of all hosts across your clusters."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Host
        </Button>
      </PageHeader>
       <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Cluster</TableHead>
                <TableHead>OS</TableHead>
                <TableHead>Last Heartbeat</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHosts.map((host) => (
                <TableRow key={host.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    {host.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(host.status)} className="capitalize">
                      {host.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{host.ip}</TableCell>
                   <TableCell>
                    <Link href={`/clusters/${host.clusterId}`} className="hover:underline">
                      {host.clusterName}
                    </Link>
                  </TableCell>
                  <TableCell>{host.os}</TableCell>
                  <TableCell>{host.lastHeartbeat}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/hosts/${host.id}`}>
                        View Details <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
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
