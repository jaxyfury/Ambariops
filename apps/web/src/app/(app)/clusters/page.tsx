
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button, Badge, Checkbox } from '@amberops/ui';
import { mockClusters } from '@amberops/api';
import { ArrowUpRight, PlusCircle, ArrowUpDown } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { Cluster } from '@amberops/lib';
import { useState, useEffect } from 'react';

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
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
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
    accessorKey: 'hostCount',
    header: 'Hosts',
  },
  {
    accessorKey: 'serviceCount',
    header: 'Services',
  },
  {
    accessorKey: 'alertCount',
    header: 'Active Alerts',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <Button asChild variant="ghost" size="sm">
        <Link href={`/clusters/${row.original.id}`}>
          View Details <ArrowUpRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    ),
  },
];


export default function ClustersPage() {
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
        title="Clusters"
        description="Manage your clusters and view their health status."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Cluster
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={mockClusters} isLoading={isLoading} filterKey="name" />
    </div>
  );
}
