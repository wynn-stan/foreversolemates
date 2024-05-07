'use client';

import { PromoBanner } from '../components';
import { Modal as RestartModal } from '@restart/ui';
import { Button, CollectionCard, Modal } from '@fsm/ui';
import Explore from './(components)/Explore';
import { useState } from 'react';
import useSWR from 'swr';
import { CollectionModel, PaginatedData, ProductModel } from '../models';
import { options } from '../hooks';
import Link from 'next/link';
import routes from '../routes';
import clsx from 'clsx';
import axios from 'axios';
import queryString from 'query-string';
import { http } from '@foreversolemates/utils';

interface CollectionsData extends CollectionModel {
  products: ProductModel[];
}

export default function Index() {
  //api
  const {
    api: { apiCollections },
  } = options.useGetCollections();

  const [coll1, coll2] = [apiCollections?.[0], apiCollections?.[1]];

  //variables - collections data
  const { data: firstProducts, isLoading } = useSWR<
    PaginatedData<ProductModel>
  >(
    coll1 &&
      `/products/${coll1?._id}?${queryString.stringify({
        page: 1,
        size: 4,
      })}`
  );

  const { data: secondProducts, isLoading: secondLoading } = useSWR<
    PaginatedData<ProductModel>
  >(
    coll2 &&
      `/products/${coll2?._id}?${queryString.stringify({
        page: 1,
        size: 4,
      })}`
  );

  return (
    <div className="space-y-6">
      <PromoBanner />
      <div className="px-4 overflow-hidden flex justify-center">
        <div
          className={clsx(
            'flex overflow-y-auto gap-4 no-scrollbar'
            // 'max-w-7xl'
          )}
        >
          <div className="">
            <CollectionCard
              topTagline={'Ease and elegance for your feet'}
              bottomTagline={'Delve into our curated collections'}
              bannerImage={'/assets/all-collections.png'}
              collectionName={'All Products'}
              actions={
                <>
                  <Link href={routes.shop.all.index}>
                    <Button icon="arrow-right" className="!gap-4">
                      Start shopping
                    </Button>
                  </Link>
                </>
              }
            />
          </div>
          {apiCollections.map((item, key) => (
            <div>
              <CollectionCard
                topTagline={item.top_tagline}
                actions={
                  <>
                    <Link
                      href={routes.shop.collection.index.replace(
                        '[id]',
                        item._id
                      )}
                    >
                      <Button icon="arrow-right" className="!gap-4">
                        Start shopping
                      </Button>
                    </Link>
                  </>
                }
                collectionName={item.collection_name}
                bannerImage={item.banner_image}
                bottomTagline={item.bottom_tagline}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {coll1 && firstProducts && (
          <Explore
            header={coll1?.collection_name}
            products={firstProducts?.data}
          />
        )}

        {coll2 && secondProducts && (
          <Explore
            header={coll2?.collection_name}
            products={secondProducts?.data}
          />
        )}
      </div>
    </div>
  );
}
