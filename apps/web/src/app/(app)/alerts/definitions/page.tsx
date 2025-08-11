import { PageHeader } from '@/components/page-header';
import { Button, Card, CardContent, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Switch, Badge, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@amberops/ui';
import { mockAlertDefinitions } from '@amberops/api';
import { PlusCircle, MoreHorizontal } from 'lucide-react';

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
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Enabled</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[40%]">Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAlertDefinitions.map((def) => (
                <TableRow key={def.id}>
                  <TableCell>
                    <Switch checked={def.enabled} aria-label={`Enable ${def.name}`} />
                  </TableCell>
                  <TableCell className="font-medium">{def.name}</TableCell>
                  <TableCell>{def.service}</TableCell>
                  <TableCell><Badge variant="outline">{def.type}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{def.description}</TableCell>
                  <TableCell className="text-right">
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
