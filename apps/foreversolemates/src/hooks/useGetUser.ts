'use client';

import { http } from '@foreversolemates/utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useStore from './useStore';

const useGetUser = () => {
  /**
   * store
   */
  const { store, setStore } = useStore();

  /**
   * routes
   */
  const router = useRouter();

  /**
   * effect
   */
  useEffect(() => {
    router &&
      setStore &&
      http
        .get('/get_current_user')
        .then((res: any) => {
          const userData = JSON.parse(res?.data || '');
          setStore((store) => ({
            ...store,
            user: {
              firstName: userData?.firstName,
              lastName: userData?.lastName,
              email: userData?.email,
              mobileNo: userData?.mobileNo,
              delivery_details: userData?.delivery_details,
            },
          }));
        })
        .catch((error: string) => {
          if (error?.toLowerCase() === 'unauthorized') {
            localStorage.clear();
            setStore((store) => {
              return { cart: store?.cart };
            });
          }
          return error;
        });
  }, [router, setStore]);

  return;
};

export default useGetUser;
