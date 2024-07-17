'use client';

import { useEffect, useRef } from 'react';
import { Icons } from '@fsm/ui';
import Image from 'next/image';
import clsx from 'clsx';

import EventHighlights from './(components)/eventHighlights';
import { useLayout } from '../../../../hooks';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();

  //ref
  const videoRef = useRef<HTMLVideoElement>(null);

  //effect
  useEffect(() => {
    const banner = {
      title: 'About Us',
      top_tagline: '',
      imageSrc: '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  return (
    <div
      className={clsx(
        'flex flex-col gap-20 items-center',
        'max-w-[1024px] mx-auto'
      )}
    >
      <div className="flex gap-10">
        <div className="hidden sm:block">
          <Image
            src={'/assets/logo.jpg'}
            className="min-w-[200px] min-h-[200px]"
            height={200}
            width={200}
            alt="logo"
          />
        </div>
        <div
          className={clsx('bg-gray-20 w-[1px] h-[200px]', 'hidden sm:block')}
        />
        <div className=" text-center space-y-4">
          <div className={clsx('font-semibold text-4xl', 'hidden sm:block')}>
            Forever Sole Mates
          </div>
          <div className="text-justify">
            Since its inception in November 2022, Forever Sole Mates has placed
            customers at the heart of everything we do. Our commitment to
            exceeding expectations is reflected in our meticulous craftsmanship
            and the use of premium materials. From our carefully designed
            slippers to our comprehensive foot care products, we ensure that
            each item not only meets but anticipates the needs of our customers.
            At Forever Sole Mates, we don`t just sell footwear; we provide a
            solution that combines style, comfort, and the well-being of your
            feet, because we believe every step should feel exceptional.
          </div>
        </div>
      </div>

      {/* Divider */}
      <Icons.Line />

      <div className="flex gap-10">
        <div className={clsx(' text-center', 'space-y-6 sm:space-y-4')}>
          <div className="font-semibold text-4xl">Meet our SheEO ✨</div>
          <div className={clsx('sm:hidden', 'flex justify-center')}>
            <Image
              src={'/assets/about-us/fsm-ceo.png'}
              className="rounded-lg min-w-[200px] min-h-[250px]"
              height={250}
              width={200}
              alt="profile"
            />
          </div>
          <div className="text-justify">
            Denise Nana Konadu Derkyi is a Business Administration graduate of
            Ashesi University and an inspiration to our entire team. With a
            passion for footwear and inspiration from her father`s involvement
            in designing slippers, Denise embarked on her entrepreneurial
            journey. She is a jack of all trades but undoubtedly has been able
            to master everything she sets her mind to do.
          </div>
        </div>
        <div
          className={clsx('hidden sm:block', 'bg-gray-20 w-[1px] h-[200px]')}
        />
        <div className={clsx('hidden sm:block')}>
          <Image
            src={'/assets/about-us/fsm-ceo.png'}
            className="rounded-lg min-w-[200px] min-h-[250px]"
            height={250}
            width={200}
            alt="denise"
          />
        </div>
      </div>

      <EventHighlights />
    </div>
  );
}
