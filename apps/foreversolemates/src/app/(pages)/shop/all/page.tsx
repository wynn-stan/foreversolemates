'use client';

import queryString from 'query-string';
import { Paginate } from '@fsm/ui';
import useSWR from 'swr';

import { PaginatedData, ProductModel } from '../../../../models';
import { Collection } from '../../../../components';
import { useCallback, useEffect, useState } from 'react';
import { useFilters, useLayout } from '../../../../hooks';

import { Models } from '@fsm/ui';

type IFilters = Models.FiltersModel;

export default function Page() {
  //const
  const collectionName = 'All';

  //hooks
  const { layout, setLayout } = useLayout();
  const { filters, setFilters } = useFilters();

  //state
  const [page, setPage] = useState(
    (() => {
      return filters?.collectionName === collectionName
        ? filters?.page || 0
        : 0;
    })()
  );

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/products?${queryString.stringify({
      ...filters,
      page: (filters?.page || 0) + 1,
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

  //effect on page
  useEffect(() => {
    setFilters((filters) => ({ ...filters, page, collectionName }));
  }, [page, setFilters]);

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
