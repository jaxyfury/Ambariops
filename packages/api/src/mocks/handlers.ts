
import { http, HttpResponse } from 'msw';
import {
  mockClusters,
  mockServices,
  mockHosts,
  mockAlerts,
  mockAlertDefinitions,
  mockConfigVersions,
  mockTasks,
  mockLogEntries,
  mockUsers,
  mockActivityLogs,
  mockPricingTiers,
} from './mock-data';
import type { User, Task, PricingTier } from '@amberops/lib';

let taskIdCounter = mockTasks.length > 0 ? Math.max(...mockTasks.map(t => t.id)) + 1 : 1;

const createNewTask = (name: string): Task => ({
    id: taskIdCounter++,
    name,
    status: 'pending',
    progress: 0,
    startTime: new Date().toISOString(),
    duration: '0s',
    user: 'admin',
});


export const handlers = [
  // Clusters
  http.get('/api/v1/clusters', () => {
    return HttpResponse.json(mockClusters);
  }),
  http.get('/api/v1/clusters/:id', ({ params }) => {
    const cluster = mockClusters.find((c) => c.id === params.id);
    return cluster
      ? HttpResponse.json(cluster)
      : new HttpResponse(null, { status: 404 });
  }),

  // Services
  http.get('/api/v1/services', () => HttpResponse.json(mockServices)),
  http.get('/api/v1/clusters/:clusterId/services', ({ params }) => {
    const services = mockServices.filter(
      (s) => s.clusterId === params.clusterId,
    );
    return HttpResponse.json(services);
  }),
  http.get('/api/v1/services/:id', ({ params }) => {
    const service = mockServices.find((s) => s.id === params.id);
    return service
      ? HttpResponse.json(service)
      : new HttpResponse(null, { status: 404 });
  }),
  http.post('/api/v1/services/:id/start', ({params}) => {
    const service = mockServices.find(s => s.id === params.id);
    if (!service) return new HttpResponse(null, { status: 404 });
    const task = createNewTask(`Start ${service.name}`);
    mockTasks.unshift(task);
    return HttpResponse.json(task, { status: 202 });
  }),
  http.post('/api/v1/services/:id/stop', ({params}) => {
    const service = mockServices.find(s => s.id === params.id);
    if (!service) return new HttpResponse(null, { status: 404 });
    const task = createNewTask(`Stop ${service.name}`);
    mockTasks.unshift(task);
    return HttpResponse.json(task, { status: 202 });
  }),
   http.post('/api/v1/services/:id/restart', ({params}) => {
    const service = mockServices.find(s => s.id === params.id);
    if (!service) return new HttpResponse(null, { status: 404 });
    const task = createNewTask(`Restart ${service.name}`);
    mockTasks.unshift(task);
    return HttpResponse.json(task, { status: 202 });
  }),


  // Hosts
  http.get('/api/v1/hosts', () => HttpResponse.json(mockHosts)),
  http.get('/api/v1/clusters/:clusterId/hosts', ({ params }) => {
    const hosts = mockHosts.filter((h) => h.clusterId === params.clusterId);
    return HttpResponse.json(hosts);
  }),
  http.get('/api/v1/hosts/:id', ({ params }) => {
    const host = mockHosts.find((h) => h.id === params.id);
    return host
      ? HttpResponse.json(host)
      : new HttpResponse(null, { status: 404 });
  }),

  // Alerts
  http.get('/api/v1/alerts', () => {
    return HttpResponse.json(mockAlerts);
  }),
  http.get('/api/v1/alerts/:id', ({ params }) => {
    const alert = mockAlerts.find((a) => a.id === params.id);
    return alert
      ? HttpResponse.json(alert)
      : new HttpResponse(null, { status: 404 });
  }),

  // Alert Definitions
  http.get('/api/v1/alert-definitions', () => {
    return HttpResponse.json(mockAlertDefinitions);
  }),

  // Config Versions
  http.get('/api/v1/config/versions', () => {
    return HttpResponse.json(mockConfigVersions);
  }),

  // Tasks
  http.get('/api/v1/tasks', () => {
    return HttpResponse.json(mockTasks);
  }),

  // Log Entries
  http.get('/api/v1/logs', () => {
    return HttpResponse.json(mockLogEntries);
  }),
  
  // Search
  http.get('/api/v1/search', ({request}) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.toLowerCase() || '';

    if (!q) {
      return HttpResponse.json({ clusters: [], services: [], hosts: [] });
    }

    const clusters = mockClusters.filter(c => c.name.toLowerCase().includes(q));
    const services = mockServices.filter(s => s.name.toLowerCase().includes(q));
    const hosts = mockHosts.filter(h => h.name.toLowerCase().includes(q) || h.ip.includes(q));

    return HttpResponse.json({ clusters, services, hosts });
  }),

  // Activity
  http.get('/api/v1/activity', () => {
    return HttpResponse.json(mockActivityLogs);
  }),
  
  // Users
  http.get('/api/v1/users', () => {
    return HttpResponse.json(mockUsers);
  }),

  http.post('/api/v1/users', async ({ request }) => {
    const newUserRequest = (await request.json()) as Omit<
      User,
      'id' | 'lastLogin' | 'avatar'
    >;
    const newUser: User = {
      id: `u${mockUsers.length + 1}`,
      ...newUserRequest,
      avatar: `https://avatar.vercel.sh/${newUserRequest.email}`,
      lastLogin: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return HttpResponse.json(newUser, { status: 201 });
  }),

  http.put('/api/v1/users/:id', async ({ params, request }) => {
    const userId = params.id;
    const updatedData = (await request.json()) as Partial<User>;
    const userIndex = mockUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
    return HttpResponse.json(mockUsers[userIndex]);
  }),

  http.delete('/api/v1/users/:id', ({ params }) => {
    const userId = params.id;
    const userIndex = mockUsers.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockUsers.splice(userIndex, 1);
    return HttpResponse.json({ id: userId });
  }),
  
  // Pricing Tiers
  http.get('/api/v1/pricing', () => {
    return HttpResponse.json(mockPricingTiers);
  }),
  
  http.post('/api/v1/pricing', async ({ request }) => {
      const newTierData = await request.json() as Omit<PricingTier, 'id'>;
      const newTier: PricingTier = {
          id: `tier-${Date.now()}`,
          ...newTierData,
      };
      mockPricingTiers.push(newTier);
      return HttpResponse.json(newTier, { status: 201 });
  }),

  http.put('/api/v1/pricing/:id', async ({ params, request }) => {
      const { id } = params;
      const updatedData = await request.json() as Partial<PricingTier>;
      const tierIndex = mockPricingTiers.findIndex(t => t.id === id);

      if (tierIndex === -1) {
          return new HttpResponse(null, { status: 404 });
      }
      mockPricingTiers[tierIndex] = { ...mockPricingTiers[tierIndex], ...updatedData };
      return HttpResponse.json(mockPricingTiers[tierIndex]);
  }),

  http.delete('/api/v1/pricing/:id', ({ params }) => {
      const { id } = params;
      const initialLength = mockPricingTiers.length;
      mockPricingTiers = mockPricingTiers.filter(t => t.id !== id);

      if (mockPricingTiers.length === initialLength) {
          return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json({ id });
  }),
];
