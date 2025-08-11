
'use client';

import { PageHeader } from '@/components/page-header';
import { Button, Switch, Badge, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@amberops/ui';
import { mockAlertDefinitions } from '@amberops/api';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { AlertDefinition } from '@amberops/lib';

export const columns: ColumnDef<AlertDefinition>[] = [
    {
        accessorKey: 'enabled',
        header: 'Enabled',
        cell: ({ row }) => (
            <Switch checked={row.original.enabled} aria-label={`Enable ${row.original.name}`} />
        ),
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
        accessorKey: 'service',
        header: 'Service',
    },
    {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.description}</span>,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <div className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        ),
    },
];

export default function AlertDefinitionsPage() {
  return (
    <div>
      <PageHeader
        title="Alert Definitions"
        description="Create and manage alert definitions for your services."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Definition
        </Button>
      </PageHeader>
      <DataTable columns={columns} data={mockAlertDefinitions} filterKey="name" />
    </div>
  );
}
