'use client';

import { Collection, Paginate } from '@fsm/ui';
import styled from 'styled-components';
import { useState } from 'react';
import clsx from 'clsx';

import { options } from '../../hooks';
import { LocalProductCard as ProductCard } from '../../components';
import { PaginatedData, ProductModel } from '../../models';

interface Props {
  data: PaginatedData<ProductModel> | undefined;
  isLoading: boolean;
  mutate: () => void;
  header?: string;
  cardType: 'compact' | 'detailed';
  page: number;
  setPage: any;
}

export default function Layout({
  page: unformattedPage,
  setPage,
  data,
  isLoading,
  mutate,
  header,
  cardType,
}: Props) {
  //hooks
  const { collections } = options.useGetCollections();

  //state
  const [selectedProduct, setSelectedProduct] = useState<ProductModel>();

  //variables
  const products = data?.data || [];
  const Card =
    cardType === 'compact' ? ProductCard.Compact : ProductCard.Detailed;

  //variables - page, initially set to 0
  const page = unformattedPage + 1;

  const to = (() => {
    if (data) {
      //the last item is the current size * current page
      //if the result is greater than the total items(everything not just this request), then we've passed the last item , thus return totalItems.
      const last = data.size * data.page;
      if (last > data?.totalCount) return data.totalCount;
      return last;
    }

    return 0;
  })();

  const from = data ? data.page * data.size - data.size : 0;

  return (
    <>
      <div className="space-y-8 ">
        <div className="flex gap-4">
          <div className="flex gap-4 px-4 sm:px-0 ">
            <Collection.SideModalToggle collections={collections} />
            {header && <div className="font-medium text-4xl">{header}</div>}
          </div>

          {/* <div className="flex items-center justify-between">
            <div className="text-xs">
              Showing {from + 1 || '--'} to {to} of {data?.totalCount || '--'}{' '}
              total
            </div>
          </div> */}
        </div>

        <div
          className={clsx(
            'flex',
            cardType === 'compact'
              ? 'justify-center gap-4 flex-wrap '
              : 'justify-start flex-col gap-8 2xl:flex-row 2xl:flex-wrap'
          )}
        >
          {/* loading */}
          {isLoading &&
            Array.from({ length: 5 }, (_, i) =>
              cardType === 'compact' ? (
                <div
                  key={i}
                  className="w-[150px] lg:w-[250px] h-[300px] lg:h-[388px]  bg-gray-20 animate-pulse"
                ></div>
              ) : (
                <div key={i} className="flex gap-4">
                  <div className="w-[150px] h-[150px] bg-gray-20 animate-pulse"></div>
                  <div className="w-full max-w-[800px] h-[150px] bg-gray-20 animate-pulse"></div>
                </div>
              )
            )}

          {!isLoading && products?.length ? (
            products.map((item, key) => (
              <StyledCard key={key}>
                <Card details={item} />
              </StyledCard>
            ))
          ) : (
            <></>
          )}
        </div>

        {data && (
          <div className="flex justify-center py-8 px-4 sm:px-0 ">
            <Paginate
              to={to}
              from={from + 1}
              total={data?.totalCount}
              pageCount={data?.totalPages || 0}
              {...{ page: unformattedPage, setPage }}
            />
          </div>
        )}
      </div>
    </>
  );
}

const StyledCard = styled.div`
  &:hover .hover-btn {
    background: #262626;
    color: white;
  }
`;
