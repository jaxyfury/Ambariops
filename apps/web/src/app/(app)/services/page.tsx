
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Checkbox } from '@amberops/ui';
import { mockServices } from '@amberops/api';
import { ArrowUpRight, CheckCircle2, XCircle, Clock, HardDrive, MoreHorizontal, Play, Square, RefreshCw, ArrowUpDown } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Service } from '@amberops/lib';
import { useState, useEffect } from 'react';

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

export const columns: ColumnDef<Service>[] = [
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
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                {row.original.name}
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
            <div className="flex items-center gap-2">
                {getServiceStatusIcon(row.original.status)}
                <span className="capitalize">{row.original.status}</span>
            </div>
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
            <Link href={`/clusters/${row.original.clusterId}`} className="hover:underline">
                {row.original.clusterName}
            </Link>
        ),
    },
    {
        accessorKey: 'version',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Version
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'runningHosts',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Running Hosts
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => `${row.original.runningHosts} / ${row.original.totalHosts}`,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/services/${row.original.id}`}>
                        View <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Play className="mr-2 h-4 w-4" />
                            Start
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Square className="mr-2 h-4 w-4" />
                            Stop
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Restart
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        ),
    },
];

export default function ServicesPage() {
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
        title="Services"
        description="A list of all services running across your clusters."
      />
      <DataTable columns={columns} data={mockServices} filterKey="name" isLoading={isLoading} />
    </div>
  );
}
