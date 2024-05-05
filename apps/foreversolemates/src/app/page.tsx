'use client';

import { PromoBanner } from '../components';
import { Button, CollectionCard } from '@fsm/ui';
import Explore from './(components)/Explore';

export default function Index() {
  //api

  return (
    <div className="space-y-6">
      <PromoBanner />
      <div className="px-4 overflow-hidden flex justify-center">
        <div className="flex overflow-y-auto gap-4 no-scrollbar max-w-7xl">
          <div className="">
            <CollectionCard
              topTagline={'Ease and elegance for your feet'}
              bottomTagline={'Delve into our curated collections'}
              bannerImage={'/assets/all-collections.png'}
              collectionName={'All Products'}
              actions={
                <>
                  <Button icon="arrow-right" className="!gap-4">
                    Start shopping
                  </Button>
                </>
              }
            />
          </div>
          <div>
            <CollectionCard
              topTagline=""
              actions={<></>}
              collectionName=""
              bannerImage=""
              bottomTagline=""
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <Explore />
        <Explore />
      </div>
    </div>
  );
}
