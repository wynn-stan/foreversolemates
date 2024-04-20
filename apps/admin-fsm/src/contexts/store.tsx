'use client';

import { useRouter } from 'next/navigation';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import axios from 'axios';
import { http } from '@foreversolemates/utils';

import routes from '../routes';
import { UserModel } from '../models';

export interface StoreInterface {
  user: UserModel;
  logout: () => void;
}

type Store = Partial<StoreInterface>;
type SetStore = React.Dispatch<React.SetStateAction<Store>>;

export const StoreContext = createContext<{
  store: Store;
  setStore: SetStore;
}>({
  store: {},
  setStore: () => null,
});

const StoreProvider = ({ children }: { children: any }) => {
  //variables
  const public_storage_key = process.env['NEXT_PUBLIC_STORAGE_KEY'] as string;

  //api
  const { mutate } = useSWRConfig();

  //routes
  const router = useRouter();

  //functions
  const getInitialStore = () => {
    if (typeof window !== 'undefined') {
      const store = window.localStorage.getItem(public_storage_key);

      if (store) {
        return JSON.parse(store);
      }
    }

    return null;
  };

  //functions logout
  const logout = useCallback(() => {
    if (router && mutate) {
      setStore({});
      sessionStorage.clear();
      mutate(() => true, undefined, { revalidate: false });

      axios.get('/api/auth/logout').then(() => {
        router.push(routes.auth.login.index);
      });
    }
  }, [mutate, router]);

  //state
  const [store, setStore] = useState<Partial<StoreInterface>>(() =>
    getInitialStore()
  );

  //effect
  useEffect(() => {
    if (store) {
      window.localStorage.setItem(public_storage_key, JSON.stringify(store));
      http.injectLogout(logout);
    }
  }, [store, logout]);

  return (
    <StoreContext.Provider value={{ store: { ...store, logout }, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
