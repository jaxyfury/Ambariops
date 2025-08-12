
'use client';

import { PageHeader } from '@/components/page-header';
import { Progress } from '@amberops/ui/components/ui/progress';
import { Badge } from '@amberops/ui/components/ui/badge';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui/components/ui/tooltip';
import { Card, CardContent, CardHeader } from '@amberops/ui/components/ui/card';
import { mockTasks, mockServices, mockClusters } from '@amberops/api';
import { CheckCircle, XCircle, Loader, CircleDotDashed, ArrowUpDown, Server, HardDrive } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Task } from '@amberops/lib';
import { useState, useEffect } from 'react';
import { Button } from '@amberops/ui/components/ui/button';

function getStatusIcon(status: 'running' | 'completed' | 'failed' | 'pending') {
  switch (status) {
    case 'running':
      return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-destructive" />;
    case 'pending':
      return <CircleDotDashed className="h-4 w-4 text-muted-foreground" />;
  }
}

function getStatusBadgeVariant(status: 'running' | 'completed' | 'failed' | 'pending'): 'default' | 'destructive' | 'secondary' {
    switch (status) {
        case 'completed':
            return 'default';
        case 'failed':
            return 'destructive';
        case 'running':
        case 'pending':
            return 'secondary';
    }
}

export const columns: ColumnDef<Task>[] = [
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
        accessorKey: 'id',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Task ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
             <Tooltip>
                <TooltipTrigger asChild>
                    <span className="font-mono text-xs text-muted-foreground">#{row.original.id}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Task ID: {row.original.id}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="font-medium truncate block max-w-[250px]">{row.original.name}</span>
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
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Badge variant={getStatusBadgeVariant(row.original.status)} className="capitalize">
                <div className="flex items-center gap-2">
                {getStatusIcon(row.original.status)}
                <span>{row.original.status}</span>
                </div>
            </Badge>
        ),
    },
    {
        accessorKey: 'progress',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Progress
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Progress value={row.original.progress} className="h-2 w-32" />
                <span className="text-muted-foreground text-sm">{row.original.progress}%</span>
            </div>
        )
    },
    {
        accessorKey: 'user',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                User
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="truncate">{row.original.user}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.user}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        accessorKey: 'duration',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Duration
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'startTime',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Start Time
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>{formatDistanceToNow(new Date(row.original.startTime), { addSuffix: true })}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{new Date(row.original.startTime).toLocaleString()}</p>
                </TooltipContent>
            </Tooltip>
        ),
    },
]

const SubRowComponent = ({ task }: { task: Task }) => {
    // This is a mock: in a real app, you'd fetch this data or have it in the task object
    const service = mockServices.find(s => task.name.includes(s.name));
    const cluster = service ? mockClusters.find(c => c.id === service.clusterId) : undefined;
    
    return (
        <div className="bg-muted/50 p-4">
            <Card>
                <CardHeader>
                    <h4 className="font-semibold">Task Details</h4>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    {cluster && (
                        <div className="flex items-center gap-2">
                            <Server className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-muted-foreground">Cluster</p>
                                <p className="font-semibold">{cluster.name}</p>
                            </div>
                        </div>
                    )}
                    {service && (
                         <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-muted-foreground">Service</p>
                                <p className="font-semibold">{service.name}</p>
                            </div>
                        </div>
                    )}
                    <div>
                        <p className="text-muted-foreground">Target</p>
                        <p className="font-semibold">{task.target || 'N/A'}</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground">Logs</p>
                        <p className="font-mono text-xs bg-background p-2 rounded">See task logs for details.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function TasksPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsLoading(false);
        }, 1500); 
        return () => clearTimeout(timer);
    }, []);

  return (
    <div>
      <PageHeader
        title="Tasks & Operations"
        description="Track background operations and service checks."
      />
      <DataTable 
        columns={columns} 
        data={mockTasks} 
        filterKey="name" 
        isLoading={isLoading}
        renderSubComponent={(row) => <SubRowComponent task={row} />}
      />
    </div>
  );
}
