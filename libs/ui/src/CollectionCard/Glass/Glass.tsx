import clsx from 'clsx';
import Image from 'next/image';
import { Props } from '../CollectionCard';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

export default function GlassCollectionCard({
  onClick,
  topTagline,
  bottomTagline,
  bannerImage = '',
  collectionName,
  href,
}: Props & { href: string }) {
  return (
    <Link className="block" href={href}>
      <div
        onClick={onClick}
        className={clsx(
          'relative w-[275px] h-[335px]',
          ' rounded-xl overflow-hidden ',
          'flex items-end px-3 py-2',
          'cursor-pointer',
          'bg-[#F0F0F0]',
          'border border-gray-5 shadow-md'
        )}
      >
        <Image
          unoptimized
          className={clsx(
            'absolute top-0 left-0 ',
            'w-full h-full object-cover rounded-xl'
          )}
          src={bannerImage}
          alt="image"
          width={275}
          height={335}
        />

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(6px)',
          }}
          className={clsx(
            'flex items-center justify-between gap-5 rounded-xl px-3 py-5',
            'w-full'
          )}
        >
          <div className="text-white flex-grow">
            <div className="text-2xl font-medium line-clamp-2">
              {collectionName}
            </div>
            <div className="max-w-[125px] truncate">{bottomTagline}</div>
          </div>
          <div className="p-2 bg-gray-20 rounded-full w-fit h-fit">
            <ArrowRightIcon />
          </div>
        </div>
      </div>
    </Link>
  );
}
