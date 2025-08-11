import { PageHeader } from '../../../components/page-header';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { mockConfigVersions } from '../../../lib/mock-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { format } from 'date-fns';
import { Save, History } from 'lucide-react';


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
                        <Button variant="outline">Compare Versions</Button>
                        <Button><Save className="h-4 w-4 mr-2"/>Save Changes</Button>
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
                                    <Button variant="outline" size="sm">Rollback</Button>
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
