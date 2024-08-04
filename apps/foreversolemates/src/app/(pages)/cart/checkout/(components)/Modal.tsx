'use client';

import { Button, Cart, Modal } from '@fsm/ui';
import { CheckoutError, ModalProps } from '../../../../../models';
import clsx from 'clsx';
import { useWidth } from '@foreversolemates/utils';
import { useStore } from '../../../../../hooks';

interface Props extends ModalProps {
  errors: CheckoutError[];
}

export default function LocalModal({ onHide, show, mutate, errors }: Props) {
  const { sm } = useWidth();
  const { store, setStore, actions } = useStore();

  return (
    <Modal
      size={!sm ? 'full' : undefined}
      className={clsx('max-w-[590px]')}
      header="Unavailable Items in Cart"
      {...{ show, onHide }}
    >
      <div className="space-y-5">
        {errors?.map((error, index) => {
          const { cartItem } = actions.getCartItem({
            id: error.product_id,
            size: error.selected_size,
          });
          console.log(error);
          if (!cartItem) return <></>;
          return (
            <>
              <Cart.Item
                message={error.message}
                quantity={error?.selected_quantity}
                maxQuantity={error?.db_available_quantity}
                type={error.type}
                productDetails={{
                  final_price: cartItem.final_price || 0,
                  imgSrc: cartItem?.images?.[0] || '',
                  product_name: cartItem?.product_name || '',
                  size: error.selected_size,
                  description: cartItem?.description || '',
                }}
                onDelete={() =>
                  actions.removeCartItem({
                    id: error.product_id,
                    size: error.selected_size,
                  })
                }
                onQuantityUpdate={(quantity) => {
                  actions.updateCartItemQuantity({
                    id: error.product_id,
                    size: error.selected_size,
                    quantity: quantity,
                  });
                }}
              />

              <div className="w-full h-[1px] bg-gray-10" />
            </>
          );
        })}
        {/* <Cart.Item
          message="Maximum quantity available is 5. Please adjust your selection"
          quantity={8}
          // size="lg"
          type="quantity"
          productDetails={{
            final_price: 12.99,
            imgSrc: '',
            product_name: 'Relaxed Fit T-shirt',
            size: '42',
            description:
              'A big thank you goes out to all those who were present at our stand, to make purchases and enquire about our services. Thank you for making the Easter fair a success. We were proud to repress our wonderful brand and serve you with open arms.',
          }}
        />

        <div className="w-full h-[1px] bg-gray-10" />

        <Cart.Item
          message="Selected product/size is sold out. Please remove from cart to continue."
          // size="lg"
          type="delete"
          productDetails={{
            final_price: 12.99,
            imgSrc: '',
            product_name: 'Relaxed Fit T-shirt',
            size: '42',
            description:
              'A big thank you goes out to all those who were present at our stand, to make purchases and enquire about our services. Thank you for making the Easter fair a success. We were proud to repress our wonderful brand and serve you with open arms.',
          }}
        />

        <div className="w-full h-[1px] bg-gray-10" />

        <Cart.Item
          quantity={4}
          // size="lg"
          type="delete"
          productDetails={{
            final_price: 12.99,
            imgSrc: '',
            product_name: 'Relaxed Fit T-shirt',
            size: '42',
            description:
              'A big thank you goes out to all those who were present at our stand, to make purchases and enquire about our services. Thank you for making the Easter fair a success. We were proud to repress our wonderful brand and serve you with open arms.',
          }}
        /> */}

        <div onClick={onHide} className="flex justify-end pt-5">
          <Button>Close</Button>
        </div>
      </div>
    </Modal>
  );
}
