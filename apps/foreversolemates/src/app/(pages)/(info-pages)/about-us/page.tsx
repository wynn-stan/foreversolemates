'use client';

import { useEffect, useRef } from 'react';

import { useLayout } from '../../../../hooks';
import Image from 'next/image';
import { Icons } from '@fsm/ui';
import clsx from 'clsx';

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
    <div className="flex flex-col gap-20 items-center">
      <div className="flex gap-10">
        <div className="hidden sm:block">
          <Image src={'/assets/logo.jpg'} height={200} width={200} alt="logo" />
        </div>
        <div
          className={clsx('bg-gray-20 w-[1px] h-[200px]', 'hidden sm:block')}
        />
        <div className="max-w-[450px] text-center space-y-4">
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
        <div
          className={clsx(
            'max-w-[450px] text-center',
            'space-y-6 sm:space-y-4'
          )}
        >
          <div className="font-semibold text-4xl">Meet our SheEO ✨</div>
          <div className={clsx('sm:hidden', 'flex justify-center')}>
            <Image
              src={'/assets/about-us/fsm-ceo.png'}
              className="rounded-lg"
              height={250}
              width={200}
              alt="denise"
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
            className="rounded-lg"
            height={250}
            width={200}
            alt="denise"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="flex flex-col items-center gap-6">
        <div className="font-medium text-2xl">Event Highlights</div>
        <Icons.Line />
      </div>

      <div
        className={clsx(
          'rounded-2xl flex items-center gap-5 border border-gray-20 p-5',
          'flex flex-col-reverse',
          'sm:flex-row'
        )}
      >
        <div className="max-w-[500px]">
          <div className="text-3xl font-semibold">Foot Affair</div>
          <div className={clsx('hidden sm:block')}>
            Foot Affair was a blast! 💃🎉 We had an amazing time and it wouldn’t
            have been the same without each and every one of you! ❤ As we
            reminisce the fun moments in the incredible video, we can’t help but
            feel grateful for your support. 📸🎥 🚀❤️
            <br />
            Remember to tag us in your amazing photos and stories, and spread
            the word about our fabulous products and services.
          </div>
        </div>
        <div className="">
          <video
            ref={videoRef}
            onClick={() => {
              if (videoRef.current) {
                if (videoRef.current.paused) {
                  videoRef.current.play();
                } else {
                  videoRef.current.pause();
                }
              }
            }}
            className={clsx(
              'rounded-xl cursor-pointer',
              'w-[300px] h-[530px] sm:w-[170px] sm:h-[200px]'
            )}
            width={170}
            height={200}
          >
            <source src="/assets/about-us/foot-affair.mp4" type="video/mp4" />
            This browser does not support video tags.
          </video>
        </div>
      </div>
    </div>
  );
}
