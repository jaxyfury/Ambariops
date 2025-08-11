
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button, Badge, Checkbox } from '@amberops/ui';
import { mockHosts } from '@amberops/api';
import { ArrowUpRight, PlusCircle, Server } from 'lucide-react';
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
        header: 'Name',
        cell: ({ row }) => (
            <div className="font-medium flex items-center gap-2">
                <Server className="h-4 w-4 text-muted-foreground" />
                {row.original.name}
            </div>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <Badge variant={getStatusBadgeVariant(row.original.status)} className="capitalize">
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: 'ip',
        header: 'IP Address',
    },
    {
        accessorKey: 'clusterName',
        header: 'Cluster',
        cell: ({ row }) => (
            <Link href={`/clusters/${row.original.clusterId}`} className="hover:underline">
                {row.original.clusterName}
            </Link>
        ),
    },
    {
        accessorKey: 'os',
        header: 'OS',
    },
    {
        accessorKey: 'lastHeartbeat',
        header: 'Last Heartbeat',
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
