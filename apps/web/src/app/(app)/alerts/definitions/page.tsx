
'use client';

import { PageHeader } from '@/components/page-header';
import { Button, Switch, Badge, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Checkbox, Tooltip, TooltipContent, TooltipTrigger, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Label, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, DialogFooter } from '@amberops/ui';
import { mockAlertDefinitions } from '@amberops/api';
import { PlusCircle, MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { DataTable } from '@/components/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import type { AlertDefinition } from '@amberops/lib';
import { useState, useEffect } from 'react';

export const columns: ColumnDef<AlertDefinition>[] = [
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
        accessorKey: 'enabled',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Enabled
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <Switch checked={row.original.enabled} aria-label={`Enable ${row.original.name}`} />
        ),
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
                    <span className="font-medium truncate block max-w-[200px]">{row.original.name}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.name}</p>
                </TooltipContent>
            </Tooltip>
        ),
    },
    {
        accessorKey: 'service',
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
                    <span className="truncate">{row.original.service}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.service}</p>
                </TooltipContent>
            </Tooltip>
        )
    },
    {
        accessorKey: 'type',
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <Badge variant="outline">{row.original.type}</Badge>,
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row }) => (
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="text-muted-foreground truncate block max-w-[300px]">{row.original.description}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{row.original.description}</p>
                </TooltipContent>
            </Tooltip>
        ),
    },
    {
        id: 'actions',
        cell: () => (
            <div className="text-right">
                <DropdownMenu>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open actions</span>
                            </Button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Open actions</p>
                        </TooltipContent>
                    </Tooltip>
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
        title="Alert Definitions"
        description="Create and manage alert definitions for your services."
      >
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Definition
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Alert Definition</DialogTitle>
                    <DialogDescription>
                        Define a new alert to monitor your services.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" placeholder="e.g., Namenode RPC Latency" className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="service" className="text-right">Service</Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hdfs">HDFS</SelectItem>
                                <SelectItem value="yarn">YARN</SelectItem>
                                <SelectItem value="kafka">Kafka</SelectItem>
                                <SelectItem value="spark">Spark</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Type</Label>
                        <Select>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="metric">METRIC</SelectItem>
                                <SelectItem value="port">PORT</SelectItem>
                                <SelectItem value="script">SCRIPT</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Create Definition</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </PageHeader>
      <DataTable columns={columns} data={mockAlertDefinitions} filterKey="name" isLoading={isLoading} />
    </div>
  );
}
