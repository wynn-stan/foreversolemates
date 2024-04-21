'use client';

import { Button, CollectionCard, Dropdown } from '@fsm/ui';
import { LocalCollectionCard, SectionHeader } from '../../../../components';
import useSWR from 'swr';
import queryString from 'query-string';
import { CollectionModel, PaginatedData } from '../../../../models';
import { ChevronDownIcon } from 'lucide-react';
import Add from './(components)/Add';
import { useState } from 'react';
import Delete from './(components)/Delete';
import Update from './(components)/Update';

export default function Page() {
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

  return (
    <>
      <div className="space-y-6">
        <SectionHeader
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
        />

        {/* Collection Cards */}
        <div className="flex gap-10 flex-wrap">
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
                actions={
                  <>
                    <Button className="rounded-md">View</Button>
                  </>
                }
              />

              {collections.map((item, key) => (
                <LocalCollectionCard
                  topTagline={item.top_tagline}
                  bottomTagline={item.bottom_tagline}
                  bannerImage={item.banner_image}
                  collectionName={item.collection_name}
                  actions={
                    <div className="flex gap-4">
                      <Button className="rounded-md">View</Button>
                      <Dropdown>
                        <Dropdown.Toggle>
                          <Button
                            variant="outline-tertiary"
                            className="rounded-md flex gap-1"
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
