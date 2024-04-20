'use client';

import { Button, CollectionCard } from '@fsm/ui';
import { SectionHeader } from '../../../../components';
import useSWR from 'swr';
import queryString from 'query-string';
import { CollectionModel, PaginatedData } from '../../../../models';

export default function Page() {
  const { data } = useSWR<PaginatedData<CollectionModel>>(
    `/secure/collections?${queryString.stringify({
      page: 1,
      size: 10,
    })}`
  );

  const collections = data?.data || [];

  return (
    <div className="space-y-6">
      <SectionHeader
        header="Inventory"
        actions={
          <>
            <Button
              variant="outline-secondary"
              className="flex gap-2"
              icon="plus"
            >
              <span>Add Collection</span>
            </Button>
          </>
        }
      />

      {/* Collection Cards */}
      <div className="flex gap-10 flex-wrap">
        {collections.length ? (
          <>
            <CollectionCard.AllCollections />

            {collections.map((item, key) => (
              <CollectionCard
                topTagline={item.top_tagline}
                bottomTagline={item.bottom_tagline}
                bannerImage={item.banner_image}
                collectionName={item.collection_name}
                actions={
                  <>
                    <Button className="rounded-md">View</Button>
                  </>
                }
              />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
