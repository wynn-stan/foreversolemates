'use client';

import { usePathname, useRouter } from 'next/navigation';
import queryString from 'query-string';
import { Collection } from '@fsm/ui';
import { useEffect } from 'react';
import useSWR from 'swr';

import { CollectionModel, PaginatedData } from '../../../../../models';
import { options, useLayout } from '../../../../../hooks';
import routes from '../../../../../routes';
import clsx from 'clsx';

export default function Layout({ children }: { children: React.ReactNode }) {
  //hooks
  const { setLayout } = useLayout();
  const router = useRouter();
  const { collections } = options.useGetCollections();

  //effect
  useEffect(() => {
    setLayout({
      back: () => router.push(routes.store.inventory.index),
      backComponent: <span>Inventory</span>,
    });

    return () => setLayout({});
  }, []);

  return (
    <div className="flex gap-10 h-full">
      <div className="hidden md:block">
        <Collection.Sidebar collections={collections} />
      </div>
      <div
        className={clsx('h-full w-[1px] bg-gray-10', 'hidden md:block')}
      ></div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
