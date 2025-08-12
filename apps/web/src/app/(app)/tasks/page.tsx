
'use client';

import { PageHeader } from '@/components/page-header';
import { Progress, Badge, Checkbox, Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui';
import { mockTasks } from '@amberops/api';
import { CheckCircle, XCircle, Loader, CircleDotDashed, ArrowUpDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Task } from '@amberops/lib';
import { useState, useEffect } from 'react';
import { Button } from '@amberops/ui';

function getStatusIcon(status: 'running' | 'completed' | 'failed' | 'pending') {
  switch (status) {
    case 'running':
      return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-white" />;
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
      <DataTable columns={columns} data={mockTasks} filterKey="name" isLoading={isLoading}/>
    </div>
  );
}
