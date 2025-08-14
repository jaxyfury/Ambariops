
import type { User, Cluster, Service, Host, Alert, AlertDefinition, Task, ActivityLog, LogEntry, ConfigVersion, DocumentationArticle, LegalDocument } from '@amberops/lib';

const API_BASE_URL = '/api/v1';

// A placeholder for a real API client.
const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  post: async <T, U>(url: string, data: T): Promise<U> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  put: async <T, U>(url: string, data: T): Promise<U> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  delete: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
};

// User Service
export const fetchUsers = (): Promise<User[]> => apiClient.get('/users');
export const addUser = (userData: Omit<User, 'id' | 'lastLogin' | 'avatar' | 'password'> & { password?: string }): Promise<User> => apiClient.post('/users', userData);
export const updateUser = (userId: string, userData: Partial<User>): Promise<User> => apiClient.put(`/users/${userId}`, userData);
export const deleteUser = (userId: string): Promise<{ id: string }> => apiClient.delete(`/users/${userId}`);

// Cluster Service
export const fetchClusters = (): Promise<Cluster[]> => apiClient.get('/clusters');
export const fetchClusterById = (id: string): Promise<Cluster> => apiClient.get(`/clusters/${id}`);

// Service Service
export const fetchServices = (): Promise<Service[]> => apiClient.get('/services');
export const fetchServiceById = (id: string): Promise<Service> => apiClient.get(`/services/${id}`);

// Host Service
export const fetchHosts = (): Promise<Host[]> => apiClient.get('/hosts');
export const fetchHostById = (id: string): Promise<Host> => apiClient.get(`/hosts/${id}`);

// Alert Service
export const fetchAlerts = (): Promise<Alert[]> => apiClient.get('/alerts');
export const fetchAlertById = (id: string): Promise<Alert> => apiClient.get(`/alerts/${id}`);

// Alert Definition Service
export const fetchAlertDefinitions = (): Promise<AlertDefinition[]> => apiClient.get('/alert-definitions');

// Task Service
export const fetchTasks = (): Promise<Task[]> => apiClient.get('/tasks');

// Activity Log Service
export const fetchActivityLogs = (): Promise<ActivityLog[]> => apiClient.get('/activity');

// Log Entry Service
export const fetchLogEntries = (): Promise<LogEntry[]> => apiClient.get('/logs');

// Config Version Service
export const fetchConfigVersions = (): Promise<ConfigVersion[]> => apiClient.get('/config-versions');

// Documentation Service
export const fetchDocumentationArticles = (): Promise<DocumentationArticle[]> => apiClient.get('/documentation');
export const addDocumentationArticle = (articleData: Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'>): Promise<DocumentationArticle> => apiClient.post('/documentation', articleData);
export const updateDocumentationArticle = (slug: string, articleData: Partial<DocumentationArticle>): Promise<DocumentationArticle> => apiClient.put(`/documentation/${slug}`, articleData);
export const deleteDocumentationArticle = (slug: string): Promise<{ id: string }> => apiClient.delete(`/documentation/${slug}`);

// Legal Documents Service
export const fetchLegalDocument = (type: 'terms' | 'privacy'): Promise<LegalDocument> => apiClient.get(`/legal/${type}`);
export const updateLegalDocument = (type: 'terms' | 'privacy', data: { content: string }): Promise<LegalDocument> => apiClient.put(`/legal/${type}`, data);
