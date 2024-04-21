'use client';

import { Button, Collection } from '@fsm/ui';

import { options } from '../../../../../../hooks';
import { ListFilterIcon } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function Page() {
  //hooks
  const { collections } = options.useGetCollections();

  return (
    <div className="space-y-8 w-full">
      <div className="flex gap-4">
        <Collection.SideModalToggle collections={collections} />
        <div className="font-medium text-4xl">All Products</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs">Showing 1 to 16 of 17 total</div>
        <Button variant="outline-secondary" icon="plus">
          Add Product
        </Button>
      </div>
    </div>
  );
}
