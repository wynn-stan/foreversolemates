'use client';

import queryString from 'query-string';
import { ProductCard } from '@fsm/ui';
import { useEffect } from 'react';
import useSWR from 'swr';

import { options, useLayout } from '../../../../../hooks';
import { PaginatedData, ProductModel } from '../../../../../models';
import Explore from '../../../../(components)/Explore';

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: Props) {
  //hooks
  const { layout, setLayout } = useLayout();

  //api
  const { data, isLoading } = useSWR<{ data: ProductModel }>(`/product/${id}`);

  //api
  const { data: suggestionsData, isLoading: suggestionsIsLoading } = useSWR<
    PaginatedData<ProductModel>
  >(
    `/products?${queryString.stringify({
      page: 1,
      size: 5,
    })}`
  );

  const details = data?.data;

  //variables - suggested products
  const suggestedProducts = suggestionsData?.data?.filter(
    (item) => item._id !== details?._id
  );

  //effect
  useEffect(() => {
    setLayout({});
  }, []);

  return (
    <>
      {details && (
        <div className="flex justify-center pt-0 md:pt-8">
          <ProductCard.Details
            details={details}
            onColorClick={() => {}}
            onSizeClick={() => {}}
            checkedColor=""
            checkedSize={0}
            onAdd={(quantity) => {}}
          />
        </div>
      )}

      {suggestedProducts && (
        <Explore header="You may also like" products={suggestedProducts} />
      )}
    </>
  );
}
