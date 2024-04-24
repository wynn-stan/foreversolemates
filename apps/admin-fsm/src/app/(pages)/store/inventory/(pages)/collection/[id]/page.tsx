'use client';

import useSWR from 'swr';
import queryString from 'query-string';

import { PaginatedData, ProductModel } from '../../../../../../../models';
import CollectionLayout from '../../(components)/Layout.tsx/Layout';
import { usePathname } from 'next/navigation';
import { options } from '../../../../../../../hooks';
import { useState } from 'react';

export default function Page() {
  //navigation
  const paths = usePathname().split('/');
  const id = paths[paths.length - 1];

  //state
  const [page, setPage] = useState(0);

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/secure/products/${id}?${queryString.stringify({
      page: 1,
      size: 10,
    })}`
  );

  //collection name
  const { collectionOptions } = options.useGetCollections();
  const collectionName =
    collectionOptions.find((item) => item.value === id)?.label || 'Products';

  return (
    <CollectionLayout
      cardType="detailed"
      {...{ data, isLoading, mutate, page, setPage }}
      header={collectionName}
    />
  );
}
