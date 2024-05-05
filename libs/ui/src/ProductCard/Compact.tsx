import Image from 'next/image';
import { Button, Dropdown } from '@fsm/ui';
import { ChevronDown, EyeIcon } from 'lucide-react';
import { helpers, useWidth } from '@foreversolemates/utils';
import styled from 'styled-components';
import clsx from 'clsx';

interface Props {
  details: {
    initial_price: number;
    discount: number;
    product_image: string;
    product_name: string;
  };
  onClick?: () => void;
  actions: React.ReactNode;
}

export default function Compact({ details, onClick, actions }: Props) {
  //variables
  const initial_price = details.initial_price;
  const discounted_price = details.discount
    ? initial_price - initial_price * (details.discount / 100)
    : details.initial_price;

  //hooks - mobile
  const width = useWidth();
  const isMobile = width ? width <= 1024 : undefined;

  return (
    <div
      onClick={onClick}
      className="space-y-4 max-w-[150px] lg:max-w-[250px] cursor-pointer"
    >
      <div
        className={clsx(
          'bg-gray-10 ',
          'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]'
        )}
      >
        <Image
          unoptimized
          className={clsx(
            'object-cover',
            'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]'
          )}
          src={details.product_image}
          alt="product_image"
          width={150}
          height={150}
        />
      </div>
      <div className="space-y-1">
        <div className={clsx('font-medium truncate ', 'text-lg lg:text-xl')}>
          {details.product_name}
        </div>

        <div
          className={clsx('flex gap-2 items-baseline', ' text-sm lg:text-base')}
        >
          {helpers.currencyFormatter(discounted_price)}

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
      <div onClick={(e) => e.stopPropagation()}>{actions}</div>
    </div>
  );
}
