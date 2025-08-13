
import type { User } from '@amberops/lib';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1';

// A placeholder for a real API client.
const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
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

export const addUser = (
  userData: Omit<User, 'id' | 'lastLogin' | 'avatar'>,
): Promise<User> => apiClient.post('/users', userData);

export const updateUser = (
  userId: string,
  userData: Partial<User>,
): Promise<User> => apiClient.put(`/users/${userId}`, userData);

export const deleteUser = (userId: string): Promise<{ id: string }> =>
  apiClient.delete(`/users/${userId}`);
