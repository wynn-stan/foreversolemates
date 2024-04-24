'use client';

import useSWR from 'swr';
import queryString from 'query-string';

import { PaginatedData, ProductModel } from '../../../../../../models';
import CollectionLayout from '../(components)/Layout.tsx/Layout';
import { Paginate } from '@fsm/ui';
import { useCallback, useState } from 'react';

export default function Page() {
  //state
  const [page, setPage] = useState(0);

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/secure/products?${queryString.stringify({
      page: page + 1,
      size: 10,
    })}`
  );

  return (
    <>
      <CollectionLayout
        cardType="compact"
        {...{ data, isLoading, mutate, page, setPage }}
        header="All Products"
      />
    </>
  );
}
