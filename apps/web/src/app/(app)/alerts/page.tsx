import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from '@amberops/ui';
import { mockAlerts } from '@amberops/api';
import { ArrowUpRight, Siren } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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

function getStatusBadgeVariant(status: 'triggered' | 'acknowledged' | 'resolved'): 'destructive' | 'secondary' | 'default' {
    switch (status) {
        case 'triggered':
            return 'destructive';
        case 'acknowledged':
            return 'secondary';
        case 'resolved':
        default:
            return 'default';
    }
}


export default function AlertsPage() {
  return (
    <div>
      <PageHeader
        title="Alerts"
        description="View and manage all alerts across your infrastructure."
      />
       <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert Name</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cluster</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAlerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Siren className="h-4 w-4 text-muted-foreground" />
                    {alert.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityBadgeVariant(alert.severity)} className="capitalize">
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <Badge variant={getStatusBadgeVariant(alert.status)} className="capitalize">
                      {alert.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/clusters/${alert.clusterId}`} className="hover:underline">
                      {alert.clusterName}
                    </Link>
                  </TableCell>
                  <TableCell>{alert.serviceName}</TableCell>
                   <TableCell>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/alerts/${alert.id}`}>
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
