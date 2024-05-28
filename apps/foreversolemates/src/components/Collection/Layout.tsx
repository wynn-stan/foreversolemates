'use client';

import { Collection, Field, Filters, Models, Paginate } from '@fsm/ui';
import styled from 'styled-components';
import { useState } from 'react';
import clsx from 'clsx';

import { LocalProductCard as ProductCard } from '../../components';
import { PaginatedData, ProductModel } from '../../models';
import { options } from '../../hooks';
import { debounce } from 'lodash';

interface Props {
  data: PaginatedData<ProductModel> | undefined;
  isLoading: boolean;
  mutate: () => void;
  header?: string;
  cardType: 'compact' | 'detailed';
  page: number;
  setPage: any;
  filters: Models.FiltersModel;
  setFilters: React.Dispatch<React.SetStateAction<Models.FiltersModel>>;
}

export default function Layout({
  page: unformattedPage,
  setPage,
  data,
  isLoading,
  mutate,
  header,
  cardType,
  filters,
  setFilters,
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
      <div className=" ">
        <div
          className={clsx(
            'grid grid-cols-[min-content_min-content] xl:grid-cols-[min-content_min-content_min-content]',
            cardType === 'compact'
              ? 'justify-center gap-4 flex-wrap '
              : 'justify-start flex-col gap-8 2xl:flex-row 2xl:flex-wrap'
          )}
        >
          {/* Filters and Toggle */}
          <div className={clsx('col-span-full')}>
            <div className="lg:hidden  min-w-fit mb-4">
              <Filters.Price {...{ filters, setFilters }} />
            </div>
            <div className={clsx('flex gap-4 flex-grow')}>
              <Collection.SideModalToggle collections={collections} />
              {header && <div className="font-medium text-4xl">{header}</div>}
              <div className="flex gap-4 justify-between w-full">
                <Field.Search
                  wrapperClassName="min-w-[200px] max-w-[300px]"
                  placeholder="Name..."
                  onSearch={(search) => {
                    setFilters((filters) => ({ ...filters, name: search }));
                  }}
                />
                <div className="hidden lg:block  min-w-fit">
                  <Filters.Price {...{ filters, setFilters }} />
                </div>
              </div>
            </div>
          </div>

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
