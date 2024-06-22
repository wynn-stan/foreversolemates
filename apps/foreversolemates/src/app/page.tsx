'use client';

import { Collection, LocalProductCard, PromoBanner } from '../components';
import { Modal as RestartModal } from '@restart/ui';
import { Button, CollectionCard, Modal } from '@fsm/ui';
import Explore from './(components)/Explore';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { CollectionModel, PaginatedData, ProductModel } from '../models';
import { options, useFilters } from '../hooks';
import Link from 'next/link';
import routes from '../routes';
import clsx from 'clsx';
import axios from 'axios';
import queryString from 'query-string';
import { http } from '@foreversolemates/utils';
import Image from 'next/image';
import { ArrowRightIcon, MoveRightIcon } from 'lucide-react';
import Header from './(components)/Explore/Header';
import styled from 'styled-components';

interface CollectionsData extends CollectionModel {
  products: ProductModel[];
}

export default function Index() {
  //api
  const {
    api: { apiCollections, isLoading: collectionsLoading },
  } = options.useGetCollections();

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<ProductModel>>(
    `/products?${queryString.stringify({
      page: 1,
      size: 6,
    })}`
  );

  //variables
  const products = data?.data || [];

  return (
    <div className="space-y-6">
      <PromoBanner />
      <div>
        <Header title="Explore Our Collections" />
        <div className="px-4 overflow-hidden flex justify-center">
          <div
            className={clsx(
              'py-2',
              'flex overflow-y-auto gap-4 no-scrollbar'
              // 'max-w-7xl'
            )}
          >
            <CollectionCard.GlassCollectionCard
              topTagline={'Ease and elegance for your feet'}
              bottomTagline={'Delve into our curated collections'}
              bannerImage={'/assets/images/homepage/all-collections-prod.png'}
              collectionName={'All Products'}
              href={routes.shop.all.index}
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

            {collectionsLoading
              ? Array.from({ length: 3 }, (_, index) => (
                  <CollectionCard.LoadingGlassCollectionCard key={index} />
                ))
              : ''}

            {apiCollections.map((item, key) => (
              <CollectionCard.GlassCollectionCard
                key={key}
                topTagline={item.top_tagline}
                href={routes.shop.collection.index.replace('[id]', item._id)}
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
            ))}
          </div>
        </div>
      </div>

      <div>
        <Header title="Browse Our Products" />
        <div className=" ">
          <div
            className={clsx(
              'grid grid-cols-[min-content_min-content] xl:grid-cols-[min-content_min-content_min-content]',
              'justify-center gap-4 flex-wrap '
            )}
          >
            {/* loading */}
            {isLoading &&
              Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="w-[150px] lg:w-[250px] h-[300px] lg:h-[388px]  bg-gray-20 animate-pulse"
                ></div>
              ))}

            {!isLoading && products?.length ? (
              products.map((item, key) => (
                <StyledCard key={key}>
                  <LocalProductCard.Compact details={item} />
                </StyledCard>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledCard = styled.div`
  &:hover .hover-btn {
    background: #262626;
    color: white;
  }
`;
