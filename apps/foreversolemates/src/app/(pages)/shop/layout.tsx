'use client';

import { Collection } from '@fsm/ui';

import { options, useLayout } from '../../../hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  //hooks
  const { layout } = useLayout();

  //variables
  const { collections } = options.useGetCollections();

  return (
    <div>
      <Collection.SidebarLayout collections={collections}>
        {children}
      </Collection.SidebarLayout>
    </div>
  );
}