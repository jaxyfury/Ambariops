
'use client';

import { useState } from 'react';
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
import { PlusCircle, Search, Settings } from 'lucide-react';
import Link from 'next/link';
import '../styles/quick-access-nav.css';

export function QuickAccessNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = [
    { href: '/clusters/new', label: 'Add Cluster', icon: PlusCircle },
    { href: '/logs', label: 'Search Logs', icon: Search },
    { href: '/settings', label: 'Go to Settings', icon: Settings },
  ];

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
        <DialogContent className="z-[9999]">
          <DialogHeader>
            <DialogTitle>Quick Access</DialogTitle>
            <DialogDescription>
              Navigate to key areas of the application.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="justify-start"
                asChild
                onClick={() => setIsModalOpen(false)}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
