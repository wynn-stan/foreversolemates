import { http } from '@foreversolemates/utils';

export const addCollectionService = (payload: object) =>
  http.post<typeof payload, any>('/secure/add/collection', payload, {
    headers: { 'content-type': 'multipart/form-data' },
  });

export const updateCollectionService = (id: string, payload: object) =>
  http.post<typeof payload, any>(`/secure/update/collection/${id}`, payload, {
    headers: { 'content-type': 'multipart/form-data' },
  });

export const deleteCollectionService = (id: string) =>
  http.delete<never, any>(`/secure/delete/collection/${id}`);
