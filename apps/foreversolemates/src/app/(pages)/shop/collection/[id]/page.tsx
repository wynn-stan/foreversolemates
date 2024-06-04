'use client';

import queryString from 'query-string';
import { Paginate } from '@fsm/ui';
import useSWR from 'swr';

import { PaginatedData, ProductModel } from '../../../../../models';
import { Collection } from '../../../../../components';
import { useCallback, useEffect, useState } from 'react';
import { options, useFilters } from '../../../../../hooks';
import { useLayout } from '../../../../../hooks';

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: Props) {
  //hooks
  const { layout, setLayout } = useLayout();
  const {
    api: { apiCollections },
  } = options.useGetCollections();

  //state
  const { filters, setFilters } = useFilters();
  //state
  const [page, setPage] = useState(
    (() => {
      return filters?.collectionName === id ? filters?.page || 0 : 0;
    })()
  );
  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/products/${id}?${queryString.stringify({
      ...filters,
      page: (filters?.page || 0) + 1,
      size: 10,
    })}`
  );

  //effect
  useEffect(() => {
    //variables - selected collection
    const active_collection = apiCollections?.find((item) => item._id === id);

    const banner = {
      title: active_collection?.collection_name || '',
      top_tagline: active_collection?.top_tagline || '',
      imageSrc: active_collection?.banner_image || '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  //effect on page
  useEffect(() => {
    setFilters((filters) => ({ ...filters, page, collectionName: id }));
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
