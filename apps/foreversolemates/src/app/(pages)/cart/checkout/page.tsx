'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { useLayout, useStore } from '../../../../hooks';
import { fadeInFromBelowVariants } from '../../../../utils';
import { Cart } from '../../../../components/';
import routes from '../../../../routes';
import Form from './(components)/Form';
import axios from 'axios';
import { useWidth } from '@foreversolemates/utils';
import { Accordion } from '@fsm/ui';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();
  const { store, setStore } = useStore();
  const router = useRouter();
  const { lg } = useWidth();

  //effect
  useEffect(() => {
    const banner = {
      title: 'Checkout',
      top_tagline: '',
      imageSrc: '',
    };

    setLayout({
      banner,
    });

    // return setLayout({});
  }, []);

  //variables - items in cart
  const cartHasItems = store?.cart?.length;

  /**
   * Variables - cart props
   */
  const cartSummaryProps = {
    items: store?.cart?.map((item) => ({ final_price: 12 })) || [
      { final_price: 0 },
    ],
    taxPercent: 0,
    onCancel: () => {
      router.push(routes.shop.all.index);
    },
    onCheckout: () => {
      router.push(routes.cart.checkout.index);
    },
    showActions: false,
  };

  return (
    <motion.div
      variants={fadeInFromBelowVariants}
      initial="hidden"
      animate="visible"
      className={clsx(
        'py-12 px-6 flex gap-6 justify-center',
        'flex-col lg:flex-row'
      )}
    >
      {/* Showing the order summary on Mobile */}
      {cartHasItems && !lg ? (
        <Accordion header="Order Summary">
          <div className="px-2 py-4">
            <Cart.Summary {...cartSummaryProps} />
          </div>
        </Accordion>
      ) : (
        <></>
      )}

      <Form
        onSubmit={(params, actions) => {
          console.log(params);
          // axios.post<never, any>(`/api/generate-checkout-link`, {
          //   amount: 0,
          //   email: '',
          //   callback_url: process?.env?.['NEXT_PUBLIC_PURCHASE_CALLBACK_URL'],
          //   metadata: {},
          // });
        }}
      />

      {/* Showing the order summary on large screens */}
      {cartHasItems && lg ? (
        <>
          <div className="flex flex-col">
            <div className="w-[2px] min-h-[5px] bg-gray-5 h-full flex-grow" />
          </div>
          <div className="max-w-[350px] w-full">
            <Cart.Summary {...cartSummaryProps} />
          </div>
        </>
      ) : (
        <></>
      )}
    </motion.div>
  );
}
