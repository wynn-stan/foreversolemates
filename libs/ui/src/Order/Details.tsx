'use client';

import { Button, ProductCard, ProductImage } from '../index';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';

import { CartItem } from '../models';
import {
  currencyFormatter,
  getPriceAndDiscount,
  getStockSummary,
} from '../Utils';

interface Props {
  cartItems: Partial<CartItem>[];
  onDelete: (key: number) => void;
}

export default function Details({ cartItems, onDelete }: Props) {
  return (
    <div className="max-w-[550px] w-full space-y-6">
      <div className="text-lg font-medium">{`Cart - ${cartItems.length} Item(s)`}</div>

      {/* Horizontal Rule */}
      <div className="w-full bg-gray-5 h-[1px]" />

      {cartItems?.map((product, key) => {
        //variables
        const stockDetails = getStockSummary({
          available_units: product?.available_units || 0,
          low_stock_indicator: product?.alert || 0,
        });

        return (
          <AnimatePresence key={key}>
            <motion.div
              key={cartItems.length}
              // exit={{
              //   opacity: 0,
              //   x: '-100vw',
              // }}
              // transition={{
              //   duration: 0.5,
              // }}
              className="space-y-6"
            >
              <div className="flex">
                <div
                  className={clsx(
                    'bg-gray-10 ',
                    'w-[150px] h-[150px]',
                    'overflow-hidden'
                  )}
                >
                  <Image
                    unoptimized
                    className={clsx(
                      'object-cover object-center',
                      'w-full h-full'
                    )}
                    src={product?.images?.[0] || ''}
                    alt="product_image"
                    width={150}
                    height={150}
                  />
                </div>

                <div
                  className={clsx(
                    'flex flex-col lg:flex-row flex-grow justify-between p-4 gap-2'
                  )}
                >
                  <div className="">
                    <div>{product?.product_name}</div>
                    <div className="flex items-center gap-2">
                      <div className={clsx(stockDetails.colorClassName)}>
                        {stockDetails.message}
                      </div>
                    </div>
                    <div>
                      {product?.selected_size && (
                        <div>
                          Size:{' '}
                          <span className="font-medium">
                            {product?.selected_size}
                          </span>
                        </div>
                      )}
                      {product?.selected_color && (
                        <div>
                          Color:{' '}
                          <span className="font-medium">
                            {product?.selected_color}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col justify-between lg:items-end">
                    <div className="flex items-center gap-2">
                      <div
                        className={clsx(
                          'flex flex-col items-end tracking-tight'
                        )}
                      >
                        <div className="lg:text-lg font-medium ">
                          {currencyFormatter(product?.final_price || 0)}
                        </div>
                        {product?.discount ? (
                          <div className="text-sm text-gray-30 line-through">
                            {currencyFormatter(product?.initial_price || 0)}
                          </div>
                        ) : (
                          ''
                        )}
                      </div>

                      <span>x</span>

                      <div className="font-medium">
                        {product.selected_quantity}
                      </div>
                    </div>

                    <Button
                      icon="trash"
                      variant="outline-alert"
                      className={clsx(
                        'text-red-10 hover:bg-red-40 hover:!text-white',
                        '!w-full lg:!w-fit'
                      )}
                      onClick={() => {
                        product?._id && onDelete(key);
                      }}
                    >
                      {/* Delete */}
                    </Button>
                  </div>
                </div>
              </div>
              {/* Horizontal Rule */}
              <div className="w-full bg-gray-5 h-[1px]" />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}
