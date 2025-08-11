import { PageHeader } from '@/components/page-header';
import { Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Card, CardContent, Badge } from '@amberops/ui';
import { mockLogEntries } from '@amberops/api';
import { Search, PlayCircle } from 'lucide-react';

function getLevelBadgeVariant(level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'): 'default' | 'destructive' | 'secondary' {
  switch (level) {
    case 'ERROR':
      return 'destructive';
    case 'WARN':
      return 'secondary';
    case 'INFO':
    case 'DEBUG':
    default:
      return 'default';
  }
}

export default function LogsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Log Search"
        description="Search and tail logs from all hosts and services."
      />
      <div className="flex gap-2 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs... (e.g., component:HDFS AND level:ERROR)" className="pl-8" />
        </div>
        <Button>Search</Button>
        <Button variant="outline"><PlayCircle className="h-4 w-4 mr-2" />Live Tail</Button>
      </div>
      <Card className="flex-grow">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead className="w-[80px]">Level</TableHead>
                <TableHead className="w-[150px]">Host</TableHead>
                <TableHead className="w-[180px]">Component</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogEntries.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-xs">{new Date(log.timestamp).toISOString()}</TableCell>
                  <TableCell><Badge variant={getLevelBadgeVariant(log.level)}>{log.level}</Badge></TableCell>
                  <TableCell className="font-mono text-xs">{log.host}</TableCell>
                  <TableCell className="font-mono text-xs">{log.component}</TableCell>
                  <TableCell className="font-mono text-sm">{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
