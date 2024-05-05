import clsx from 'clsx';
import Image from 'next/image';
import AllCollections from './AllCollections';
import styled from 'styled-components';
import { HTMLAttributes } from 'react';
import LoadingCard from './LoadingCard';

interface Props extends HTMLAttributes<HTMLDivElement> {
  topTagline?: string;
  bottomTagline?: string;
  bannerImage?: string;
  collectionName: string;
  actions: React.ReactNode;
}

function CollectionCard({
  topTagline,
  actions,
  collectionName,
  bannerImage,
  bottomTagline,
}: Props) {
  return (
    <div
      className={clsx(
        'bg-[#F0F0F0] h-[255px]',
        'w-[550px] rounded-md',
        'px-8 py-6',
        'flex gap-6 items-center',
        !bannerImage ? 'justify-center text-center' : ' justify-between'
      )}
    >
      <div>
        <div className="text-gray-50 font-semibold">{topTagline}</div>
        <div className="font-bold text-3xl">{collectionName}</div>
        <div className="my-6 text-sm font-medium text-gray-40">
          {bottomTagline}
        </div>
        <div className={clsx(!bannerImage ? 'flex justify-center' : '')}>
          {actions}
        </div>
      </div>
      {bannerImage ? (
        <div>
          <Image
            unoptimized
            className="object-contain"
            width={200}
            height={200}
            alt="banner_image"
            src={bannerImage}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Object.assign(CollectionCard, { AllCollections, LoadingCard });
