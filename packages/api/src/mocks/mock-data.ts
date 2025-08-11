import type { Cluster, Service, Host, Alert, AlertDefinition, ConfigVersion, Task, LogEntry, User, ActivityLog } from '@amberops/lib/types';

const generateHistoricalData = (days: number, cpuMax: number, memMax: number, diskMax: number, netMax: number) => {
  const data = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      cpu: Math.floor(Math.random() * (cpuMax - 20) + 20),
      memory: Math.floor(Math.random() * (memMax - 20) + 20),
      disk: Math.floor(Math.random() * (diskMax - 10) + 10),
      network: Math.floor(Math.random() * (netMax - 5) + 5),
    });
  }
  return data;
};


export const mockClusters: Cluster[] = [
  {
    id: 'prod-cluster-1',
    name: 'Production Cluster',
    status: 'healthy',
    hostCount: 25,
    serviceCount: 12,
    alertCount: 0,
    cpuUsage: 45,
    memoryUsage: 60,
    storageUsage: 75,
    networkUsage: 30,
    healthMetrics: {
      cpu: { value: 45, trend: 'stable' },
      memory: { value: 60, trend: 'up' },
      disk: { value: 75, trend: 'stable' },
    },
    historicalData: generateHistoricalData(30, 60, 70, 80, 40),
  },
  {
    id: 'dev-cluster-2',
    name: 'Development Cluster',
    status: 'degraded',
    hostCount: 10,
    serviceCount: 8,
    alertCount: 2,
    cpuUsage: 88,
    memoryUsage: 72,
    storageUsage: 50,
    networkUsage: 15,
    healthMetrics: {
      cpu: { value: 88, trend: 'up' },
      memory: { value: 72, trend: 'down' },
      disk: { value: 50, trend: 'stable' },
    },
    historicalData: generateHistoricalData(30, 95, 80, 60, 25),
  },
  {
    id: 'staging-cluster-3',
    name: 'Staging Environment',
    status: 'unhealthy',
    hostCount: 15,
    serviceCount: 10,
    alertCount: 5,
    cpuUsage: 95,
    memoryUsage: 85,
    storageUsage: 90,
    networkUsage: 70,
     healthMetrics: {
      cpu: { value: 95, trend: 'up' },
      memory: { value: 85, trend: 'up' },
      disk: { value: 90, trend: 'up' },
    },
    historicalData: generateHistoricalData(30, 100, 90, 95, 80),
  },
];

export const mockServices: Service[] = [
  { id: 'hdfs-1', name: 'HDFS', status: 'started', clusterId: 'prod-cluster-1', clusterName: 'Production Cluster', runningHosts: 20, totalHosts: 20, version: '3.1.3' },
  { id: 'yarn-2', name: 'YARN', status: 'started', clusterId: 'prod-cluster-1', clusterName: 'Production Cluster', runningHosts: 20, totalHosts: 20, version: '3.1.3' },
  { id: 'kafka-3', name: 'Kafka', status: 'stopped', clusterId: 'dev-cluster-2', clusterName: 'Development Cluster', runningHosts: 0, totalHosts: 5, version: '2.8.0' },
  { id: 'spark-4', name: 'Spark', status: 'maintenance', clusterId: 'staging-cluster-3', clusterName: 'Staging Environment', runningHosts: 10, totalHosts: 10, version: '3.1.2' },
];

export const mockHosts: Host[] = [
  { id: 'host-1', name: 'master-01.prod.amberops.io', ip: '10.0.1.10', status: 'healthy', clusterId: 'prod-cluster-1', clusterName: 'Production Cluster', cpuCores: 16, memoryTotalGb: 64, memoryUsedGb: 30, storageTotalGb: 1024, storageUsedGb: 400, os: 'CentOS 7', lastHeartbeat: '2 minutes ago' },
  { id: 'host-2', name: 'worker-01.prod.amberops.io', ip: '10.0.1.11', status: 'healthy', clusterId: 'prod-cluster-1', clusterName: 'Production Cluster', cpuCores: 8, memoryTotalGb: 32, memoryUsedGb: 24, storageTotalGb: 512, storageUsedGb: 300, os: 'CentOS 7', lastHeartbeat: '1 minute ago' },
  { id: 'host-3', name: 'dev-master-01.dev.amberops.io', ip: '192.168.1.5', status: 'unhealthy', clusterId: 'dev-cluster-2', clusterName: 'Development Cluster', cpuCores: 8, memoryTotalGb: 32, memoryUsedGb: 28, storageTotalGb: 256, storageUsedGb: 128, os: 'Ubuntu 20.04', lastHeartbeat: '30 minutes ago' },
  { id: 'host-4', name: 'staging-node-01.staging.amberops.io', ip: '172.16.0.100', status: 'maintenance', clusterId: 'staging-cluster-3', clusterName: 'Staging Environment', cpuCores: 12, memoryTotalGb: 48, memoryUsedGb: 10, storageTotalGb: 768, storageUsedGb: 50, os: 'RHEL 8', lastHeartbeat: '5 hours ago' },
];

export const mockAlerts: Alert[] = [
  { id: 'alert-1', name: 'HDFS Storage Capacity', severity: 'critical', status: 'triggered', clusterId: 'staging-cluster-3', clusterName: 'Staging Environment', serviceName: 'HDFS', timestamp: '2024-05-21T10:00:00Z', description: 'HDFS storage capacity is above 90%.', relatedLogs: 'Log file for HDFS shows disk full errors.' },
  { id: 'alert-2', name: 'Node Manager Health', severity: 'warning', status: 'acknowledged', clusterId: 'dev-cluster-2', clusterName: 'Development Cluster', serviceName: 'YARN', hostName: 'dev-master-01.dev.amberops.io', timestamp: '2024-05-21T09:30:00Z', description: 'NodeManager on dev-master-01 is unhealthy.', relatedLogs: 'Heartbeat missed for NodeManager.' },
  { id: 'alert-3', name: 'Kafka Broker Down', severity: 'critical', status: 'triggered', clusterId: 'dev-cluster-2', clusterName: 'Development Cluster', serviceName: 'Kafka', timestamp: '2024-05-21T11:00:00Z', description: 'Kafka broker is down on host kafka-03.', relatedLogs: 'Connection refused on port 9092.'},
  { id: 'alert-4', name: 'High CPU Usage', severity: 'warning', status: 'resolved', clusterId: 'prod-cluster-1', clusterName: 'Production Cluster', serviceName: 'Spark', hostName: 'worker-01.prod.amberops.io', timestamp: '2024-05-20T14:00:00Z', description: 'CPU utilization has been over 80% for 10 minutes.', relatedLogs: 'Process list shows high CPU usage by Spark executor.' },
];

export const mockAlertDefinitions: AlertDefinition[] = [
    { id: 'def-1', name: 'HDFS Blocks Health', description: 'Checks for corrupt or missing HDFS blocks.', service: 'HDFS', type: 'METRIC', enabled: true },
    { id: 'def-2', name: 'NodeManager Health', description: 'Monitors the health of YARN NodeManagers.', service: 'YARN', type: 'METRIC', enabled: true },
    { id: 'def-3', name: 'Kafka Under-replicated Partitions', description: 'Alerts if Kafka partitions are under-replicated.', service: 'Kafka', type: 'METRIC', enabled: false },
    { id: 'def-4', name: 'Spark Job Failure', description: 'Triggers on Spark job failures.', service: 'Spark', type: 'SCRIPT', enabled: true },
    { id: 'def-5', name: 'Zookeeper Port Check', description: 'Checks if Zookeeper client port is open.', service: 'Zookeeper', type: 'PORT', enabled: true },
];

export const mockConfigVersions: ConfigVersion[] = [
    { version: 12, author: 'admin', date: '2024-05-21T11:00:00Z', notes: 'Increased yarn container memory.' },
    { version: 11, author: 'jdoe', date: '2024-05-20T15:30:00Z', notes: 'Updated spark job properties.' },
    { version: 10, author: 'admin', date: '2024-05-19T09:00:00Z', notes: 'Initial setup for staging cluster.' },
];

export const mockTasks: Task[] = [
    { id: 101, name: 'Restart HDFS DataNodes', status: 'running', progress: 75, startTime: '2024-05-21T12:00:00Z', duration: '5m 30s', user: 'admin' },
    { id: 100, name: 'Run Service Check on YARN', status: 'completed', progress: 100, startTime: '2024-05-21T11:45:00Z', duration: '2m 15s', user: 'admin' },
    { id: 99, name: 'Deploy Kafka Client Configs', status: 'failed', progress: 50, startTime: '2024-05-21T11:30:00Z', duration: '1m 05s', user: 'jdoe' },
    { id: 98, name: 'Add new host to cluster', status: 'pending', progress: 0, startTime: '2024-05-21T12:05:00Z', duration: '0m 0s', user: 'admin' },
];

export const mockLogEntries: LogEntry[] = [
    { timestamp: '2024-05-21T12:05:10Z', level: 'INFO', host: 'master-01.prod', component: 'HDFS.NameNode', message: 'Block replication successful for block blk_12345' },
    { timestamp: '2024-05-21T12:05:05Z', level: 'WARN', host: 'worker-02.prod', component: 'YARN.NodeManager', message: 'High memory usage detected: 92%' },
    { timestamp: '2024-05-21T12:04:50Z', level: 'ERROR', host: 'kafka-03.dev', component: 'Kafka.Broker', message: 'Failed to connect to Zookeeper ensemble at zk-01:2181' },
    { timestamp: '2024-05-21T12:04:30Z', level: 'DEBUG', host: 'master-01.prod', component: 'AmbariServer', message: 'Received heartbeat from worker-01.prod' },
];

export const mockUsers: User[] = [
  { id: 'u1', name: 'Alice Admin', email: 'alice@amberops.io', role: 'Admin', lastLogin: '2024-05-21T10:00:00Z', avatar: 'https://avatar.vercel.sh/alice' },
  { id: 'u2', name: 'Bob Operator', email: 'bob@amberops.io', role: 'Operator', lastLogin: '2024-05-21T11:30:00Z', avatar: 'https://avatar.vercel.sh/bob' },
  { id: 'u3', name: 'Charlie Viewer', email: 'charlie@amberops.io', role: 'Viewer', lastLogin: '2024-05-20T09:00:00Z', avatar: 'https://avatar.vercel.sh/charlie' },
  { id: 'u4', name: 'Diana Deploy', email: 'diana@amberops.io', role: 'Operator', lastLogin: '2024-05-21T12:01:00Z', avatar: 'https://avatar.vercel.sh/diana' },
];

export const mockActivityLogs: ActivityLog[] = [
    { id: 'act-1', user: mockUsers[0], action: 'RESTART', details: 'Restarted HDFS on Production Cluster', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 'act-2', user: mockUsers[1], action: 'ACKNOWLEDGE', details: 'Acknowledged Alert: Node Manager Health', timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString() },
    { id: 'act-3', user: mockUsers[0], action: 'LOGIN', details: 'User alice@amberops.io logged in', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
    { id: 'act-4', user: mockUsers[3], action: 'UPDATE', details: 'Updated user role for charlie@amberops.io to Viewer', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
    { id: 'act-5', user: mockUsers[0], action: 'DELETE', details: 'Deleted cluster: temp-cluster-5', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString() },
];
