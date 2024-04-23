'use client';

import useSWR from 'swr';
import queryString from 'query-string';

import { PaginatedData, ProductModel } from '../../../../../../models';
import CollectionLayout from '../(components)/Layout.tsx/Layout';

export default function Page() {
  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/secure/products?${queryString.stringify({
      page: 1,
      size: 10,
    })}`
  );

  return (
    <CollectionLayout
      cardType="compact"
      {...{ data, isLoading, mutate }}
      header="All Products"
    />
  );
}
