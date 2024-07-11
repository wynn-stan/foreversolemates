import clsx from 'clsx';
import Image from 'next/image';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, boxShadow: 'none' }}
      animate={{ opacity: 1 }}
      whileHover={{
        boxShadow:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }}
      onClick={onCardClick}
      className={clsx(
        'border-[1px] border-gray-10',
        'w-full max-w-[550px] rounded-xl',
        'text-center md:text-left',
        'py-5 px-5 sm:pr-3 sm:pl-6 sm:py-3',
        'flex gap-6 items-center',
        'justify-between',
        onCardClick ? 'cursor-pointer' : ''
      )}
    >
      <div className="space-y-10 w-full">
        <div>
          <div className="font-bold text-3xl">{collectionName}</div>
          <div
            className={clsx(
              'text-gray-50 font-semibold',
              ' w-full md:max-w-[250px]'
            )}
          >
            {topTagline}
          </div>
        </div>
        {/* <div className="my-6 text-sm font-medium text-gray-40">
          {bottomTagline}
        </div> */}
        <div
          className="flex justify-center md:block"
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
            className="w-[200px] h-[250px] 2xl:w-[200px] 2xl:h-[200px] object-cover rounded-xl"
            width={200}
            height={250}
            alt="banner_image"
            src={bannerImage}
          />
        </div>
      ) : (
        ''
      )}
    </motion.div>
  );
}

const StyledImage = styled.div`
  @media (min-width: 1340px) {
    display: block;
  }
`;
