
'use client';

import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@amberops/ui/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@amberops/ui/components/ui/accordion';
import { Alert, AlertTitle, AlertDescription } from '@amberops/ui/components/ui/alert';
import { BookOpen, AlertTriangle } from 'lucide-react';

export default function DocumentationPage() {
  return (
    <div>
      <PageHeader
        title="Documentation"
        description="A comprehensive guide to the AmberOps Console."
      />

      <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle>User Guide</CardTitle>
                    <CardDescription>Everything you need to know, from basic navigation to advanced features.</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent>
             <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">Getting Started: The User Interface</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                    <div>
                        <h4 className="font-semibold text-md">Main Navigation Sidebar</h4>
                        <p className="text-muted-foreground">The primary navigation tool is the collapsible sidebar on the left.
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><b>Expanded View:</b> Shows icons and full text labels for each page.</li>
                                <li><b>Collapsed View:</b> Shrinks to an icon-only rail to maximize screen space. Hover over an icon to see its tooltip.</li>
                                <li><b>Sub-menus:</b> Items like "Alerts" have sub-menus that can be expanded to navigate to more specific pages.</li>
                            </ul>
                        </p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-md">Global Header</h4>
                        <p className="text-muted-foreground">The header at the top of the page provides access to global tools:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><b>Global Search:</b> A powerful search bar (shortcut: `⌘K` or `Ctrl+K`) to quickly find any cluster, service, or host.</li>
                                <li><b>Quick Access Menu:</b> The central animated icon opens a modal with quick links to common actions and pages.</li>
                                <li><b>Language Switcher:</b> Change the application's display language.</li>
                                <li><b>Theme Toggle:</b> Switch between light and dark modes.</li>
                                <li><b>User Menu:</b> Access your account settings or log out.</li>
                            </ul>
                        </p>
                    </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">Core Feature: The Dashboard</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                    <p className="text-muted-foreground">The <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link> is your central hub for monitoring the overall health of your infrastructure.</p>
                     <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><b>Summary Cards:</b> At the top, these cards provide at-a-glance metrics for your entire system, including total clusters, active alerts, and average resource usage.</li>
                        <li><b>Cluster Status Table:</b> This table gives a quick overview of every cluster's health, host count, and alert count. You can click on any cluster's name to navigate to its detailed view.</li>
                        <li><b>Critical Alerts Table:</b> This shows the most recent and critical alerts that require immediate attention.</li>
                        <li><b>AI Health Summary:</b> This powerful widget uses AI to generate a natural-language summary of a selected cluster's health, analyzing its metrics and alerts to highlight potential risks.</li>
                    </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">Core Feature: Cluster & Host Management</AccordionTrigger>
                 <AccordionContent className="space-y-4 pt-2">
                    <div>
                        <h4 className="font-semibold text-md">Clusters Page</h4>
                        <p className="text-muted-foreground">The <Link href="/clusters" className="text-primary hover:underline">Clusters</Link> page is where you view and manage all clusters.
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><b>List / Grid View:</b> Toggle between a detailed table view and a high-level card view.</li>
                                <li><b>Add Cluster:</b> The "Add Cluster" button opens a multi-step wizard to guide you through registering a new Ambari cluster.</li>
                                <li><b>Cluster Details:</b> Clicking on a cluster name takes you to its detail page, which shows resource utilization charts (CPU, Memory, I/O), running services, associated hosts, and active alerts for that specific cluster.</li>
                            </ul>
                        </p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-md">Hosts Page</h4>
                        <p className="text-muted-foreground">The <Link href="/hosts" className="text-primary hover:underline">Hosts</Link> page lists every host across all clusters. You can view a host's IP address, status, OS, and which cluster it belongs to. Clicking a host takes you to its detail page showing resource stats and running services.
                        </p>
                    </div>
                </AccordionContent>
              </AccordionItem>
                <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">Core Feature: Service & Alert Management</AccordionTrigger>
                 <AccordionContent className="space-y-4 pt-2">
                    <div>
                        <h4 className="font-semibold text-md">Services Page</h4>
                        <p className="text-muted-foreground">The <Link href="/services" className="text-primary hover:underline">Services</Link> page lets you manage all services (like HDFS, YARN, etc.). You can view their status, version, and perform actions like starting, stopping, or restarting them from the action menu.
                        </p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-md">Alerts Page</h4>
                        <p className="text-muted-foreground">The <Link href="/alerts" className="text-primary hover:underline">Alerts</Link> section is crucial for monitoring.
                             <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><b>Current Alerts:</b> A real-time list of all triggered alerts. Clicking an alert takes you to its detail page.</li>
                                <li><b>Alert Details:</b> This page shows the severity, timestamp, and description of an alert, along with relevant logs and AI-powered troubleshooting steps.</li>
                                <li><b>Alert Definitions:</b> Here, you can create, edit, and enable or disable the rules that trigger alerts for your services.</li>
                            </ul>
                        </p>
                    </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold">Advanced Feature: Powerful Data Tables</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                    <p className="text-muted-foreground">All data tables in AmberOps are equipped with powerful features to help you find and manage your data efficiently.</p>
                    <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                        <li>
                            <b>Filtering:</b> Use the search box above any table to filter results based on the primary column (e.g., filtering clusters by name).
                        </li>
                         <li>
                            <b>Sorting:</b> Click on any column header to sort the data. Clicking again will cycle through ascending, descending, and **no-sort** states.
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
                            <b>Clear Customizations:</b> If you have made any changes (sorting, filtering, selection, pagination, etc.), a "Clear Filter" button will appear. Click it to instantly reset the table to its default view.
                        </li>
                    </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-semibold">Advanced Feature: AI Assistance</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                     <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Experimental Feature</AlertTitle>
                        <AlertDescription>
                          AI features are powered by large language models and may sometimes provide inaccurate information. Always verify critical information.
                        </AlertDescription>
                    </Alert>
                    <div>
                        <h4 className="font-semibold text-md">Cluster Health Summary</h4>
                        <p className="text-muted-foreground">
                          Located on the <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link>, this feature provides a natural language summary of a selected cluster's health. It analyzes metrics and active alerts to highlight key issues and potential risks, saving you time on manual analysis.
                        </p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-md">AI Troubleshooting</h4>
                        <p className="text-muted-foreground">
                          When viewing the details of an active alert on the <Link href="/alerts" className="text-primary hover:underline">Alerts</Link> page, you will find an "AI-Powered Troubleshooting" card. This provides a set of actionable, step-by-step suggestions to help you diagnose and resolve the alert quickly.
                        </p>
                    </div>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-7">
                <AccordionTrigger className="text-lg font-semibold">Settings & Management</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-2">
                    <p className="text-muted-foreground">The <Link href="/settings" className="text-primary hover:underline">Settings</Link> page is organized into tabs:</p>
                     <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><b>General:</b> Update your personal information and application theme.</li>
                        <li><b>User Management:</b> Add, edit, or delete users and manage their roles (Admin, Operator, Viewer).</li>
                        <li><b>Integrations:</b> Connect AmberOps to third-party services like Slack for notifications.</li>
                        <li><b>API Access:</b> Generate and manage API keys for programmatic access to the AmberOps console.</li>
                    </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
