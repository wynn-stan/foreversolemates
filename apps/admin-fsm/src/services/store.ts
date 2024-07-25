import { http } from '@foreversolemates/utils';

export const addCollectionService = (payload: object) =>
  http.post<typeof payload, any>('/secure/add/collection', payload, {
    headers: { 'content-type': 'multipart/form-data' },
  });

export const updateCollectionService = (id: string, payload: object) =>
  http.patch<typeof payload, any>(`/secure/update/collection/${id}`, payload, {
    headers: { 'content-type': 'multipart/form-data' },
  });

export const deleteCollectionService = (id: string) =>
  http.delete<never, any>(`/secure/delete/collection/${id}`);

export const addProductService = (payload: object) =>
  http.post<typeof payload, any>('/secure/add/product', payload, {
    headers: { 'content-type': 'multipart/form-data' },
  });

export const updateProductService = (id: string, payload: object) =>
  http.patch<typeof payload, any>(`/secure/update/product/${id}`, payload, {
    headers: { 'content-type': 'multipart/form-data' },
  });

export const deleteProductService = (id: string) =>
  http.delete<never, any>(`/secure/delete/product/${id}`);

export const updateOrderStatusService = (id: string, slug: string) =>
  http.patch<never, any>(`/update_status/${id}`, { state: slug });

export const addLocationService = (payload: { name: string; cost: number }[]) =>
  http.post<never, any>(`/location/bulk`, payload);
