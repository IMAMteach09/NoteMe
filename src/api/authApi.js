import { apiFetch, setToken, clearToken } from './apiClient.js';

export async function login(credentials) {
  const data = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  setToken(data.token);
  return data;
}

export async function register(payload) {
  const data = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  setToken(data.token);
  return data;
}

export async function loadUser() {
  return apiFetch('/api/auth/me');
}

export async function updateUser(payload) {
  return apiFetch('/api/auth/me', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function forgotPassword(email) {
  return apiFetch('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token, password) {
  return apiFetch('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, password }),
  });
}

export function logout() {
  clearToken();
}
