import { CartItem } from '../../../models';
import Image from 'next/image';
import clsx from 'clsx';
import { ProductCard } from '@fsm/ui';

export default function List({ items }: { items: CartItem[] }) {
  return (
    <>
      {items.map((product, index) => {
        return (
          <div key={index} className="space-y-6">
            <div className="flex">
              <div
                className={clsx(
                  'bg-gray-10 ',
                  'w-[80px] h-[80px]',
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
                  width={80}
                  height={80}
                />
              </div>

              <div className="flex-grow md:flex justify-between px-2">
                <div className="">
                  <div className="truncate max-w-[100px]">
                    {product?.product_name}
                  </div>
                  <div>
                    <div>
                      Size:{' '}
                      <span className="font-medium">
                        {product?.selectedSize}
                      </span>
                    </div>
                    <div>
                      Color:{' '}
                      <span className="font-medium">
                        {product?.selectedColor}
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
                      {product.selectedQuantity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Horizontal Rule */}
            <div className="w-full bg-gray-5 h-[1px]" />
          </div>
        );
      })}
    </>
  );
}
