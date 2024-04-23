'use client';

import { Button, Collection } from '@fsm/ui';

import { options } from '../../../../../../hooks';
import { ListFilterIcon } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';
import useSWR from 'swr';
import queryString from 'query-string';
import { ProductCard } from '../../../../../../components';
import { PaginatedData, ProductModel } from '../../../../../../models';
import Add from '../(components)/Add';
import Preview from '../(components)/Preview';
import Update from '../(components)/Update';
import Delete from '../(components)/Delete';

export default function Page() {
  //hooks
  const { collections } = options.useGetCollections();

  //state
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductModel>();

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/secure/products?${queryString.stringify({
      page: 1,
      size: 10,
    })}`
  );

  const products = data?.data || [];

  return (
    <>
      <div className="space-y-8 w-full">
        <div className="flex gap-4">
          <Collection.SideModalToggle collections={collections} />
          <div className="font-medium text-4xl">All Products</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs">Showing 1 to 16 of 17 total</div>
          <Button
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
            {products.map((item, key) => (
              <div key={key}>
                <ProductCard.Compact
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
