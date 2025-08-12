
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@amberops/ui/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Textarea } from '@amberops/ui/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@amberops/ui/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@amberops/ui/components/ui/table';
import { mockConfigVersions } from '@amberops/api';
import { format } from 'date-fns';
import { Save, History } from 'lucide-react';
import toast from 'react-hot-toast';


export default function ConfigPage() {
  const sampleConfig = `
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>3</value>
  </property>
  <property>
    <name>yarn.nodemanager.resource.memory-mb</name>
    <value>8192</value>
  </property>
</configuration>
`;

  const handleSaveChanges = () => {
    toast.success('Configuration saved successfully!');
  };

  const handleRollback = (version: number) => {
    toast.success(`Successfully rolled back to version ${version}.`);
  };

  return (
    <div>
      <PageHeader
        title="Configuration Editor"
        description="Manage service configurations across your clusters."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>core-site.xml</CardTitle>
                        <CardDescription>Editing for Production Cluster</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => toast('Compare feature coming soon!')}>Compare Versions</Button>
                        <Button onClick={handleSaveChanges}><Save className="h-4 w-4 mr-2"/>Save Changes</Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Textarea
                    defaultValue={sampleConfig}
                    className="font-mono h-96"
                />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    <CardTitle>Version History</CardTitle>
                </div>
                <CardDescription>Review and rollback to previous versions.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ver.</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockConfigVersions.map(v => (
                            <TableRow key={v.version}>
                                <TableCell className="font-semibold">{v.version}</TableCell>
                                <TableCell>{v.author}</TableCell>
                                <TableCell>{format(new Date(v.date), 'PPp')}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm" onClick={() => handleRollback(v.version)}>Rollback</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
