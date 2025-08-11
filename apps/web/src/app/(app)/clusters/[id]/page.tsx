import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, ChartContainer, ChartTooltip, ChartTooltipContent } from '@amberops/ui';
import { mockClusters, mockServices, mockHosts, mockAlerts } from '@amberops/api';
import {
  AlertTriangle,
  ArrowUpRight,
  Cpu,
  HardDrive,
  MemoryStick,
  Server,
  Siren,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { ChartConfig } from '@amberops/ui';

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

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


export default function ClusterDetailPage({ params }: { params: { id: string } }) {
  const cluster = mockClusters.find((c) => c.id === params.id);

  if (!cluster) {
    notFound();
  }

  const services = mockServices.filter((s) => s.clusterId === cluster.id);
  const hosts = mockHosts.filter((h) => h.clusterId === cluster.id);
  const alerts = mockAlerts.filter((a) => a.clusterId === cluster.id && a.status === 'triggered');

  return (
    <div>
      <PageHeader
        title={cluster.name}
        description={`Details for cluster ID: ${cluster.id}`}
      >
        <Button variant="outline">Actions</Button>
        <Button>Run Service Check</Button>
      </PageHeader>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
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
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <Siren className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{alerts.length}</div>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>CPU Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                 <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
             <CardDescription>{alerts.length} active alerts</CardDescription>
          </CardHeader>
          <CardContent>
            {alerts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-2"/>
                    <p className="font-semibold">No Active Alerts</p>
                    <p className="text-sm text-muted-foreground">This cluster is healthy.</p>
                </div>
            ) : (
                <ul className="space-y-2">
                {alerts.map(alert => (
                    <li key={alert.id} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1"/>
                        <div>
                            <Link href={`/alerts/${alert.id}`} className="font-semibold hover:underline">{alert.name}</Link>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
            )}
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

        <Card className="lg:col-span-3">
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
                  <TableHead>OS</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hosts.map(host => (
                  <TableRow key={host.id}>
                    <TableCell className="font-medium">{host.name}</TableCell>
                    <TableCell>{host.ip}</TableCell>
                    <TableCell><Badge variant={host.status === 'healthy' ? 'default' : 'destructive'} className="capitalize">{host.status}</Badge></TableCell>
                    <TableCell>{host.os}</TableCell>
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
