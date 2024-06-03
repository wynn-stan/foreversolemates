'use client';

import { Dispatch, SetStateAction, createContext, useCallback, useEffect, useState } from 'react'; // prettier-ignore
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/navigation';
import { http } from '@foreversolemates/utils';
import axios from 'axios';

import { CartItem, UserModel } from '../models';
import routes from '../routes';
import Cookies from 'js-cookie';

export interface StoreInterface {
  cart: Partial<CartItem>[];
  user: Partial<UserModel>;
  logout: () => void;
}

export const StoreContext = createContext<{
  store: Partial<StoreInterface>;
  setStore: Dispatch<SetStateAction<Partial<StoreInterface>>>;
}>({
  store: { cart: [], user: {} },
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
        router.push('/');
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

  /**
   * Effect
   */
  useEffect(() => {
    store &&
      router &&
      http.interceptors.response.use(
        (response: any) => response,
        (error: string) => {
          if (error?.toLowerCase() === 'unauthorized') {
            localStorage.clear();
            setStore((store) => {
              return { cart: store?.cart };
            });
            router.refresh();
          }
          return error;
        }
      );
  }, [store, router]);

  return (
    <StoreContext.Provider value={{ store: { ...store, logout }, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
