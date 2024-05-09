'use client';

import { Dispatch, SetStateAction, createContext, useCallback, useEffect, useState } from 'react'; // prettier-ignore
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';
import { http } from '@foreversolemates/utils';
import axios from 'axios';

import { UserModel } from '../models';
import routes from '../routes';

export interface StoreInterface {
  user: Partial<UserModel>;
  logout: () => void;
}

export const StoreContext = createContext<{
  store: Partial<StoreInterface>;
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>;
}>({
  store: {},
  setStore: () => null,
});

const StoreProvider = ({ children }: { children: any }) => {
  /**
   * api
   */
  const { mutate } = useSWRConfig();

  /**
   * routes
   */
  const router = useRouter();

  /**
   * state
   */
  const [store, setStore] = useState<Partial<StoreInterface>>(() => {
    if (typeof window !== 'undefined') {
      const store = window.localStorage.getItem(
        process.env['NEXT_PUBLIC_STORAGE_KEY'] as string
      );

      if (store) {
        return JSON.parse(store);
      }
    }

    return null;
  });

  /**
   * functions - logout
   */

  const logout = useCallback(() => {
    if (router && mutate) {
      setStore({});
      sessionStorage.clear();
      mutate(() => true, undefined, { revalidate: false });

      axios.get(`/api/auth/logout`).then(() => {
        // router.push(routes.auth.login.index);
        router.push('');
      });
    }
  }, [mutate, router]);

  /**
   * effect
   */
  useEffect(() => {
    if (store) {
      window.localStorage.setItem(
        process.env['NEXT_PUBLIC_STORAGE_KEY'] as string,
        JSON.stringify(store)
      );
    }

    http.injectLogout(logout);
  }, [store, logout]);

  return (
    <StoreContext.Provider value={{ store: { ...store, logout }, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
