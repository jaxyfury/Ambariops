
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import { Input } from '@amberops/ui/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@amberops/ui/components/ui/table';
import { Card, CardContent } from '@amberops/ui/components/ui/card';
import { Badge } from '@amberops/ui/components/ui/badge';
import { ScrollArea } from '@amberops/ui/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@amberops/ui/components/ui/select';
import { mockLogEntries, mockClusters, mockServices } from '@amberops/api';
import { Search, PlayCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useState } from 'react';
import type { LogEntry } from '@amberops/lib';

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
    const [searchQuery, setSearchQuery] = useState('');
    const [levelFilter, setLevelFilter] = useState('all');
    const [componentFilter, setComponentFilter] = useState('all');
    const [clusterFilter, setClusterFilter] = useState('all');
    const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>(mockLogEntries);

    const handleSearch = () => {
        let logs = mockLogEntries;

        if (searchQuery) {
            logs = logs.filter(log => log.message.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (levelFilter !== 'all') {
            logs = logs.filter(log => log.level === levelFilter);
        }
        if (componentFilter !== 'all') {
            logs = logs.filter(log => log.component === componentFilter);
        }
        if (clusterFilter !== 'all') {
            // This is a mock; a real implementation would have cluster info in logs
            const service = mockServices.find(s => s.id === componentFilter);
            if (service && service.clusterId !== clusterFilter) {
                logs = [];
            }
        }
        
        setFilteredLogs(logs);
        toast.success(`Filtered ${logs.length} log entries.`);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setLevelFilter('all');
        setComponentFilter('all');
        setClusterFilter('all');
        setFilteredLogs(mockLogEntries);
        toast.success('Filters cleared.');
    };

    const uniqueComponents = Array.from(new Set(mockLogEntries.map(log => log.component)));

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        title="Log Search"
        description="Search and tail logs from all hosts and services."
      />
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative flex-grow min-w-[200px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search logs by message..." 
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="INFO">Info</SelectItem>
                <SelectItem value="WARN">Warning</SelectItem>
                <SelectItem value="ERROR">Error</SelectItem>
                <SelectItem value="DEBUG">Debug</SelectItem>
            </SelectContent>
        </Select>
         <Select value={componentFilter} onValueChange={setComponentFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by component..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Components</SelectItem>
                {uniqueComponents.map(comp => (
                    <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                ))}
            </SelectContent>
        </Select>
        <Select value={clusterFilter} onValueChange={setClusterFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by cluster..." />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Clusters</SelectItem>
                 {mockClusters.map(cluster => (
                    <SelectItem key={cluster.id} value={cluster.id}>{cluster.name}</SelectItem>
                 ))}
            </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Search</Button>
        <Button variant="outline" onClick={clearFilters}><X className="h-4 w-4 mr-2" />Clear</Button>
        <Button variant="outline" className="ml-auto" onClick={() => toast('Live tail feature coming soon!')}>
          <PlayCircle className="h-4 w-4 mr-2" />Live Tail
        </Button>
      </div>
      <Card className="flex-grow flex flex-col">
        <CardContent className="p-0 flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead className="w-[80px]">Level</TableHead>
                  <TableHead className="w-[150px]">Host</TableHead>
                  <TableHead className="w-[180px]">Component</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log, index) => (
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
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
