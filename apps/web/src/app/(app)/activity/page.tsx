
'use client';

import { PageHeader } from '@/components/page-header';
import { mockActivityLogs } from '@amberops/api';
import { type ColumnDef } from '@tanstack/react-table';
import type { ActivityLog } from '@amberops/lib';
import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@amberops/ui/components/ui/avatar';
import { Badge } from '@amberops/ui/components/ui/badge';
import { Button } from '@amberops/ui/components/ui/button';
import { Checkbox } from '@amberops/ui/components/ui/checkbox';
import { Tooltip, TooltipTrigger, TooltipContent } from '@amberops/ui/components/ui/tooltip';
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react';
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
                onClick={() => column.toggleSorting()}
            >
                User
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={row.original.user.avatar} alt={row.original.user.name} />
                <AvatarFallback>{row.original.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{row.original.user.name}</p>
                <p className="text-sm text-muted-foreground">{row.original.user.email}</p>
              </div>
            </div>
        )
    },
    {
        accessorKey: 'action',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Action
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => <Badge variant={getActionBadgeVariant(row.original.action)}>{row.original.action}</Badge>
    },
    {
        accessorKey: 'details',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Details
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
        ),
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="truncate block max-w-[250px]">{row.original.details}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.details}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        accessorKey: 'timestamp',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting()}
            >
                Time
                {column.getIsSorted() === 'desc' ? (
                    <ArrowDown className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === 'asc' ? (
                    <ArrowUp className="ml-2 h-4 w-4" />
                ) : (
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
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
        )
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
