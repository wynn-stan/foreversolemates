import clsx from 'clsx';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends HTMLAttributes<HTMLDivElement> {
  topTagline?: string;
  bottomTagline?: string;
  bannerImage?: string;
  collectionName: string;
  actions: React.ReactNode;
  onCardClick?: () => void;
}

export default function LocalCollectionCard({
  topTagline,
  actions,
  collectionName,
  bannerImage,
  bottomTagline,
  onCardClick,
}: Props) {
  return (
    <div
      onClick={onCardClick}
      className={clsx(
        ' border-[2px] border-[#f8f8f8] h-[255px]',
        'flex-grow  2xl:max-w-[550px] rounded-md',
        'px-8 py-6',
        'flex gap-6 items-center',
        'justify-center text-center 2xl:justify-between 2xl:text-left',
        onCardClick ? 'cursor-pointer' : ''
      )}
    >
      <div>
        <div className="text-gray-50 font-semibold">{topTagline}</div>
        <div className="font-bold text-3xl">{collectionName}</div>
        <div className="my-6 text-sm font-medium text-gray-40">
          {bottomTagline}
        </div>
        <div
          className="flex justify-center xl:block"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {actions}
        </div>
      </div>
      {bannerImage ? (
        <div className="hidden md:block">
          <Image
            unoptimized
            className="w-[150px] h-[150px] 2xl:w-[200px] 2xl:h-[200px] object-contain"
            width={150}
            height={150}
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

const StyledImage = styled.div`
  @media (min-width: 1340px) {
    display: block;
  }
`;
