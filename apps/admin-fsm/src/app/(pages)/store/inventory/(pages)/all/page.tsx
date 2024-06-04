'use client';

import queryString from 'query-string';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { PaginatedData, ProductModel } from '../../../../../../models';
import CollectionLayout from '../(components)/Layout.tsx/Layout';
import { Models } from '@fsm/ui';

export default function Page() {
  //state
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<
    Models.FiltersModel & { page?: number }
  >({});

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/secure/products?${queryString.stringify({
      ...filters,
      page: (filters?.page || 0) + 1,
      size: 10,
    })}`
  );

  //effect on page
  useEffect(() => {
    setFilters((filters) => ({ ...filters, page }));
  }, [page, setFilters]);

  return (
    <>
      <CollectionLayout
        cardType="compact"
        {...{ data, isLoading, mutate, page, setPage, filters, setFilters }}
        header="All Products"
      />
    </>
  );
}
