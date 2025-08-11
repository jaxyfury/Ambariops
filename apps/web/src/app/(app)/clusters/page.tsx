import Link from 'next/link';
import { PageHeader } from '../../../components/page-header';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { mockClusters } from '../../../lib/mock-data';
import { ArrowUpRight, PlusCircle } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';
import { Progress } from '../../../components/ui/progress';

function getStatusBadgeVariant(status: 'healthy' | 'unhealthy' | 'degraded'): 'default' | 'destructive' | 'secondary' {
  switch (status) {
    case 'healthy':
      return 'default';
    case 'degraded':
      return 'secondary';
    case 'unhealthy':
      return 'destructive';
  }
}

export default function ClustersPage() {
  return (
    <div>
      <PageHeader
        title="Clusters"
        description="Manage your clusters and view their health status."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Cluster
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Hosts</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Active Alerts</TableHead>
                <TableHead>CPU Usage</TableHead>
                <TableHead>Memory Usage</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClusters.map((cluster) => (
                <TableRow key={cluster.id}>
                  <TableCell className="font-medium">{cluster.name}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(cluster.status)} className="capitalize">
                      {cluster.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{cluster.hostCount}</TableCell>
                  <TableCell>{cluster.serviceCount}</TableCell>
                  <TableCell>{cluster.alertCount}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={cluster.cpuUsage} className="h-2 w-24" />
                      <span>{cluster.cpuUsage}%</span>
                    </div>
                  </TableCell>
                   <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={cluster.memoryUsage} className="h-2 w-24" />
                      <span>{cluster.memoryUsage}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/clusters/${cluster.id}`}>
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
