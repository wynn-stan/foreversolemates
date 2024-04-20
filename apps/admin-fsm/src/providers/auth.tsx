'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

import routes from '../routes';
import { useStore } from '../hooks';

function AuthProvider({ children }: { children: React.ReactNode }) {
  /**
   * cookie
   */
  const token = Cookies.get('token');
  const { store } = useStore();

  /**
   * routes
   */
  const router = useRouter();

  /**
   * effect
   */
  useEffect(() => {
    if (!token || !store?.user?.email) {
      router.push(routes.auth.login.index);
    }
  }, [token, router, store]);

  return <>{token && children}</>;
}

export default AuthProvider;
