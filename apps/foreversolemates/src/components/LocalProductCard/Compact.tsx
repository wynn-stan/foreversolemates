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

  return (
    <ProductCard.Compact
      onClick={() =>
        router.push(routes.shop.product.index.replace('[id]', details._id))
      }
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
              'py-2 px-4 text-sm',
              'lg:text-base',
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
