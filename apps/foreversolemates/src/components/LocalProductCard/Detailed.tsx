import Image from 'next/image';
import { ProductModel } from '../../models';
import { Button, Dropdown, ProductCard } from '@fsm/ui';
import { ChevronDown, EyeIcon } from 'lucide-react';
import { useWidth } from '@foreversolemates/utils';
import styled from 'styled-components';
import clsx from 'clsx';

interface Props {
  details: ProductModel;
}

export default function Detailed({ details }: Props) {
  return (
    <div className="flex gap-4">
      <div
        className={clsx(
          'bg-gray-10 cursor-pointer ',
          'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]'
        )}
      >
        <Image
          unoptimized
          className={clsx(
            'object-cover',
            'w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]'
          )}
          src={details.images[0]}
          alt="product_image"
          width={150}
          height={150}
        />
      </div>
      <div className="space-y-3 max-w-[420px] w-full 2xl:w-[420px]">
        <ProductCard.Details.StockIndicator
          available_units={details.available_units}
          low_stock_indicator={details.alert}
        />

        <div>
          <div className={clsx('font-medium truncate ', 'text-lg lg:text-xl')}>
            {details.product_name}
          </div>

          <ProductCard.Details.Price
            initial_price={details.initial_price}
            discount={details.discount}
          />
        </div>

        <ProductCard.Details.Description
          withHeader={false}
          description={details.description}
        />

        {/* Actions */}
        <div className={clsx('flex gap-4 flex-wrap')}>
          <Button
            icon="cart"
            onClick={() => {
              //
            }}
            className={clsx(
              'flex gap-2 !rounded-md',
              'py-2 px-2 text-sm',
              'lg:py-3 lg:px-2 lg:text-base',
              'hover-btn'
            )}
            variant="outline-black"
          >
            <span>Add to cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
