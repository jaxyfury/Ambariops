import { PageHeader } from '../../../components/page-header';
import { Card, CardContent } from '../../../components/ui/card';
import { Progress } from '../../../components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { mockTasks } from '../../../lib/mock-data';
import { Badge } from '../../../components/ui/badge';
import { CheckCircle, XCircle, Loader, CircleDotDashed } from 'lucide-react';

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

export default function TasksPage() {
  return (
    <div>
      <PageHeader
        title="Tasks & Operations"
        description="Track background operations and service checks."
      />
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
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
                  <TableCell className="font-mono">{task.id}</TableCell>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span className="capitalize">{task.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Progress value={task.progress} className="h-2 w-32" />
                  </TableCell>
                  <TableCell>{task.user}</TableCell>
                  <TableCell>{task.duration}</TableCell>
                  <TableCell>{new Date(task.startTime).toLocaleTimeString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
