
'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@amberops/ui';
import { mockClusters, mockServices, mockHosts, mockAlerts } from '@amberops/api';
import {
  AlertTriangle,
  ArrowUpRight,
  Cpu,
  Database,
  HardDrive,
  MemoryStick,
  Network,
  Server,
  Siren,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { ChartConfig } from '@amberops/ui';
import toast from 'react-hot-toast';

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

const resourceChartConfig = {
  cpu: { label: "CPU", color: "hsl(var(--chart-1))" },
  memory: { label: "Memory", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

const ioChartConfig = {
    disk: { label: "Disk I/O", color: "hsl(var(--chart-3))" },
    network: { label: "Network I/O", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig


export default function ClusterDetailPage({ params }: { params: { id: string } }) {
  const cluster = mockClusters.find((c) => c.id === params.id);

  if (!cluster) {
    notFound();
  }

  const services = mockServices.filter((s) => s.clusterId === cluster.id);
  const hosts = mockHosts.filter((h) => h.clusterId === cluster.id);
  const alerts = mockAlerts.filter((a) => a.clusterId === cluster.id && a.status === 'triggered');

  const handleRunServiceCheck = () => {
    toast.success('Service check initiated successfully!');
  };

  return (
    <div>
      <PageHeader
        title={cluster.name}
        description={`Details for cluster ID: ${cluster.id}`}
      >
        <Button variant="outline" onClick={() => toast.info('Actions dropdown coming soon!')}>Actions</Button>
        <Button onClick={handleRunServiceCheck}>Run Service Check</Button>
      </PageHeader>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Badge variant={getStatusBadgeVariant(cluster.status)} className="text-lg capitalize">{cluster.status}</Badge>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{cluster.cpuUsage}%</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{cluster.memoryUsage}%</div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{cluster.storageUsage}%</div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <Siren className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{alerts.length}</div>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Resource Utilization (Last 30 Days)</CardTitle>
                <CardDescription>CPU and Memory usage trends.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={resourceChartConfig} className="min-h-[300px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={cluster.historicalData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                        <Area
                            dataKey="memory"
                            type="natural"
                            fill="var(--color-memory)"
                            fillOpacity={0.4}
                            stroke="var(--color-memory)"
                            stackId="a"
                        />
                        <Area
                            dataKey="cpu"
                            type="natural"
                            fill="var(--color-cpu)"
                            fillOpacity={0.4}
                            stroke="var(--color-cpu)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
             <CardDescription>{alerts.length} active alerts require attention.</CardDescription>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-2"/>
                    <p className="font-semibold">No Active Alerts</p>
                    <p className="text-sm text-muted-foreground">This cluster is healthy.</p>
                </div>
            ) : (
                <ul className="space-y-3">
                {alerts.map(alert => (
                    <li key={alert.id} className="flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0"/>
                        <div>
                            <Link href={`/alerts/${alert.id}`} className="font-semibold hover:underline">{alert.name}</Link>
                            <p className="text-sm text-muted-foreground line-clamp-2">{alert.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
            )}
          </CardContent>
        </Card>
         <Card className="lg:col-span-5">
            <CardHeader>
                <CardTitle>I/O Performance (Last 30 Days)</CardTitle>
                <CardDescription>Disk and Network I/O trends.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ChartContainer config={ioChartConfig} className="min-h-[300px] w-full">
                    <AreaChart
                        accessibilityLayer
                        data={cluster.historicalData}
                        margin={{ left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => `${value} MB/s`}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                        <Area
                            dataKey="disk"
                            type="natural"
                            fill="var(--color-disk)"
                            fillOpacity={0.4}
                            stroke="var(--color-disk)"
                        />
                        <Area
                            dataKey="network"
                            type="natural"
                            fill="var(--color-network)"
                            fillOpacity={0.4}
                            stroke="var(--color-network)"
                        />
                         <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Services</CardTitle>
            <CardDescription>{services.length} services running on this cluster.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Running Hosts</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map(service => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getServiceStatusIcon(service.status)}
                        <span className="capitalize">{service.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>{service.version}</TableCell>
                    <TableCell>{service.runningHosts} / {service.totalHosts}</TableCell>
                    <TableCell className="text-right">
                       <Button asChild variant="ghost" size="sm">
                          <Link href={`/services/${service.id}`}>
                            View <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Hosts</CardTitle>
            <CardDescription>{hosts.length} hosts in this cluster.</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Host</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hosts.map(host => (
                  <TableRow key={host.id}>
                    <TableCell className="font-medium">{host.name}</TableCell>
                    <TableCell>{host.ip}</TableCell>
                    <TableCell><Badge variant={host.status === 'healthy' ? 'default' : 'destructive'} className="capitalize">{host.status}</Badge></TableCell>
                    <TableCell className="text-right">
                       <Button asChild variant="ghost" size="sm">
                          <Link href={`/hosts/${host.id}`}>
                            View <ArrowUpRight className="ml-2 h-4 w-4" />
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
    </div>
  );
}
