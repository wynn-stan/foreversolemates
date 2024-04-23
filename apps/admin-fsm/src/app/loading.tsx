'use client';

import { Spinner } from '@fsm/ui';

export default function Loading() {
  return (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
}
