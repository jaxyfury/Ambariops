import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { mockHosts } from '@/lib/mock-data';

export default function HostDetailPage({ params }: { params: { id: string } }) {
  const host = mockHosts.find((h) => h.id === params.id);

  if (!host) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={host.name}
        description={`Host details for ${host.ip}`}
      >
        <Button variant="outline">Actions</Button>
        <Button>Reboot Host</Button>
      </PageHeader>
      <div className="text-center py-20 bg-muted rounded-lg">
          <h2 className="font-headline text-2xl">Host Detail Page</h2>
          <p className="text-muted-foreground">More details about the host {host.name} will be displayed here.</p>
      </div>
    </div>
  );
}
