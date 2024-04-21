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
}

export default function LocalCollectionCard({
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
        'flex-grow  xl:max-w-[550px] rounded-md',
        'px-8 py-6',
        'flex gap-6 items-center',
        'justify-center text-center xl:justify-between xl:text-left'
      )}
    >
      <div>
        <div className="text-gray-50 font-semibold">{topTagline}</div>
        <div className="font-bold text-3xl">{collectionName}</div>
        <div className="my-6 text-sm font-medium text-gray-40">
          {bottomTagline}
        </div>
        <div className="flex justify-center xl:block">{actions}</div>
      </div>
      {bannerImage ? (
        <StyledImage className="hidden">
          <Image
            unoptimized
            className="w-[150px] h-[150px] 2xl:w-[200px] 2xl:h-[200px] object-contain"
            width={150}
            height={150}
            alt="banner_image"
            src={bannerImage}
          />
        </StyledImage>
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
