import clsx from 'clsx';
import Animated from '../Animated/Animated';
import Image from 'next/image';
import { AnimatePresence } from 'framer-motion';

interface Props {
  title: string;
  top_tagline: string;
  imageSrc?: string;
  patternBaseUrl?: string;
}

export default function Banner({
  imageSrc,
  title,
  top_tagline,
  patternBaseUrl,
}: Props) {
  return (
    <div className="relative">
      <AnimatePresence>
        <div
          className={clsx(
            'bg-[#1e1e1e]',
            // 'bg-gray-5',
            'py-14',
            imageSrc ? 'sm:py-6' : '',
            'flex justify-center items-center gap-6'
          )}
        >
          <Animated.FadeIn
            key={title}
            className={clsx(
              'space-y-2 text-center text-gray-5',
              imageSrc ? ' sm:text-left' : ' '
            )}
          >
            <div className="text-sm text-gray-20 font-medium">
              {top_tagline}
            </div>
            <div className="text-3xl font-semibold">{title}</div>
          </Animated.FadeIn>
          {imageSrc && (
            <Animated.FadeIn key={imageSrc} className="hidden sm:block">
              <img src={imageSrc} className="w-[200px] h-[200px]" />
            </Animated.FadeIn>
          )}
        </div>
      </AnimatePresence>

      {/* Abstract Patters */}
      {patternBaseUrl && (
        <div>
          <Animated.FadeIn key={patternBaseUrl}>
            <Image
              src={`${patternBaseUrl}/abstract-1.svg`}
              className={clsx(
                `absolute  bottom-0 right-0`,
                'lg:w-[120px] lg:h-[120px]',
                'hidden lg:block'
              )}
              alt={`ab-1`}
              width={120}
              height={120}
            />

            <Image
              src={`${patternBaseUrl}/abstract-1.svg`}
              className={clsx(
                `absolute  top-0 left-0`,
                'lg:w-[120px] lg:h-[120px]',
                'hidden lg:block'
              )}
              alt={`ab-3`}
              width={120}
              height={120}
            />
          </Animated.FadeIn>
        </div>
      )}
    </div>
  );
}
