import { HTMLAttributes } from 'react';
import { currencyFormatter } from '../../Utils';
import clsx from 'clsx';

interface Props extends HTMLAttributes<HTMLDivElement> {
  initial_price: number;
  discount?: number;
}

export default function Price({ initial_price, discount, className }: Props) {
  //variables
  const discounted_price = discount
    ? initial_price - initial_price * (discount / 100)
    : discount;

  return (
    <div
      className={clsx('flex gap-3 items-baseline tracking-tight', className)}
    >
      <div className="text-lg font-medium ">
        {currencyFormatter(initial_price)}
      </div>
      {discounted_price ? (
        <div className="text-sm text-gray-30 line-through">
          {currencyFormatter(discounted_price)}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
