
import type { User } from '@amberops/lib';

// A placeholder for a real API client.
const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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
export const fetchUsers = (): Promise<User[]> => apiClient.get('/api/v1/users');

export const addUser = (
  userData: Omit<User, 'id' | 'lastLogin' | 'avatar'>,
): Promise<User> => apiClient.post('/api/v1/users', userData);

export const updateUser = (
  userId: string,
  userData: Partial<User>,
): Promise<User> => apiClient.put(`/api/v1/users/${userId}`, userData);

export const deleteUser = (userId: string): Promise<{ id: string }> =>
  apiClient.delete(`/api/v1/users/${userId}`);
