
'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@amberops/ui/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@amberops/ui/components/ui/tooltip';
import { Button } from '@amberops/ui/components/ui/button';
import {
    PlusCircle,
    Search,
    Settings,
    HardDrive,
    Siren,
    ListChecks,
    Server,
    RefreshCw,
    AlertTriangle,
    Bot,
    LayoutDashboard,
    FileText,
    Moon,
    Languages,
    BookOpen,
    LifeBuoy,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import '../styles/quick-access-nav.css';

interface QuickLinkProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function QuickLink({ href, onClick, children }: QuickLinkProps) {
    const commonProps = {
        variant: "ghost",
        className: "justify-start text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 w-full whitespace-nowrap",
        onClick,
    } as const;

    if (href) {
        return (
            <Button {...commonProps} asChild>
                <Link href={href}>{children}</Link>
            </Button>
        );
    }
    return <Button {...commonProps}>{children}</Button>;
}

export function QuickAccessNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const { i18n } = useTranslation();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    toast.success(`Theme changed to ${theme === 'light' ? 'Dark' : 'Light'}`);
    setIsModalOpen(false);
  };
  
  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    toast.success(`Language changed to ${newLang === 'en' ? 'English' : 'Español'}`);
    setIsModalOpen(false);
  };

  const handleAction = (action: string) => {
    toast.success(`${action} task initiated.`);
    setIsModalOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="quick-nav-container group"
            onClick={() => setIsModalOpen(true)}
            onKeyDown={(e) => e.key === 'Enter' && setIsModalOpen(true)}
            role="button"
            tabIndex={0}
            aria-label="Open quick access menu"
          >
            <div className="quick-nav-animation">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="petal" />
              ))}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Quick Access</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="z-[9999] max-w-4xl">
          <DialogHeader>
            <DialogTitle>Quick Access</DialogTitle>
            <DialogDescription>
              Navigate to key areas of the application or perform common actions.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 pt-4">
            {/* Column 1: Clusters & Services */}
            <div className="space-y-3 lg:border-r lg:pr-4">
              <h4 className="font-semibold flex items-center gap-2 text-primary border-b pb-2"><Server className="h-4 w-4" />Clusters & Services</h4>
              <ul className="quick-access-list">
                <li className="quick-access-item"><QuickLink href="/clusters" onClick={closeModal}><PlusCircle /> Add Cluster</QuickLink></li>
                <li className="quick-access-item"><QuickLink href="/clusters" onClick={closeModal}><Server /> Manage Clusters</QuickLink></li>
                <li className="quick-access-item"><QuickLink href="/services" onClick={closeModal}><HardDrive /> Add Service</QuickLink></li>
                <li className="quick-access-item"><QuickLink onClick={() => handleAction("Restart All Services")}><RefreshCw /> Restart All Services</QuickLink></li>
                <li className="quick-access-item"><QuickLink onClick={() => handleAction("Refresh Cluster Health")}><RefreshCw /> Refresh Cluster Health</QuickLink></li>
              </ul>
            </div>

            {/* Column 2: Alerts & Monitoring */}
            <div className="space-y-3 lg:border-r lg:pr-4">
              <h4 className="font-semibold flex items-center gap-2 text-primary border-b pb-2"><Siren className="h-4 w-4" />Alerts & Monitoring</h4>
              <ul className="quick-access-list">
                 <li className="quick-access-item"><QuickLink href="/alerts/definitions" onClick={closeModal}><Siren /> New Alert Definition</QuickLink></li>
                 <li className="quick-access-item"><QuickLink href="/alerts" onClick={closeModal}><AlertTriangle /> View All Alerts</QuickLink></li>
                 <li className="quick-access-item"><QuickLink href="/alerts" onClick={closeModal}><AlertTriangle /> View Critical Alerts</QuickLink></li>
                 <li className="quick-access-item"><QuickLink href="/dashboard" onClick={closeModal}><Bot /> AI Health Summary</QuickLink></li>
                 <li className="quick-access-item"><QuickLink href="/dashboard" onClick={closeModal}><LayoutDashboard /> Resource Dashboard</QuickLink></li>
              </ul>
            </div>

            {/* Column 3: Tasks & Logs */}
            <div className="space-y-3 lg:border-r lg:pr-4">
              <h4 className="font-semibold flex items-center gap-2 text-primary border-b pb-2"><ListChecks className="h-4 w-4" />Tasks & Logs</h4>
               <ul className="quick-access-list">
                 <li className="quick-access-item"><QuickLink href="/tasks" onClick={closeModal}><ListChecks /> View All Tasks</QuickLink></li>
                 <li className="quick-access-item"><QuickLink href="/tasks" onClick={closeModal}><ListChecks /> Pending / Failed Tasks</QuickLink></li>
                 <li className="quick-access-item"><QuickLink href="/logs" onClick={closeModal}><Search /> Search Logs</QuickLink></li>
                 <li className="quick-access-item"><QuickLink onClick={() => handleAction("Export Logs")}><FileText /> Export Logs</QuickLink></li>
                 <li className="quick-access-item"><QuickLink onClick={() => handleAction("View Scheduled Operations")}><ListChecks /> Scheduled Operations</QuickLink></li>
              </ul>
            </div>

            {/* Column 4: Settings & Help */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2 text-primary border-b pb-2"><Settings className="h-4 w-4" />Settings & Help</h4>
               <ul className="quick-access-list">
                 <li className="quick-access-item"><QuickLink href="/settings" onClick={closeModal}><Settings /> Go to Settings</QuickLink></li>
                 <li className="quick-access-item"><QuickLink onClick={toggleTheme}><Moon /> Toggle Theme</QuickLink></li>
                 <li className="quick-access-item"><QuickLink onClick={changeLanguage}><Languages /> Change Language</QuickLink></li>
                 <li className="quick-access-item"><QuickLink href="/help" onClick={closeModal}><BookOpen /> Documentation</QuickLink></li>
                 <li className="quick-access-item"><QuickLink href="/help" onClick={closeModal}><LifeBuoy /> Contact Support</QuickLink></li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
