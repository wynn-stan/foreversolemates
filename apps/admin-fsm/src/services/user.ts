import { http } from '@foreversolemates/utils';

export const addAdminAccountService = (payload: object) =>
  http.post<typeof payload, any>('/secure/add/account', payload);

export const confirmAdminAccountService = (payload: object) =>
  http.post<typeof payload, any>('/user/account/confirm', payload);
