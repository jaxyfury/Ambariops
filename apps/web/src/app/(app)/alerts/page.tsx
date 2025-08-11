
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button, Badge } from '@amberops/ui';
import { mockAlerts } from '@amberops/api';
import { ArrowUpRight, Siren } from 'lucide-react';
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
        accessorKey: 'name',
        header: 'Alert Name',
        cell: ({ row }) => (
            <div className="font-medium flex items-center gap-2">
                <Siren className="h-4 w-4 text-muted-foreground" />
                {row.original.name}
            </div>
        ),
    },
    {
        accessorKey: 'severity',
        header: 'Severity',
        cell: ({ row }) => (
            <Badge variant={getSeverityBadgeVariant(row.original.severity)} className="capitalize">
                {row.original.severity}
            </Badge>
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
        accessorKey: 'clusterName',
        header: 'Cluster',
        cell: ({ row }) => (
            <Link href={`/clusters/${row.original.clusterId}`} className="hover:underline">
                {row.original.clusterName}
            </Link>
        ),
    },
    {
        accessorKey: 'serviceName',
        header: 'Service',
    },
    {
        accessorKey: 'timestamp',
        header: 'Timestamp',
        cell: ({ row }) => formatDistanceToNow(new Date(row.original.timestamp), { addSuffix: true }),
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
