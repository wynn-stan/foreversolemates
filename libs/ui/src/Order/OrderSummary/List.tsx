import Image from 'next/image';
import clsx from 'clsx';

import { ProductCard } from '../../index';
import { CartItem } from '../../models';
import { currencyFormatter } from '../../Utils';

export default function List({ items }: { items: CartItem[] }) {
  return (
    <>
      {items.map((product, index) => {
        return (
          <div key={index} className="">
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

              <div
                className={clsx(
                  'flex flex-col lg:flex-row flex-grow justify-between p-4 gap-2'
                )}
              >
                {' '}
                <div className="">
                  <div className="truncate max-w-[100px]">
                    {product?.product_name}
                  </div>
                  <div>
                    {product?.selected_size ? (
                      <div>
                        Size:{' '}
                        <span className="font-medium">
                          {product?.selected_size}
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                    {product?.selected_color ? (
                      <div>
                        Color:{' '}
                        <span className="font-medium">
                          {product?.selected_color}
                        </span>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <div className="flex items-center gap-2">
                    <div
                      className={clsx('flex flex-col items-end tracking-tight')}
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
