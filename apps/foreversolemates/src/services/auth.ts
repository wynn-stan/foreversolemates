import { http } from '@foreversolemates/utils';
import axios from 'axios';

export const registerUserService = (payload: object) =>
  http.post<never, any>(`/user`, payload);

export const confirmAccountService = (payload: { confirmationCode: string }) =>
  http.post<never, any>(`/user/account/confirm`, payload);
