'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import { ProductCard } from '@fsm/ui';
import useSWR from 'swr';

import { options, useFilters, useLayout, useStore } from '../../../../../hooks';
import { PaginatedData, ProductModel } from '../../../../../models';
import { CartManager } from '../../../../../components';
import Explore from '../../../../(components)/Explore';
import routes from '../../../../../routes';
import { formatAvailableSizesAndUnits } from '../../../../../utils';

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params: { id } }: Props) {
  //hooks
  const { layout, setLayout } = useLayout();
  const { store, setStore } = useStore();
  const { filters, setFilters } = useFilters();
  const router = useRouter();

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

  //variables - details data
  const details = data?.data;

  //variables - suggested products
  const suggestedProducts = suggestionsData?.data?.filter(
    (item) => item._id !== details?._id
  );

  //effect
  useEffect(() => {
    setLayout({});
  }, []);

  const formatttedDetails = details
    ? {
        ...details,
        available_sizes_and_units: formatAvailableSizesAndUnits(
          details?.available_sizes_and_units || []
        ),
      }
    : undefined;

  return (
    <>
      <div className="flex justify-center pt-0 md:pt-8 px-4 sm:px-0 ">
        {isLoading && (
          <div className="flex gap-4">
            <div className="min-w-[100px] max-w-full h-[450px] animate-pulse bg-gray-10" />
            <div className="flex-grow min-w-[100px] max-w-[450px] h-[450px] animate-pulse bg-gray-5" />
          </div>
        )}

        {details && formatttedDetails && (
          <CartManager details={formatttedDetails}>
            {({ addToCart }) => (
              <ProductCard.Details
                details={formatttedDetails}
                onAdd={({ color, quantity, size }, { setSubmitting }) => {
                  addToCart({
                    selected_color: color,
                    selected_quantity: quantity,
                    selected_size: size,
                    setSubmitting,
                  });
                }}
              />
            )}
          </CartManager>
        )}
      </div>

      {suggestedProducts && (
        <Explore header="You may also like" products={suggestedProducts} />
      )}
    </>
  );
}
