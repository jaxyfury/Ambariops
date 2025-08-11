
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
} from './mock-data';
import type { User } from '@amberops/lib';

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
];
