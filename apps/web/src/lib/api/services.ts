
import type { User, Cluster, Service, Host, Alert, AlertDefinition, Task, ActivityLog, LogEntry, ConfigVersion, DocumentationArticle, LegalDocument, PricingTier, Testimonial, FAQ } from '@amberops/lib';

const API_BASE_URL = process.env.NEXT_PUBLIC_ENABLE_MOCKING === 'true'
  ? '/api/v1'
  : process.env.NEXT_PUBLIC_API_URL;

// A placeholder for a real API client.
const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  },
  post: async <T, U>(url: string, data: T): Promise<U> => {
    const response = await fetch(url, {
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
    const response = await fetch(url, {
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
    const response = await fetch(url, {
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
export const fetchUsers = (): Promise<User[]> => apiClient.get(`${API_BASE_URL}/users`);
export const addUser = (userData: Omit<User, 'id' | 'lastLogin' | 'avatar' | 'password'> & { password?: string }): Promise<User> => apiClient.post(`${API_BASE_URL}/users`, userData);
export const updateUser = (userId: string, userData: Partial<User>): Promise<User> => apiClient.put(`${API_BASE_URL}/users/${userId}`, userData);
export const deleteUser = (userId: string): Promise<{ id: string }> => apiClient.delete(`${API_BASE_URL}/users/${userId}`);

// Cluster Service
export const fetchClusters = (): Promise<Cluster[]> => apiClient.get(`${API_BASE_URL}/clusters`);
export const fetchClusterById = (id: string): Promise<Cluster> => apiClient.get(`${API_BASE_URL}/clusters/${id}`);

// Service Service
export const fetchServices = (): Promise<Service[]> => apiClient.get(`${API_BASE_URL}/services`);
export const fetchServiceById = (id: string): Promise<Service> => apiClient.get(`${API_BASE_URL}/services/${id}`);

// Host Service
export const fetchHosts = (): Promise<Host[]> => apiClient.get(`${API_BASE_URL}/hosts`);
export const fetchHostById = (id: string): Promise<Host> => apiClient.get(`${API_BASE_URL}/hosts/${id}`);

// Alert Service
export const fetchAlerts = (): Promise<Alert[]> => apiClient.get(`${API_BASE_URL}/alerts`);
export const fetchAlertById = (id: string): Promise<Alert> => apiClient.get(`${API_BASE_URL}/alerts/${id}`);

// Alert Definition Service
export const fetchAlertDefinitions = (): Promise<AlertDefinition[]> => apiClient.get(`${API_BASE_URL}/alert-definitions`);

// Task Service
export const fetchTasks = (): Promise<Task[]> => apiClient.get(`${API_BASE_URL}/tasks`);

// Activity Log Service
export const fetchActivityLogs = (): Promise<ActivityLog[]> => apiClient.get(`${API_BASE_URL}/activity`);

// Log Entry Service
export const fetchLogEntries = (): Promise<LogEntry[]> => apiClient.get(`${API_BASE_URL}/logs`);

// Config Version Service
export const fetchConfigVersions = (): Promise<ConfigVersion[]> => apiClient.get(`${API_BASE_URL}/config-versions`);

// Documentation Service
export const fetchDocumentationArticles = (): Promise<DocumentationArticle[]> => apiClient.get(`${API_BASE_URL}/documentation`);
export const addDocumentationArticle = (articleData: Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'>): Promise<DocumentationArticle> => apiClient.post(`${API_BASE_URL}/documentation`, articleData);
export const updateDocumentationArticle = (slug: string, articleData: Partial<DocumentationArticle>): Promise<DocumentationArticle> => apiClient.put(`${API_BASE_URL}/documentation/${slug}`, articleData);
export const deleteDocumentationArticle = (slug: string): Promise<{ id: string }> => apiClient.delete(`${API_BASE_URL}/documentation/${slug}`);

// Legal Documents Service
export const fetchLegalDocument = (type: 'terms' | 'privacy'): Promise<LegalDocument> => apiClient.get(`${API_BASE_URL}/legal/${type}`);
export const updateLegalDocument = (type: 'terms' | 'privacy', data: { content: string }): Promise<LegalDocument> => apiClient.put(`${API_BASE_URL}/legal/${type}`, data);

// Pricing Tiers Service
export const fetchPricingTiers = (): Promise<PricingTier[]> => apiClient.get(`${API_BASE_URL}/pricing`);
export const addPricingTier = (tierData: Omit<PricingTier, 'id'>): Promise<PricingTier> => apiClient.post(`${API_BASE_URL}/pricing`, tierData);
export const updatePricingTier = (tierId: string, tierData: Partial<PricingTier>): Promise<PricingTier> => apiClient.put(`${API_BASE_URL}/pricing/${tierId}`, tierData);
export const deletePricingTier = (tierId: string): Promise<{ id: string }> => apiClient.delete(`${API_BASE_URL}/pricing/${tierId}`);

// Testimonials Service
export const fetchTestimonials = (): Promise<Testimonial[]> => apiClient.get(`${API_BASE_URL}/testimonials`);
export const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>): Promise<Testimonial> => apiClient.post(`${API_BASE_URL}/testimonials`, testimonialData);
export const updateTestimonial = (id: string, testimonialData: Partial<Testimonial>): Promise<Testimonial> => apiClient.put(`${API_BASE_URL}/testimonials/${id}`, testimonialData);
export const deleteTestimonial = (id: string): Promise<{ id: string }> => apiClient.delete(`${API_BASE_URL}/testimonials/${id}`);

// FAQs Service
export const fetchFaqs = (): Promise<FAQ[]> => apiClient.get(`${API_BASE_URL}/faqs`);
export const addFaq = (faqData: Omit<FAQ, 'id'>): Promise<FAQ> => apiClient.post(`${API_BASE_URL}/faqs`, faqData);
export const updateFaq = (id: string, faqData: Partial<FAQ>): Promise<FAQ> => apiClient.put(`${API_BASE_URL}/faqs/${id}`, faqData);
export const deleteFaq = (id: string): Promise<{ id: string }> => apiClient.delete(`${API_BASE_URL}/faqs/${id}`);
