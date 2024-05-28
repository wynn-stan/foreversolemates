'use client';

import queryString from 'query-string';
import { useState } from 'react';
import useSWR from 'swr';

import { PaginatedData, ProductModel } from '../../../../../../models';
import CollectionLayout from '../(components)/Layout.tsx/Layout';
import { Models } from '@fsm/ui';

export default function Page() {
  //state
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<Models.FiltersModel>({});

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/secure/products?${queryString.stringify({
      page: page + 1,
      size: 10,
      ...filters,
    })}`
  );

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
