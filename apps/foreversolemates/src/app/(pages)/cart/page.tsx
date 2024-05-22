'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Order } from '@fsm/ui';
import clsx from 'clsx';

import { fadeInFromBelowVariants, getFormattedCartData } from '../../../utils';
import { useLayout, useStore } from '../../../hooks';
import { Cart } from '../../../components/';
import { CartItem } from '../../../models';
import routes from '../../../routes';
import LocalModal from './(components)/Modal';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();
  const { store, setStore } = useStore();
  const router = useRouter();
  const transactionReference = useSearchParams().get('trxref');

  //state
  const [showModal, setShowModal] = useState(
    transactionReference ? true : false
  );

  //effect
  useEffect(() => {
    const banner = {
      title: 'My Cart',
      top_tagline: '',
      imageSrc: '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  const cartSummary = getFormattedCartData({ cartItems: store?.cart || [] });

  return (
    <>
      <motion.div
        variants={fadeInFromBelowVariants}
        initial="hidden"
        animate="visible"
        className={clsx(
          'py-12 px-6 flex gap-6 justify-center',
          'flex-col-reverse md:flex-row'
        )}
      >
        <Order.Details
          onDelete={(deleted_index) => {
            setStore((store) => {
              const filteredCart =
                store.cart?.filter(
                  (cartItem, index) => index !== deleted_index
                ) || [];
              return {
                ...store,
                cart: filteredCart,
              };
            });
            toast.success('Product removed from cart');
          }}
          cartItems={store?.cart || []}
        />

        {store?.cart?.length ? (
          <>
            <div className="flex flex-col">
              <div className="w-[2px] min-h-[5px] bg-gray-5 h-full flex-grow" />
            </div>
            <div className="max-w-[350px] w-full">
              <Order.OrderSummary
                subtotal={cartSummary?.subtotal}
                tax_amount={cartSummary?.tax_amount}
                total={cartSummary?.total}
                items={(store?.cart as CartItem[]) || []}
                onCancel={() => {
                  router.push(routes.shop.all.index);
                }}
                onCheckout={() => {
                  router.push(routes.cart.checkout.index);
                }}
              />
            </div>
          </>
        ) : (
          <></>
        )}
      </motion.div>

      {transactionReference && (
        <LocalModal
          show={showModal}
          onHide={() => setShowModal(false)}
          reference={transactionReference}
        />
      )}
    </>
  );
}
