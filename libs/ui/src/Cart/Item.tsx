'use client';

import {
  AlertCircleIcon,
  FootprintsIcon,
  ShoppingBagIcon,
  TrashIcon,
} from 'lucide-react';
import { FieldNumberProps } from '../Field/Number/Number';
import clsx from 'clsx';
import { Formik } from 'formik';
import Field from '../Field/Field';
import Image from 'next/image';
import { helpers } from '@foreversolemates/utils';

interface Props {
  type: 'delete' | 'quantity';
  quantity?: number;
  readonly?: boolean;
  // size: 'sm' | 'lg';
  message?: string;

  quantityProps?: FieldNumberProps;
  maxQuantity?: number;

  productDetails: {
    imgSrc: string;
    product_name: string;
    size?: string | number;
    description: string;
    final_price: number;
  };

  onDelete?: () => void;
  onQuantityUpdate?: (quantity: number) => void;
}

export default function Item({
  type,
  quantity,
  readonly,
  // size,
  message,
  productDetails,
  maxQuantity,
  onDelete,
  onQuantityUpdate,
}: Props) {
  /**
   * Variables
   */

  const showShoppingBag = Boolean(quantity) && type === 'delete';
  return (
    <div className="space-y-3">
      {Boolean(message) && (
        <div
          className={clsx(
            'bg-red-5 text-red-60',
            'p-3 rounded-xl text-sm font-medium',
            'flex gap-2 items-center '
          )}
        >
          <div className="">
            <AlertCircleIcon size={16} />
          </div>
          <div>{message}</div>
        </div>
      )}
      <div
        className={clsx(
          'flex justify-between',
          'gap-5 sm:gap-8',
          'max-h-[100px]'
        )}
      >
        {/* Image and Content */}
        <div className={clsx('flex flex-grow', 'gap-3 sm:gap-4')}>
          {/* Image */}
          <div className="min-w-[100px]">
            <Image
              unoptimized
              alt="product"
              className="rounded-xl object-cover object-center w-[100px] h-[100px]"
              src={productDetails.imgSrc}
              width={100}
              height={100}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between w-full">
            <div className="space-y-2 w-full">
              {/* Header */}
              <div className="flex gap-3 items-center">
                <div className="flex flex-col gap-1">
                  <div className="max-w-[160px] truncate text-sm sm:text-base">
                    {productDetails.product_name}
                  </div>
                  <div className="sm:hidden flex gap-3">
                    {Boolean(productDetails.size) && (
                      <ProductSizeChip size={productDetails.size} />
                    )}
                    <div className="font-medium text-xl tracking-tighter">
                      {helpers.currencyFormatter(productDetails.final_price)}
                    </div>
                  </div>
                </div>

                {Boolean(productDetails.size) && (
                  <div className="hidden sm:flex gap-3 items-center">
                    <div className="w-[7px] h-[7px] bg-gray-30 rounded-full" />
                    <ProductSizeChip size={productDetails.size} />
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-gray-5" />

              {/* Description */}
              <div
                className={clsx(
                  'max-w-[150px] sm:max-w-[300px] truncate text-xs text-gray-50',
                  `${showShoppingBag ? 'hidden sm:block' : ''}`
                )}
              >
                {productDetails.description}
              </div>
            </div>

            {/* Bottom */}
            <div className="flex gap-2 items-center">
              {showShoppingBag && (
                <div
                  className={clsx(
                    'px-2 sm:py-1 ',
                    'rounded-lg border border-gray-10',
                    'flex gap-1 items-center justify-center w-fit'
                  )}
                >
                  <span>
                    <ShoppingBagIcon size={16} strokeWidth={1} />
                  </span>
                  <div>{`x ${quantity}`}</div>
                </div>
              )}
              <div className="hidden sm:block font-medium text-2xl tracking-tigher">
                {helpers.currencyFormatter(productDetails.final_price)}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div>
          {type === 'delete' && (
            <button
              onClick={onDelete}
              className={clsx(
                'bg-red-40 text-white',
                'h-full w-[48px]',
                'flex justify-center items-center',
                'rounded-r-xl'
              )}
            >
              <div>
                <TrashIcon size={24} />
              </div>
            </button>
          )}
          {type === 'quantity' && (
            <Formik
              initialValues={{ quantity: quantity || 0 }}
              onSubmit={() => {
                //
              }}
            >
              {({ setFieldValue, values }) => (
                <Field.Number
                  max={maxQuantity}
                  value={values.quantity}
                  name="quantity"
                  setFieldValue={(field, value, shouldValidate) => {
                    setFieldValue(field, value, shouldValidate);
                    onQuantityUpdate?.(value);
                  }}
                />
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductSizeChip({ size }: { size: any }) {
  return (
    <div
      className={clsx(
        'flex gap-1 items-center justify-center',
        'px-2 py-1',
        'w-fit h-fit rounded-full',
        ' bg-black text-white text-xs sm:text-sm'
      )}
    >
      <span>
        <FootprintsIcon strokeWidth={1.5} size={16} />{' '}
      </span>
      <div>{size}</div>
    </div>
  );
}
