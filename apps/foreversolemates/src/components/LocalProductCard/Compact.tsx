import { Button, ProductCard } from '@fsm/ui';
import { ProductModel } from '../../models';
import clsx from 'clsx';

interface Props {
  details: ProductModel;
}

export default function Compact({ details }: Props) {
  return (
    <ProductCard.Compact
      details={{
        discount: details.discount,
        initial_price: details.initial_price,
        product_image: details.images?.[0],
        product_name: details.product_name,
      }}
      actions={
        <>
          <Button
            icon="cart"
            onClick={() => {}}
            className={clsx(
              'flex gap-2',
              'py-2 px-2 text-sm',
              'lg:py-3 lg:px-2 lg:text-base',
              'hover:bg-[#262626] hover:text-white'
            )}
            variant="outline-black"
          >
            <span>Add to cart</span>
          </Button>
        </>
      }
    />
  );
}
