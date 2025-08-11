
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button, Badge, Checkbox, Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui';
import { mockAlerts } from '@amberops/api';
import { ArrowUpRight, Siren, ArrowUpDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Alert } from '@amberops/lib';
import { useState, useEffect } from 'react';

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

export const columns: ColumnDef<Alert>[] = [
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
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Alert Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-medium flex items-center gap-2">
                <Siren className="h-4 w-4 text-muted-foreground" />
                 <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="truncate">{row.original.name}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.original.name}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        ),
    },
    {
        accessorKey: 'severity',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Severity
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Badge variant={getSeverityBadgeVariant(row.original.severity)} className="capitalize">
                {row.original.severity}
            </Badge>
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
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: 'clusterName',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Cluster
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
             <Tooltip>
                <TooltipTrigger asChild>
                    <Link href={`/clusters/${row.original.clusterId}`} className="hover:underline truncate block max-w-[150px]">
                        {row.original.clusterName}
                    </Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.clusterName}</p>
                </TooltipContent>
            </Tooltip>
        ),
    },
    {
        accessorKey: 'serviceName',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Service
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
         cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="truncate">{row.original.serviceName}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.serviceName}</p>
                </TooltipContent>
            </Tooltip>
        ),
    },
    {
        accessorKey: 'timestamp',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Timestamp
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>{formatDistanceToNow(new Date(row.original.timestamp), { addSuffix: true })}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{new Date(row.original.timestamp).toLocaleString()}</p>
                </TooltipContent>
            </Tooltip>
        ),
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="text-right">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/alerts/${row.original.id}`}>
                    View Details <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
        ),
    },
];

export default function AlertsPage() {
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
        title="Alerts"
        description="View and manage all alerts across your infrastructure."
      />
      <DataTable columns={columns} data={mockAlerts} filterKey="name" isLoading={isLoading} />
    </div>
  );
}
