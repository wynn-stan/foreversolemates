'use client';

import { http } from '@foreversolemates/utils';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ToastContainer } from 'react-toastify';
// import { Toaster } from 'react-toastify';
import { SWRConfig } from 'swr';
import dayjs from 'dayjs';

import LayoutProvider from './layout';
import StoreProvider from '../contexts/store';
import AuthProvider from './auth';

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  //extend functionality of dayjs
  dayjs.extend(advancedFormat);
  dayjs.extend(relativeTime);

  //configs
  http.defaults.baseURL = process?.env?.['NEXT_PUBLIC_BASE_API'];
  http.injectLogout();

  return (
    <>
      <StoreProvider>
        <SWRConfig
          value={{
            fetcher: (url: any) =>
              http.get<never, any>(url).then((response) => response),
            shouldRetryOnError: false,
            revalidateOnFocus: true,
          }}
        >
          <AuthProvider>
            <LayoutProvider>{children}</LayoutProvider>
            <ToastContainer hideProgressBar />
          </AuthProvider>
        </SWRConfig>
      </StoreProvider>
    </>
  );
}
