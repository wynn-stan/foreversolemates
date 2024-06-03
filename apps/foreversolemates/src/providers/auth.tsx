'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import routes from '../routes';
import { useStore } from '../hooks';
import { http } from '@foreversolemates/utils';
import useGetUser from '../hooks/useGetUser';

function AuthProvider({ children }: { children: React.ReactNode }) {
  /**
   * Hooks
   */
  useGetUser();

  return <>{children}</>;
}

export default AuthProvider;
