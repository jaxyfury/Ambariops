
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Progress, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from '@amberops/ui';
import { mockTasks } from '@amberops/api';
import { CheckCircle, XCircle, Loader, CircleDotDashed, ListChecks } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

function getStatusIcon(status: 'running' | 'completed' | 'failed' | 'pending') {
  switch (status) {
    case 'running':
      return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-red-500" />;
    case 'pending':
      return <CircleDotDashed className="h-4 w-4 text-muted-foreground" />;
  }
}

function getStatusBadgeVariant(status: 'running' | 'completed' | 'failed' | 'pending'): 'default' | 'destructive' | 'secondary' {
    switch (status) {
        case 'completed':
            return 'default';
        case 'failed':
            return 'destructive';
        case 'running':
        case 'pending':
            return 'secondary';
    }
}


export default function TasksPage() {
  return (
    <div>
      <PageHeader
        title="Tasks & Operations"
        description="Track background operations and service checks."
      />
      <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <ListChecks className="h-6 w-6"/>
                <CardTitle>Operations Log</CardTitle>
            </div>
            <CardDescription>A log of all recent background tasks and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Task ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Start Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">#{task.id}</TableCell>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(task.status)} className="capitalize">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span>{task.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Progress value={task.progress} className="h-2 w-32" />
                        <span className="text-muted-foreground text-sm">{task.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{task.user}</TableCell>
                  <TableCell>{task.duration}</TableCell>
                  <TableCell>{formatDistanceToNow(new Date(task.startTime), { addSuffix: true })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
