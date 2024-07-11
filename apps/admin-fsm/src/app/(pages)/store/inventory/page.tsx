'use client';

import { Button, CollectionCard, Dropdown } from '@fsm/ui';
import { ChevronDownIcon } from 'lucide-react';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { motion } from 'framer-motion';

import { LocalCollectionCard, SectionHeader } from '../../../../components';
import { CollectionModel, PaginatedData } from '../../../../models';
import { useLayout } from '../../../../hooks';
import Delete from './(components)/Delete';
import Update from './(components)/Update';
import routes from '../../../../routes';
import Add from './(components)/Add';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function Page() {
  //hooks
  const { setLayout } = useLayout();
  const router = useRouter();

  //state
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<CollectionModel>();

  //api
  const { data, isLoading, mutate } = useSWR<PaginatedData<CollectionModel>>(
    `/secure/collections?${queryString.stringify({
      page: 1,
      size: 10,
    })}`
  );

  //variables
  const collections = data?.data || [];

  //effect
  useEffect(() => {
    setLayout({
      menuText: 'Inventory',
    });
  }, []);

  return (
    <>
      <div className="space-y-6">
        <SectionHeader.WithLine
          title="Collections"
          actions={
            <>
              <Button
                variant="outline-secondary"
                className="flex gap-2"
                icon="plus"
                direction="left"
                onClick={() => setShowAdd(true)}
              >
                <span>Add</span>
              </Button>
            </>
          }
        />
        {/* <SectionHeader
          header="Inventory"
          actions={
            <>
              <Button
                variant="outline-secondary"
                className="flex gap-2"
                icon="plus"
                onClick={() => setShowAdd(true)}
              >
                <span>Add Collection</span>
              </Button>
            </>
          }
        /> */}

        {/* Collection Cards */}
        <div className="flex justify-center">
          <div
            className={clsx(
              'grid grid-cols-1 2xl:grid-cols-[550px_550px] w-fit gap-10 justify-items-center'
            )}
          >
            {/* Loading state */}
            {isLoading && (
              <>
                {Array.from({ length: 3 }, (_, i) => (
                  <CollectionCard.LoadingCard key={i} />
                ))}
              </>
            )}

            {collections.length ? (
              <>
                <LocalCollectionCard
                  topTagline={'Ease and elegance for your feet'}
                  bottomTagline={'Delve into our curated collections'}
                  bannerImage={'/assets/all-collections.png'}
                  collectionName={'All Products'}
                  onCardClick={() => {
                    router.push(routes.store.inventory.all.index);
                  }}
                  actions={
                    <div className="">
                      <Link href={routes.store.inventory.all.index}>
                        <Button className="!rounded-md">View</Button>
                      </Link>
                    </div>
                  }
                />

                {collections.map((item, key) => (
                  <LocalCollectionCard
                    key={key}
                    topTagline={item.top_tagline}
                    bottomTagline={item.bottom_tagline}
                    bannerImage={item.banner_image}
                    collectionName={item.collection_name}
                    onCardClick={() =>
                      router.push(
                        routes.store.inventory.collection.index.replace(
                          '[id]',
                          item._id
                        )
                      )
                    }
                    actions={
                      <div className="flex gap-2">
                        <Link
                          href={routes.store.inventory.collection.index.replace(
                            '[id]',
                            item._id
                          )}
                        >
                          <Button className="!rounded-md">View</Button>
                        </Link>{' '}
                        <Dropdown>
                          <Dropdown.Toggle>
                            <Button
                              variant="outline-tertiary"
                              className="!rounded-md flex gap-1"
                            >
                              <span>More</span>
                              <ChevronDownIcon size={20} />
                            </Button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedCollection(item);
                                setShowEdit(true);
                              }}
                            >
                              Update collection
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => {
                                setSelectedCollection(item);
                                setShowRemove(true);
                              }}
                              className="text-red-40"
                            >
                              Remove collection
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    }
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* Add Collection Modal */}
      <Add mutate={mutate} show={showAdd} onHide={() => setShowAdd(false)} />

      {/* Delete Collection Modal */}
      {selectedCollection?._id && (
        <Delete
          details={selectedCollection}
          mutate={mutate}
          show={showRemove}
          onHide={() => setShowRemove(false)}
        />
      )}

      {/* Update Collection Modal */}
      {selectedCollection?._id && showEdit && (
        <Update
          details={selectedCollection}
          mutate={mutate}
          show={showEdit}
          onHide={() => setShowEdit(false)}
        />
      )}
    </>
  );
}
