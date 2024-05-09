'use client';

import clsx from 'clsx';
import Images from './Details/Images';
import Price from './Details/Price';
import StockIndicator from './Details/StockIndicator';
import Description from './Details/Description';
import SizeOptions from './Details/SizeOptions';
import ColorOptions from './Details/ColorOptions';
import AddToCart from './Details/AddToCart';
import { useState } from 'react';

interface ProductModel {
  _id: string;
  available_sizes: number[];
  images: string[];
  available_colors: string[];
  product_name: string;
  initial_price: number;
  discount: number;
  available_units: number;
  alert: number;
  description: string;
  status: string;
  collection_id: string;
  createdOn: string;
}

interface Props {
  details: ProductModel;
  onAdd?: (quantity: number) => void;
}

interface ProductSpecs {
  color: string[];
  size: number[];
  quantity: number;
}

function Details({ details, onAdd = () => {} }: Props) {
  //state
  const [productSpecs, setProductSpecs] = useState<Partial<ProductSpecs>>({});

  return (
    <div className={clsx('flex flex-col md:flex-row gap-4')}>
      <div className="">
        <Images urls={details.images} />
      </div>
      <div className="space-y-3 flex-grow md:max-w-[375px] ">
        <div className="">
          <div className="text-3xl tracking-tight font-medium">
            {details.product_name}
          </div>
          <Price
            initial_price={details.initial_price}
            discount={details.discount}
          />
        </div>
        <StockIndicator
          available_units={details.available_units}
          low_stock_indicator={details.alert}
        />
        <Description description={details.description} />
        <div className="flex gap-6 flex-wrap">
          <div className="flex-grow">
            <SizeOptions
              checkedSize={checkedSize}
              onClick={onSizeClick}
              sizes={details.available_sizes}
            />
          </div>
          <div className="flex-grow">
            <ColorOptions
              colors={details.available_colors}
              checkedColor={checkedColor}
              onClick={onColorClick}
            />
          </div>
        </div>
        <div className="h-full">
          <AddToCart onAdd={onAdd} />
        </div>
      </div>
    </div>
  );
}

export default Object.assign(Details, {
  Price,
  SizeOptions,
  StockIndicator,
  AddToCart,
  ColorOptions,
  Description,
  Images,
});
