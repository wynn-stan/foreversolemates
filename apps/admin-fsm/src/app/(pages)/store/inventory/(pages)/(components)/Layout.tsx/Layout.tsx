'use client';

import { Button, Collection, Field, Filters, Models, Paginate } from '@fsm/ui';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import useSWR from 'swr';
import queryString from 'query-string';
import { motion } from 'framer-motion';

import { options } from '../../../../../../../hooks';
import { ProductCard } from '../../../../../../../components';
import { PaginatedData, ProductModel } from '../../../../../../../models';
import Add from '../Add';
import Preview from '../Preview';
import Update from '../Update';
import Delete from '../Delete';
import styled from 'styled-components';

interface Props {
  data: PaginatedData<ProductModel> | undefined;
  isLoading: boolean;
  mutate: () => void;
  header: string;
  cardType: 'compact' | 'detailed';
  page: number;
  setPage: any;
  filters: Models.FiltersModel;
  setFilters: React.Dispatch<React.SetStateAction<Models.FiltersModel>>;
}

export default function CollectionLayout({
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
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
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
      <div className="space-y-8 w-full">
        <div className="flex gap-4 justify-between">
          <div className="font-medium text-4xl">{header}</div>
          <Button
            className="w-fit"
            direction="left"
            onClick={() => setShowAdd(true)}
            variant="dark"
            icon="plus"
          >
            Add Product
          </Button>
        </div>

        <div className="w-full flex gap-2">
          <Collection.SideModalToggle collections={collections} />

          <div className="flex gap-4 justify-between w-full">
            <Field.Search
              wrapperClassName="min-w-[200px] max-w-[300px]"
              placeholder="Name..."
              onSearch={(search) => {
                setFilters((filters) => ({ ...filters, name: search }));
              }}
            />

            <div className="min-w-fit">
              <Filters.Price {...{ filters, setFilters }} />
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'flex md:gap-12 ',
            cardType === 'compact'
              ? 'justify-center md:justify-start gap-6 flex-wrap'
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
                <Card
                  details={item}
                  onPreview={(details) => {
                    setSelectedProduct(details);
                    setShowPreview(true);
                  }}
                  onDelete={(details) => {
                    setSelectedProduct(details);
                    setShowDelete(true);
                  }}
                  onUpdate={(details) => {
                    setSelectedProduct(details);
                    setShowUpdate(true);
                  }}
                />
              </StyledCard>
            ))
          ) : (
            <></>
          )}
        </div>

        {data && (
          <div className="flex justify-center pb-8 ">
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

      {/* Modals */}
      <Add mutate={mutate} show={showAdd} onHide={() => setShowAdd(false)} />

      {selectedProduct && showPreview && (
        <Preview
          details={selectedProduct}
          show={showPreview}
          onHide={() => setShowPreview(false)}
        />
      )}

      {selectedProduct && showUpdate && (
        <Update
          mutate={mutate}
          details={selectedProduct}
          show={showUpdate}
          onHide={() => setShowUpdate(false)}
        />
      )}

      {selectedProduct && showDelete && (
        <Delete
          mutate={mutate}
          details={selectedProduct}
          show={showDelete}
          onHide={() => setShowDelete(false)}
        />
      )}
    </>
  );
}

const StyledCard = styled.div`
  &:hover .hover-btn {
    background: #262626;
    color: white;
  }
`;
