'use client';

import queryString from 'query-string';
import { Paginate } from '@fsm/ui';
import useSWR from 'swr';

import { PaginatedData, ProductModel } from '../../../../models';
import { Collection } from '../../../../components';
import { useCallback, useEffect, useState } from 'react';
import { useLayout } from '../../../../hooks';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();

  //state
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({});

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/products?${queryString.stringify({
      page: page + 1,
      size: 10,
    })}`
  );

  //effect
  useEffect(() => {
    setLayout({
      banner: {
        title: 'All Products',
        top_tagline: 'A blend of comfort and style for your feet',
        imageSrc: '/assets/all-collections.png',
      },
    });
  }, []);

  return (
    <>
      <Collection.Layout
        cardType="compact"
        {...{ data, isLoading, mutate, page, setPage, filters, setFilters }}
        header=""
      />
    </>
  );
}
