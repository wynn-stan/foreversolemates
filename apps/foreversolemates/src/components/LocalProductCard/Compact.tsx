import { Button, ProductCard } from '@fsm/ui';
import { ProductModel } from '../../models';
import clsx from 'clsx';

import { useRouter } from 'next/navigation';
import routes from '../../routes';

interface Props {
  details: ProductModel;
}

export default function Compact({ details }: Props) {
  //navigation
  const router = useRouter();

  //function - navigateToProduct
  const navigateToProduct = () =>
    router.push(routes.shop.product.index.replace('[id]', details._id));

  return (
    <ProductCard.Compact
      onClick={navigateToProduct}
      details={{
        discount: details.discount,
        initial_price: details.initial_price,
        product_image: details.images?.[0],
        product_name: details.product_name,
        createdOn: details.createdOn,
        available_units: details.total_available_units,
      }}
      actions={
        <>
          {/* <Button
            icon="cart"
            onClick={navigateToProduct}
            className={clsx(
              'flex gap-2',
              'py-2 px-4 text-sm',
              'lg:text-base',
              'hover:bg-[#262626] hover:text-white',
              'rounded-md'
            )}
            variant="outline-secondary"
          >
            <span>Add to cart</span>
          </Button> */}
        </>
      }
    />
  );
}
