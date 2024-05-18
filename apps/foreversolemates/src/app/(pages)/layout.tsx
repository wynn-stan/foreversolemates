'use client';

import { Collection } from '@fsm/ui';

import { options, useLayout } from '../../hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  //hooks
  const { layout } = useLayout();

  return (
    <div>
      {layout?.banner?.title && (
        <Collection.Banner
          patternBaseUrl="/assets/images/homepage"
          {...layout.banner}
        />
      )}
      <div>{children}</div>
    </div>
  );
}
