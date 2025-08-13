
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@amberops/ui/components/ui/accordion';
import { Alert, AlertTitle, AlertDescription } from '@amberops/ui/components/ui/alert';
import { BookOpen, AlertTriangle, ExternalLink } from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Documentation"
        description="A comprehensive guide to the AmberOps Console."
      />

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>An overview of the main sections of the application.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Welcome to the AmberOps Console! This guide will walk you through the key features and functionalities. Use the sidebar on the left to navigate between different sections.
            </p>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Dashboard</AccordionTrigger>
                <AccordionContent>
                  The <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link> is your central hub for monitoring the overall health of your infrastructure. It provides at-a-glance summary cards for clusters, alerts, and resource usage. It also features an AI-powered summary for a deep-dive into a specific cluster's health.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Clusters</AccordionTrigger>
                <AccordionContent>
                  The <Link href="/clusters" className="text-primary hover:underline">Clusters</Link> page allows you to view and manage all your registered clusters. You can see their status, host count, and active alerts. Clicking on a cluster will take you to its detailed view, showing resource utilization charts, running services, and associated hosts.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Services</AccordionTrigger>
                <AccordionContent>
                  In the <Link href="/services" className="text-primary hover:underline">Services</Link> page, you can manage all services across all clusters. You can view their status, version, and the hosts they are running on. From here, you can perform actions like starting, stopping, or restarting a service.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-4">
                <AccordionTrigger>Alerts</AccordionTrigger>
                <AccordionContent>
                  The <Link href="/alerts" className="text-primary hover:underline">Alerts</Link> section is divided into two parts:
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><b>Current Alerts:</b> A real-time list of all triggered alerts across your infrastructure.</li>
                    <li><b>Definitions:</b> A page where you can create, edit, and manage the rules that trigger alerts.</li>
                  </ul>
                   Clicking on an alert provides detailed information and AI-powered troubleshooting steps.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Advanced Table Features</CardTitle>
            <CardDescription>How to customize and interact with data tables throughout the app.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>All data tables in AmberOps are equipped with powerful features to help you find and manage your data efficiently.</p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>
                    <b>Filtering:</b> Use the search box above any table to filter results based on the primary column (e.g., filtering clusters by name).
                </li>
                 <li>
                    <b>Sorting:</b> Click on any column header to sort the data. Clicking again will cycle through ascending, descending, and no-sort states.
                </li>
                <li>
                    <b>Customization:</b> Use the "Customize" button to:
                     <ul className="list-disc space-y-1 pl-5 mt-1">
                        <li>Toggle column visibility.</li>
                        <li>Drag-and-drop to reorder columns.</li>
                        <li>Change row density (Compact, Default, Comfortable).</li>
                        <li>Change the table's visual style (Grid, Zebra, etc.).</li>
                    </ul>
                </li>
                 <li>
                    <b>Data Export:</b> Use the "Export" button to download the current table view as a PDF or Excel (.xlsx) file.
                </li>
                 <li>
                    <b>Clear Customizations:</b> If you have made any changes (sorting, filtering, etc.), a "Clear Filter" button will appear. Click it to reset the table to its default view.
                </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Assistance</CardTitle>
            <CardDescription>Leverage the power of AI to manage your clusters more effectively.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Experimental Feature</AlertTitle>
                <AlertDescription>
                  AI features are powered by large language models and may sometimes provide inaccurate information. Always verify critical information.
                </AlertDescription>
            </Alert>
            <div>
                <h3 className="font-semibold mb-2">Cluster Health Summary</h3>
                <p className="text-muted-foreground">
                  Located on the <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link>, this feature provides a natural language summary of a selected cluster's health. It analyzes metrics and active alerts to highlight key issues and potential risks, saving you time on manual analysis.
                </p>
            </div>
             <div>
                <h3 className="font-semibold mb-2">AI Troubleshooting</h3>
                <p className="text-muted-foreground">
                  When viewing the details of an active alert on the <Link href="/alerts" className="text-primary hover:underline">Alerts</Link> page, you will find an "AI-Powered Troubleshooting" card. This provides a set of actionable, step-by-step suggestions to help you diagnose and resolve the alert quickly.
                </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
