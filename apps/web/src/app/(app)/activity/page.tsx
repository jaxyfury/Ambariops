
'use client';

import { PageHeader } from '@/components/page-header';
import { mockActivityLogs } from '@amberops/api';
import { type ColumnDef } from '@tanstack/react-table';
import type { ActivityLog } from '@amberops/lib';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage, Badge, Button, Checkbox } from '@amberops/ui';
import { ArrowUpDown } from 'lucide-react';
import { DataTable } from '@/components/data-table';

function getActionBadgeVariant(action: 'LOGIN' | 'CREATE' | 'UPDATE' | 'DELETE' | 'RESTART' | 'ACKNOWLEDGE'): 'default' | 'secondary' | 'destructive' | 'outline' {
    switch (action) {
        case 'CREATE':
            return 'default';
        case 'UPDATE':
        case 'ACKNOWLEDGE':
        case 'RESTART':
            return 'secondary';
        case 'DELETE':
            return 'destructive';
        case 'LOGIN':
        default:
            return 'outline';
    }
}

export const columns: ColumnDef<ActivityLog>[] = [
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
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={row.original.user.avatar} alt={row.original.user.name} />
                    <AvatarFallback>{row.original.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{row.original.user.name}</span>
            </div>
        )
    },
    {
        accessorKey: 'action',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Action
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <Badge variant={getActionBadgeVariant(row.original.action)}>{row.original.action}</Badge>
    },
    {
        accessorKey: 'details',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Details
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: 'timestamp',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Time
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => formatDistanceToNow(new Date(row.original.timestamp), { addSuffix: true }),
    }
];

export default function ActivityPage() {
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
        title="Activity Log"
        description="An immutable log of all user and system activities."
      />
      <DataTable columns={columns} data={mockActivityLogs} filterKey="details" isLoading={isLoading} />
    </div>
  );
}
