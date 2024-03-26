'use client';

import styled from 'styled-components';
import {
  Footer,
  PromoBanner,
  RootNavigation,
  ShopByCategory,
  AdditionalServices,
} from '../components';

export default function Index() {
  return (
    <div className="h-full flex flex-col gap-20">
      <div className="flex-grow gap-6">
        <RootNavigation />
        <div className="mb-16 hidden md:block">
          <PromoBanner />
        </div>
        <div className="flex flex-col gap-16 items-center">
          <ShopByCategory />
          {/* <AdditionalServices /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
