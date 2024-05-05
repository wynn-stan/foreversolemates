'use client';

import { http } from '@foreversolemates/utils';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';

import LayoutProvider from './layout';

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

  //functions (swr fetcher)
  const fetcher = (url: any) =>
    http.get<never, any>(url).then((response) => response);

  return (
    <>
      <SWRConfig
        value={{ fetcher, shouldRetryOnError: false, revalidateOnFocus: true }}
      >
        <LayoutProvider>{children}</LayoutProvider>
        <Toaster position="top-right" />
      </SWRConfig>
    </>
  );
}
