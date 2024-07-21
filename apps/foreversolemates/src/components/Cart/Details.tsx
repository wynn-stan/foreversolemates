'use client';

import { Button, ProductCard, ProductImage } from '@fsm/ui';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';

import { getPriceAndDiscount, getStockSummary } from '../../utils';
import { CartItem } from '../../models';
interface Props {
  cartItems: Partial<CartItem>[];
  onDelete: (index: string) => void;
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
          available_units: product?.total_available_units || 0,
          low_stock_indicator: product?.alert || 0,
        });

        const priceDetails = getPriceAndDiscount({
          discount: product?.discount || 0,
          initial_price: product?.initial_price || 0,
        });

        return (
          <AnimatePresence key={key}>
            <motion.div
              key={cartItems.length}
              exit={{
                opacity: 0,
                x: '-100vw',
              }}
              transition={{
                duration: 0.5,
              }}
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

                <div className="flex-grow md:flex justify-between p-4">
                  <div className="">
                    <div>{product?.product_name}</div>
                    <div className="flex items-center gap-2">
                      {/* <ProductCard.Details.Price
                    initial_price={product?.initial_price || 0}
                    discount={product?.discount || 0}
                    className="flex-col !gap-0"
                  />
                  <div className="h-[15px] bg-gray-20 w-[2px]" /> */}
                      <div className={clsx(stockDetails.colorClassName)}>
                        {stockDetails.message}
                      </div>
                    </div>
                    <div>
                      <div>
                        Size:{' '}
                        <span className="font-medium">
                          {product?.selected_size}
                        </span>
                      </div>
                      <div>
                        Color:{' '}
                        <span className="font-medium">
                          {product?.selected_color}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <div className="flex gap-2">
                      <ProductCard.Details.Price
                        initial_price={product?.initial_price || 0}
                        discount={product?.discount || 0}
                        className="flex-col !gap-0 !items-end"
                      />

                      <span>x</span>

                      <div className="font-medium">
                        {product.selected_quantity}
                      </div>
                    </div>

                    <Button
                      icon="trash"
                      variant="outline-alert"
                      className="text-red-10 hover:bg-red-40 hover:!text-white !w-fit"
                      onClick={() => {
                        product?._id && onDelete(product._id);
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
