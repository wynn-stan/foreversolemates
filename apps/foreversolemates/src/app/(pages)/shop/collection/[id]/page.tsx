'use client';

import queryString from 'query-string';
import { Paginate } from '@fsm/ui';
import useSWR from 'swr';

import { PaginatedData, ProductModel } from '../../../../../models';
import { Collection } from '../../../../../components';
import { useCallback, useEffect, useState } from 'react';
import { options } from '../../../../../hooks';
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
  const [page, setPage] = useState(0);

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/products/${id}?${queryString.stringify({
      page: page + 1,
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

  return (
    <>
      <Collection.Layout
        cardType="compact"
        {...{ data, isLoading, mutate, page, setPage }}
        header=""
      />
    </>
  );
}
