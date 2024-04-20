import { http } from '@foreversolemates/utils';

export const loginService = (payload: { email: string; password: string }) =>
  http.post<typeof payload, any>('/login', payload);
