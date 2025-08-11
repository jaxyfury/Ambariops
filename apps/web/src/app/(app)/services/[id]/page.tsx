import { notFound } from 'next/navigation';
import { PageHeader } from '../../../../components/page-header';
import { Button } from '../../../../components/ui/button';
import { mockServices } from '../../../../lib/mock-data';

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const service = mockServices.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <PageHeader
        title={service.name}
        description={`Service details for ${service.name} on cluster ${service.clusterName}`}
      >
        <Button variant="outline">Actions</Button>
        <Button>Restart Service</Button>
      </PageHeader>
      <div className="text-center py-20 bg-muted rounded-lg">
          <h2 className="font-headline text-2xl">Service Detail Page</h2>
          <p className="text-muted-foreground">More details about the {service.name} service will be displayed here.</p>
      </div>
    </div>
  );
}
