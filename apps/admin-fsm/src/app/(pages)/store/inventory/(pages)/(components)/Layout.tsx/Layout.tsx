'use client';

import { Button, Collection } from '@fsm/ui';
import { useState } from 'react';
import clsx from 'clsx';
import useSWR from 'swr';
import queryString from 'query-string';

import { options } from '../../../../../../../hooks';
import { ProductCard } from '../../../../../../../components';
import { PaginatedData, ProductModel } from '../../../../../../../models';
import Add from '../Add';
import Preview from '../Preview';
import Update from '../Update';
import Delete from '../Delete';

interface Props {
  data: PaginatedData<ProductModel> | undefined;
  isLoading: boolean;
  mutate: () => void;
  header: string;
  cardType: 'compact' | 'detailed';
}

export default function CollectionLayout({
  data,
  isLoading,
  mutate,
  header,
  cardType,
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

  return (
    <>
      <div className="space-y-8 w-full">
        <div className="flex gap-4">
          <Collection.SideModalToggle collections={collections} />
          <div className="font-medium text-4xl">{header}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs">
            Showing {data?.page || '--'} to 16 of {data?.totalCount || '--'}{' '}
            total
          </div>
          <Button
            direction="left"
            onClick={() => setShowAdd(true)}
            variant="outline-secondary"
            icon="plus"
          >
            Add Product
          </Button>
        </div>

        {products?.length ? (
          <div
            className={clsx(
              'justify-center md:justify-start',
              'flex gap-12 flex-wrap'
            )}
          >
            {/* loading */}
            {isLoading &&
              Array.from({ length: 5 }, (_, i) =>
                cardType === 'compact' ? (
                  <div className="w-[250px] h-[388px] bg-gray-20 animate-pulse"></div>
                ) : (
                  <></>
                )
              )}

            {products?.length &&
              products.map((item, key) => (
                <div key={key}>
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
                </div>
              ))}
          </div>
        ) : (
          <></>
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
