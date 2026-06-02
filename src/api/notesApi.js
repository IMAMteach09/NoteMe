import { apiFetch } from './apiClient.js';

export const getNotes = () => apiFetch('/api/notes');
export const createNote = (payload) =>
  apiFetch('/api/notes', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateNote = (id, payload) =>
  apiFetch(`/api/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

export const deleteNote = (id) =>
  apiFetch(`/api/notes/${id}`, {
    method: 'DELETE',
  });
