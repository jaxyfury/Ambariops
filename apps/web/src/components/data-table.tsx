
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnOrderState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  Skeleton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Label,
} from "@amberops/ui"
import { FileDown, SlidersHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Broom, List, LayoutGrid, ArrowUp, ArrowDown, GripVertical } from "lucide-react"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"

type ViewType = 'table' | 'card';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterKey?: string
  isLoading?: boolean
  renderCard?: (item: TData) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  isLoading = false,
  renderCard,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [view, setView] = React.useState<ViewType>('table');
  
  const initialColumnOrder = React.useMemo(() => columns.map(c => (c as any).id || (c as any).accessorKey), [columns]);
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(initialColumnOrder);


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder,
    },
  })

  const getHeaderFromColumn = (columnDef: ColumnDef<TData, TValue>): string => {
    if (typeof columnDef.header === 'string') {
        return columnDef.header;
    }
    // Attempt to extract from accessorKey if header is a function
    const accessorKey = (columnDef as any).accessorKey;
    if (typeof accessorKey === 'string') {
        // Capitalize first letter for a cleaner title
        return accessorKey.charAt(0).toUpperCase() + accessorKey.slice(1);
    }
    // Fallback to the column id
    if(columnDef.id) return columnDef.id;

    return '';
  };


  const exportToPDF = () => {
    const doc = new jsPDF();
    const visibleColumns = table.getVisibleFlatColumns()
        .map(col => col.columnDef)
        .filter((colDef: any) => colDef.id !== 'select' && colDef.id !== 'actions');

    const tableHeaders = visibleColumns.map(colDef => getHeaderFromColumn(colDef));
    
    const tableData = table.getRowModel().rows.map(row => {
        return visibleColumns.map(colDef => {
            const cellValue = row.getValue((colDef as any).accessorKey || (colDef as any).id);
            if(cellValue instanceof Date) return cellValue.toLocaleString();
            if (typeof cellValue === 'object' && cellValue !== null) {
                // For complex objects, attempt to get a name or just stringify
                return (cellValue as any).name || JSON.stringify(cellValue);
            }
            return String(cellValue ?? '');
        });
    });

    autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
    });
    doc.save("table_data.pdf");
  };

  const exportToExcel = () => {
     const visibleColumns = table.getVisibleFlatColumns()
        .map(col => col.columnDef)
        .filter((colDef: any) => colDef.id !== 'select' && colDef.id !== 'actions');

    const tableHeaders = visibleColumns.map(colDef => getHeaderFromColumn(colDef));

    const tableData = table.getRowModel().rows.map(row => {
        const rowData: { [key: string]: any } = {};
        visibleColumns.forEach(colDef => {
            const header = getHeaderFromColumn(colDef);
            const cellValue = row.getValue((colDef as any).accessorKey || (colDef as any).id);
            if (typeof cellValue === 'object' && cellValue !== null) {
                 rowData[header] = (cellValue as any).name || JSON.stringify(cellValue);
            } else {
                rowData[header] = cellValue;
            }
        });
        return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };
  
  const isFiltered = table.getState().columnFilters.length > 0;

  const moveColumn = (draggedId: string, targetId: string) => {
    const newOrder = [...columnOrder];
    const draggedIndex = newOrder.indexOf(draggedId);
    const targetIndex = newOrder.indexOf(targetId);
    
    // Swap elements
    [newOrder[draggedIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[draggedIndex]];
    
    setColumnOrder(newOrder);
  };


  return (
    <div className="w-full">
        <div className="flex items-center py-4 gap-2">
        {filterKey && <Input
          placeholder={`Filter by ${filterKey}...`}
          value={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterKey)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        /> }
        {isFiltered && (
            <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
            >
                Reset
                <Broom className="ml-2 h-4 w-4" />
            </Button>
        )}
        <div className="ml-auto flex items-center gap-2">
            {renderCard && (
                <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                    <Button variant={view === 'table' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('table')}>
                        <List className="h-4 w-4"/>
                    </Button>
                    <Button variant={view === 'card' ? 'secondary' : 'ghost'} size="sm" onClick={() => setView('card')}>
                        <LayoutGrid className="h-4 w-4"/>
                    </Button>
                </div>
            )}
             <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                      <SlidersHorizontal className="mr-2 h-4 w-4" /> Customize
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Customize Columns</h4>
                            <p className="text-sm text-muted-foreground">
                            Toggle visibility and reorder columns.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                return (
                                    <div key={column.id} className="flex items-center justify-between space-x-2">
                                        <div className="flex items-center gap-2">
                                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                                            <Checkbox
                                                id={`col-${column.id}`}
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            />
                                            <Label htmlFor={`col-${column.id}`} className="capitalize truncate">
                                                {column.id}
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => {
                                                    const order = [...columnOrder];
                                                    const idx = order.indexOf(column.id);
                                                    if (idx > 0) {
                                                        [order[idx - 1], order[idx]] = [order[idx], order[idx - 1]];
                                                        table.setColumnOrder(order);
                                                    }
                                                }}
                                                disabled={columnOrder.indexOf(column.id) === 0}
                                            >
                                                <ArrowUp className="h-4 w-4"/>
                                            </Button>
                                             <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={() => {
                                                    const order = [...columnOrder];
                                                    const idx = order.indexOf(column.id);
                                                    if (idx < order.length - 1) {
                                                        [order[idx], order[idx + 1]] = [order[idx + 1], order[idx]];
                                                        table.setColumnOrder(order);
                                                    }
                                                }}
                                                disabled={columnOrder.indexOf(column.id) === columnOrder.length - 1}
                                            >
                                                <ArrowDown className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <Button variant="outline" size="sm" onClick={() => table.setColumnOrder(initialColumnOrder)}>Reset Order</Button>
                    </div>
                </PopoverContent>
            </Popover>
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" data-testid="export-button">
                  <FileDown className="mr-2 h-4 w-4" /> Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export As</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={exportToExcel} data-testid="export-excel">Excel (.xlsx)</DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF} data-testid="export-pdf">PDF (.pdf)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {view === 'card' && renderCard ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {table.getRowModel().rows.map(row => (
                <React.Fragment key={row.id}>
                    {renderCard(row.original)}
                </React.Fragment>
            ))}
        </div>
      ) : (
         <div className="rounded-md border">
            <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id} style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </TableHead>
                    )
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                        <TableRow key={i}>
                            {table.getAllColumns().map((column, j) => (
                                <TableCell key={j}>
                                    <Skeleton className="h-6 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    >
                    {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                        </TableCell>
                    ))}
                    </TableRow>
                ))
                ) : (
                <TableRow>
                    <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    >
                    No results.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      )}
     
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                    }}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

    