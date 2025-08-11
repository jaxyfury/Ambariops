import { PageHeader } from "@/components/page-header";
import { Button } from "@amberops/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@amberops/ui/components/ui/card";
import { Progress } from "@amberops/ui/components/ui/progress";
import { mockClusters, mockAlerts } from "@amberops/api/mocks/mock-data";
import { ArrowUpRight, BarChart, Cpu, HardDrive, MemoryStick, Server, Siren } from "lucide-react";
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@amberops/ui/components/ui/table"
import { Badge } from "@amberops/ui/components/ui/badge";
import { ClusterHealthSummary } from "@/components/cluster-health-summary";

function getStatusColor(status: 'healthy' | 'unhealthy' | 'degraded') {
  switch (status) {
    case 'healthy':
      return 'bg-green-500';
    case 'degraded':
      return 'bg-yellow-500';
    case 'unhealthy':
      return 'bg-red-500';
  }
}

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

export default function DashboardPage() {
    const totalClusters = mockClusters.length;
    const totalAlerts = mockAlerts.filter(a => a.status === 'triggered').length;
    const healthyClusters = mockClusters.filter(c => c.status === 'healthy').length;

    return (
        <div>
            <PageHeader
                title="Dashboard"
                description="Welcome to your AmberOps Console."
            >
                <Button>Create New Cluster</Button>
            </PageHeader>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Clusters</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalClusters}</div>
                        <p className="text-xs text-muted-foreground">{healthyClusters} healthy</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                        <Siren className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAlerts}</div>
                        <p className="text-xs text-muted-foreground text-red-500">Immediate attention needed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. CPU Usage</CardTitle>
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">65%</div>
                        <Progress value={65} className="h-2 mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Memory Usage</CardTitle>
                        <MemoryStick className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">72%</div>
                        <Progress value={72} className="h-2 mt-2" />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-6 mt-6 lg:grid-cols-2">
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Cluster Status</CardTitle>
                        <CardDescription>Overview of all managed clusters.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Status</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Hosts</TableHead>
                                <TableHead>Alerts</TableHead>
                                <TableHead className="text-right">CPU</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockClusters.map((cluster) => (
                                <TableRow key={cluster.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(cluster.status)}`} />
                                            <span className="capitalize">{cluster.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/clusters/${cluster.id}`} className="font-medium hover:underline">
                                            {cluster.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{cluster.hostCount}</TableCell>
                                    <TableCell>{cluster.alertCount}</TableCell>
                                    <TableCell className="text-right">{cluster.cpuUsage}%</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle>Critical Alerts</CardTitle>
                        <CardDescription>Alerts that require immediate attention.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Severity</TableHead>
                                <TableHead>Alert</TableHead>
                                <TableHead>Cluster</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockAlerts.filter(a => a.status === 'triggered').slice(0, 4).map((alert) => (
                                <TableRow key={alert.id}>
                                    <TableCell>
                                        <Badge variant={getSeverityBadgeVariant(alert.severity)}>{alert.severity}</Badge>
                                    </TableCell>
                                    <TableCell>
                                         <Link href={`/alerts/${alert.id}`} className="font-medium hover:underline">
                                            {alert.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{alert.clusterName}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="outline" size="sm" className="ml-auto gap-1">
                            <Link href="/alerts">
                            View All Alerts <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
             <div className="grid gap-6 mt-6">
                <ClusterHealthSummary cluster={mockClusters[1]} />
            </div>
        </div>
    )
}
