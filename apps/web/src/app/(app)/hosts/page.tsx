
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button, Badge, Checkbox, Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui';
import { mockHosts } from '@amberops/api';
import { ArrowUpRight, PlusCircle, Server, ArrowUpDown } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Host } from '@amberops/lib';
import { useState, useEffect } from 'react';

function getStatusBadgeVariant(status: 'healthy' | 'unhealthy' | 'restarting' | 'maintenance'): 'default' | 'destructive' | 'secondary' {
  switch (status) {
    case 'healthy':
      return 'default';
    case 'unhealthy':
      return 'destructive';
    case 'restarting':
    case 'maintenance':
      return 'secondary';
  }
}

export const columns: ColumnDef<Host>[] = [
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
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="font-medium flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="truncate block max-w-[200px]">{row.original.name}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{row.original.name}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
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
        accessorKey: 'ip',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                IP Address
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span>{row.original.ip}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.ip}</p>
                </TooltipContent>
            </Tooltip>
        )
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
        accessorKey: 'os',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                OS
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
         cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="truncate">{row.original.os}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.os}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        accessorKey: 'lastHeartbeat',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Last Heartbeat
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
         cell: ({ row }) => (
             <Tooltip>
                <TooltipTrigger asChild>
                    <span>{row.original.lastHeartbeat}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.lastHeartbeat}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        id: 'actions',
        cell: ({ row }) => (
             <div className="text-right">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/hosts/${row.original.id}`}>
                    View Details <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
            </div>
        ),
    },
];


export default function HostsPage() {
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
        title="Hosts"
        description="A list of all hosts across your clusters."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Host
        </Button>
      </PageHeader>
       <DataTable columns={columns} data={mockHosts} filterKey="name" isLoading={isLoading}/>
    </div>
  );
}
