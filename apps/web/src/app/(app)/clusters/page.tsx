
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import { Badge } from '@amberops/ui/components/ui/badge';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@amberops/ui/components/ui/dialog';
import { Input } from '@amberops/ui/components/ui/input';
import { Label } from '@amberops/ui/components/ui/label';
import { Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui/components/ui/tooltip';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@amberops/ui/components/ui/card';
import { mockClusters } from '@amberops/api';
import { ArrowUpRight, PlusCircle, ArrowUpDown, Server, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Cluster } from '@amberops/lib';
import { useState, useEffect } from 'react';
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

export const columns: ColumnDef<Cluster>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          {column.getIsSorted() === 'desc' ? (
              <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => (
        <Tooltip>
            <TooltipTrigger asChild>
                <span className="font-medium truncate block max-w-[200px]">{row.original.name}</span>
            </TooltipTrigger>
            <TooltipContent>
                <p>{row.original.name}</p>
            </TooltipContent>
        </Tooltip>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            Status
            {column.getIsSorted() === 'desc' ? (
                <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
                <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
        </Button>
    ),
    cell: ({ row }) => (
      <Badge variant={getStatusBadgeVariant(row.original.status)} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'hostCount',
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            Hosts
            {column.getIsSorted() === 'desc' ? (
                <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
                <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
        </Button>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.hostCount}</div>,
  },
  {
    accessorKey: 'serviceCount',
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            Services
            {column.getIsSorted() === 'desc' ? (
                <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
                <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
        </Button>
    ),
     cell: ({ row }) => <div className="text-center">{row.original.serviceCount}</div>,
  },
  {
    accessorKey: 'alertCount',
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            Active Alerts
            {column.getIsSorted() === 'desc' ? (
                <ArrowDown className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'asc' ? (
                <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
                <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
        </Button>
    ),
     cell: ({ row }) => <div className="text-center">{row.original.alertCount}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="text-right">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/clusters/${row.original.id}`}>
                View Details <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View cluster details</p>
          </TooltipContent>
        </Tooltip>
      </div>
    ),
  },
];

function ClusterCard({ cluster }: { cluster: Cluster }) {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="truncate">{cluster.name}</CardTitle>
                    <Badge variant={getStatusBadgeVariant(cluster.status)} className="capitalize flex-shrink-0">{cluster.status}</Badge>
                </div>
                <CardDescription>ID: {cluster.id}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span>{cluster.hostCount} Hosts</span>
                </div>
                 <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span>{cluster.alertCount} Alerts</span>
                </div>
                <div className="col-span-2 space-y-1">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">CPU</span>
                        <span>{cluster.cpuUsage}%</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Memory</span>
                        <span>{cluster.memoryUsage}%</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                 <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/clusters/${cluster.id}`}>
                        View Details <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default function ClustersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const handleAddCluster = () => {
    toast.success('New cluster registration process initiated!');
    setIsModalOpen(false);
  }

  return (
    <div>
      <PageHeader
        title="Clusters"
        description="Manage your clusters and view their health status."
        actions={(
             <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                     <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Cluster
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Cluster</DialogTitle>
                        <DialogDescription>
                            Enter the details for the new cluster. This will begin the registration process.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                            Name
                            </Label>
                            <Input id="name" placeholder="e.g., Production-West-2" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="url" className="text-right">
                            Ambari URL
                            </Label>
                            <Input id="url" placeholder="http://c1.ambari.apache.org:8080" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleAddCluster}>Add Cluster</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )}
      />
      <DataTable 
        columns={columns} 
        data={mockClusters} 
        isLoading={isLoading} 
        filterKey="name"
        renderCard={(cluster) => <ClusterCard cluster={cluster} />}
      />
    </div>
  );
}
