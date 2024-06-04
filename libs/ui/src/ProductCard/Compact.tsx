import Image from 'next/image';
import { Button, Dropdown } from '../index';
import { ChevronDown, EyeIcon } from 'lucide-react';
import { helpers, useWidth } from '@foreversolemates/utils';
import styled from 'styled-components';
import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

interface Props {
  details: {
    initial_price: number;
    discount: number;
    product_image: string;
    product_name: string;
    createdOn?: string;
  };
  onClick?: () => void;
  href?: string;
  actions: React.ReactNode;
}

export default function Compact({
  details,
  onClick,
  actions,
  href = '',
}: Props) {
  //variables
  const initial_price = details.initial_price;
  const discounted_price = details.discount
    ? initial_price - initial_price * (details.discount / 100)
    : details.initial_price;

  //hooks - mobile
  const { width } = useWidth();
  const isMobile = width ? width <= 1024 : undefined;

  //variables - component
  // const Component = href ? Link : 'div';

  //variables - item is new
  const isNew = dayjs().diff(details?.createdOn || '', 'day') > 2;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        type: 'spring',
      }}
      whileHover={{
        boxShadow:
          '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }}
      // href={href}
      onClick={onClick}
      className={clsx(
        'relative',
        'flex flex-col gap-2 cursor-pointer h-full',
        'border-[2px] border-gray-5 rounded-2xl p-3 '
      )}
    >
      <div
        className={clsx(
          'bg-gray-10 ',
          'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]',
          'overflow-hidden rounded-lg'
        )}
      >
        {details?.discount || isNew ? (
          <div
            className={clsx(
              'absolute top-2 left-2',
              'text-xs lg:text-sm font-medium'
            )}
          >
            {/* {isNew ? (
              <div
                className={clsx(
                  'mb-2 bg-white',
                  'px-4 py-2',
                  ' shadow-lg border border-gray-10  rounded-md'
                )}
              >
                New
              </div>
            ) : (
              ''
            )} */}

            {details?.discount ? (
              <div
                className={clsx(
                  'text-red-50 bg-white',
                  'px-4 py-2',
                  ' shadow-lg border border-gray-10  rounded-md'
                )}
              >
                {`${details.discount}% OFF`}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}

        <Image
          unoptimized
          className={clsx('object-cover object-center', 'w-full h-full ')}
          src={details.product_image}
          alt="product_image"
          width={150}
          height={150}
        />
      </div>
      <div className="space-y-0">
        <div
          className={clsx(
            'font-medium truncate max-w-[150px] lg:max-w-[250px] ',
            'text-lg lg:text-xl'
          )}
        >
          {details.product_name}
        </div>

        <div
          className={clsx(
            'flex flex-col xl:flex-row flex-wrap gap-2 items-baseline',
            ' text-sm lg:text-base'
          )}
        >
          <span className="font-medium">
            {helpers.currencyFormatter(discounted_price)}
          </span>

          {details.discount ? (
            <div
              className={clsx(
                'text-gray-30 line-through ',
                'text-xs lg:text-sm'
              )}
            >
              {helpers.currencyFormatter(initial_price)}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex-grow flex flex-col justify-end">
        <div onClick={(e) => e.stopPropagation()}>{actions}</div>
      </div>
    </motion.div>
  );
}
