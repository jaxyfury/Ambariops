
import { PageHeader } from '@amberops/ui/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { FileText, Users, Shield, Tag } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        description="Manage site content and users."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users /> User Management</CardTitle>
            <CardDescription>Add, edit, and remove users.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/settings" className="text-primary hover:underline">
              Go to User Management
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><FileText /> Documentation</CardTitle>
            <CardDescription>Manage documentation articles.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/documentation" className="text-primary hover:underline">
              Manage Documentation
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield /> Legal Documents</CardTitle>
            <CardDescription>Edit Terms of Service and Privacy Policy.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/legal" className="text-primary hover:underline">
              Manage Legal Docs
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Tag /> Pricing Tiers</CardTitle>
            <CardDescription>Create, edit, and manage pricing plans.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/admin/pricing" className="text-primary hover:underline">
              Manage Pricing
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    