'use client';

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'; // prettier-ignore
import cookies from 'js-cookie';

let logout: () => void;

export const injectLogout = (_logout?: typeof logout) => {
  if (_logout) {
    logout = _logout;
  }
};

export const http = axios.create({
  timeout: 45000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    const token = cookies.get('token');

    if (token) {
      config.headers['authorization'] = `Bearer ${token}`;
    }
  }

  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<string>) => {
    if (error.response?.status !== 500) {
      if (error.response?.status === 401) {
        if (logout) {
          logout();
        }
      }

      return Promise.reject(error?.response?.data);
    }

    if (error.response?.status === 500) {
      return Promise.reject({ message: 'Internal server error' });
    }

    return;
  }
);

export default Object.assign(http, { injectLogout });
