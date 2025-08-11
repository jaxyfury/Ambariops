
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

export const handlers = [
  // Clusters
  http.get('/api/v1/clusters', () => {
    return HttpResponse.json(mockClusters);
  }),
  http.get('/api/v1/clusters/:id', ({ params }) => {
    const cluster = mockClusters.find((c) => c.id === params.id);
    return cluster ? HttpResponse.json(cluster) : new HttpResponse(null, { status: 404 });
  }),

  // Services
  http.get('/api/v1/clusters/:clusterId/services', ({ params }) => {
    const services = mockServices.filter((s) => s.clusterId === params.clusterId);
    return HttpResponse.json(services);
  }),
  http.get('/api/v1/services/:id', ({ params }) => {
    const service = mockServices.find((s) => s.id === params.id);
    return service ? HttpResponse.json(service) : new HttpResponse(null, { status: 404 });
  }),

  // Hosts
  http.get('/api/v1/clusters/:clusterId/hosts', ({ params }) => {
    const hosts = mockHosts.filter((h) => h.clusterId === params.clusterId);
    return HttpResponse.json(hosts);
  }),
  http.get('/api/v1/hosts/:id', ({ params }) => {
    const host = mockHosts.find((h) => h.id === params.id);
    return host ? HttpResponse.json(host) : new HttpResponse(null, { status: 404 });
  }),

  // Alerts
  http.get('/api/v1/alerts', () => {
    return HttpResponse.json(mockAlerts);
  }),
  http.get('/api/v1/alerts/:id', ({ params }) => {
    const alert = mockAlerts.find((a) => a.id === params.id);
    return alert ? HttpResponse.json(alert) : new HttpResponse(null, { status: 404 });
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
];
