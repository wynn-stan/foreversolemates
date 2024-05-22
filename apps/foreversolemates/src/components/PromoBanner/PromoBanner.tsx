'use client';

import { useWidth } from '@foreversolemates/utils';
import { Animated, Button, SubmitWrapper } from '@fsm/ui';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import routes from '../../routes';
import { motion } from 'framer-motion';
import { fadeInFromBelowVariants, fadeInVariants } from '../../utils';

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
    <div className="relative">
      {/* Abstract Patters */}
      <div>
        {Array.from({ length: 4 }, (_, index) => {
          //variables - positions
          const positions = [
            'bottom-0 right-0 ',
            'top-0 left-0',
            ' bottom-0 left-0',
            'top-0 right-0',
          ];

          return (
            <Animated.FadeIn key={index}>
              <Image
                src={`/assets/images/homepage/abstract-${index + 1}.svg`}
                className={clsx(
                  'lg:w-[120px] lg:h-[120px]',
                  'hidden lg:block',
                  `absolute ${positions[index]}`
                )}
                alt={`ab-${index}`}
                width={120}
                height={120}
              />
            </Animated.FadeIn>
          );
        })}
      </div>

      <div
        className={clsx(
          'w-full flex gap-4 justify-center items-center bg-[#1e1e1e] py-16 ',
          'px-4 sm:px-10 xl:px-auto'
        )}
      >
        <motion.div
          variants={fadeInFromBelowVariants}
          animate="visible"
          initial="hidden"
          className="max-w-[380px] space-y-12 text-gray-5"
        >
          <div className="space-y-12">
            <div className="font-bold text-6xl">
              FOREVER <br /> SOLEMATES
            </div>
            <div className="h-2 w-20 bg-white" />
          </div>
          <div className="text-gray-20 font-medium">
            Handcrafted men`s African footwear brand, balancing aesthetics, good
            design and most importantly, granting customers a perfect foot match
            made for life.
          </div>

          <SubmitWrapper>
            {({ setSubmitting, isSubmitting, Spinner }) => (
              <Button
                className="!gap-4 border border-gray-40"
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
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          animate="visible"
          initial="hidden"
          transition={{ duration: 0.5 }}
          className={`w-[${imageSize}px] h-[${imageSize}px] hidden md:block`}
        >
          <Image
            src="/assets/images/homepage/malik-2.png"
            className={`w-[${imageSize}px] h-[${imageSize}px]`}
            alt="malik"
            width={imageSize}
            height={imageSize}
          />
        </motion.div>
      </div>
    </div>
  );
}
