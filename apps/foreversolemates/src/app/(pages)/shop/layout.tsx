'use client';

import { Collection } from '@fsm/ui';

import FiltersProvider from '../../../providers/filters';
import { options, useLayout } from '../../../hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  //variables
  const { collections } = options.useGetCollections();

  return (
    <div>
      <FiltersProvider>
        <Collection.SidebarLayout collections={collections}>
          {children}
        </Collection.SidebarLayout>
      </FiltersProvider>
    </div>
  );
}
