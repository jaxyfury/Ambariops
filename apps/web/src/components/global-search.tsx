
'use client';
import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
} from '@amberops/ui/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@amberops/ui/components/ui/tooltip';
import { Button } from '@amberops/ui/components/ui/button';
import { Input } from '@amberops/ui/components/ui/input';
import { Search, Server, HardDrive, Laptop, Loader } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import type { Cluster, Service, Host } from '@amberops/lib';
import Link from 'next/link';

interface SearchResult {
  clusters: Cluster[];
  services: Service[];
  hosts: Host[];
}

export function GlobalSearch() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults(null);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/search?q=${searchQuery}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  const closeModal = () => {
    setIsModalOpen(false);
    setQuery('');
    setResults(null);
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
            <Button variant="outline" className="w-full max-w-xs" onClick={() => setIsModalOpen(true)}>
                <Search className="mr-2 h-4 w-4" />
                <span>Search...</span>
                <kbd className="pointer-events-none ml-auto h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 hidden sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Global Search</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="top-1/4" onInteractOutside={closeModal}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for clusters, services, hosts..."
              className="w-full pl-10 text-lg h-12"
            />
             {isLoading && <Loader className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />}
          </div>
          <div className="mt-4 min-h-[200px]">
            {results && !isLoading && (
              <div className="space-y-4">
                {results.clusters.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Clusters</h3>
                    <div className="flex flex-col gap-1">
                      {results.clusters.map(cluster => (
                        <Link key={cluster.id} href={`/clusters/${cluster.id}`} onClick={closeModal} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                          <Server className="h-4 w-4 text-muted-foreground" />
                          <span>{cluster.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                 {results.services.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Services</h3>
                    <div className="flex flex-col gap-1">
                      {results.services.map(service => (
                        <Link key={service.id} href={`/services/${service.id}`} onClick={closeModal} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                          <HardDrive className="h-4 w-4 text-muted-foreground" />
                          <span>{service.name}</span>
                           <span className="text-xs text-muted-foreground ml-auto">{service.clusterName}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                 {results.hosts.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm mb-2">Hosts</h3>
                    <div className="flex flex-col gap-1">
                      {results.hosts.map(host => (
                        <Link key={host.id} href={`/hosts/${host.id}`} onClick={closeModal} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent">
                          <Laptop className="h-4 w-4 text-muted-foreground" />
                          <span>{host.name}</span>
                           <span className="text-xs text-muted-foreground ml-auto">{host.clusterName}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {results.clusters.length === 0 && results.services.length === 0 && results.hosts.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                        <p>No results found for &quot;{query}&quot;.</p>
                    </div>
                )}
              </div>
            )}
            {!results && !isLoading && query.length < 2 && (
                 <div className="text-center py-8 text-muted-foreground">
                    <p>Enter at least 2 characters to start searching.</p>
                </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
