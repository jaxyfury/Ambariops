
'use client';

import { PageHeader } from "@/components/page-header";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Progress, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge, Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@amberops/ui";
import { mockClusters, mockAlerts } from "@amberops/api";
import { ArrowUpRight, Cpu, MemoryStick, Server, Siren } from "lucide-react";
import Link from 'next/link';
import { ClusterHealthSummary } from "@/components/cluster-health-summary";
import { useState } from "react";
import type { Cluster } from "@amberops/lib";

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

    const [selectedCluster, setSelectedCluster] = useState<Cluster>(mockClusters[1]);

    const handleClusterChange = (clusterId: string) => {
        const cluster = mockClusters.find(c => c.id === clusterId);
        if (cluster) {
            setSelectedCluster(cluster);
        }
    };

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
                 <Card>
                    <CardHeader className="flex flex-row justify-between items-start">
                        <div>
                        <CardTitle>AI Health Summary</CardTitle>
                        <CardDescription>
                            Select a cluster to generate an AI-powered health summary.
                        </CardDescription>
                        </div>
                        <Select onValueChange={handleClusterChange} defaultValue={selectedCluster.id}>
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="Select a cluster" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockClusters.map(cluster => (
                                    <SelectItem key={cluster.id} value={cluster.id}>{cluster.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardHeader>
                    <CardContent>
                         <ClusterHealthSummary cluster={selectedCluster} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
