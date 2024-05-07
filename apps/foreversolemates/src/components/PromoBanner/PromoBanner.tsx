'use client';

import { useWidth } from '@foreversolemates/utils';
import { Button, SubmitWrapper } from '@fsm/ui';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import routes from '../../routes';

export default function PromoBanner() {
  //hooks
  const { width } = useWidth();
  const router = useRouter();

  //variables
  const imageSize = (() => {
    if (width > 1280) return 450;

    return 400;
  })();

  return (
    <div
      className={clsx(
        'w-full flex gap-4 justify-center items-center bg-gray-10 py-16 ',
        'px-4 sm:px-10 xl:px-auto'
      )}
    >
      <div className="max-w-[380px] space-y-12">
        <div className="space-y-12">
          <div className="font-bold text-6xl">
            FOREVER <br /> SOLEMATES
          </div>
          <div className="h-2 w-20 bg-black" />
        </div>
        <div className="">
          Handcrafted men's African footwear brand, balancing aesthetics, good
          design and most importantly, granting customers a perfect foot match
          made for life.
        </div>

        <SubmitWrapper>
          {({ setSubmitting, isSubmitting, Spinner }) => (
            <Button
              className="!gap-4"
              onClick={() => {
                setSubmitting(true);
                router.push(routes.shop.all.index);
              }}
            >
              Shop Now
              {isSubmitting ? <Spinner /> : <ArrowRight size={20} />}
            </Button>
          )}
        </SubmitWrapper>
      </div>
      <div className={`w-[${imageSize}px] h-[${imageSize}px] hidden md:block`}>
        <Image
          src="/assets/images/homepage/malik-2.png"
          className={`w-[${imageSize}px] h-[${imageSize}px]`}
          alt="malik"
          width={imageSize}
          height={imageSize}
        />
      </div>
    </div>
  );
}
