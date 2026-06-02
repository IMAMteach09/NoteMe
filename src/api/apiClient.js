// With the Vite proxy configured, all /api/* requests are forwarded to
// http://localhost:5000 automatically — no CORS issues, no hardcoded port.
const API_BASE = '';

export const getToken = () => localStorage.getItem('noteMeToken');
export const setToken = (token) => localStorage.setItem('noteMeToken', token);
export const clearToken = () => localStorage.removeItem('noteMeToken');
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true,
});

export default apiClient;
export async function apiFetch(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  return data;
}
