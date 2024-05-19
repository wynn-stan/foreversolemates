'use client';

import { useWidth } from '@foreversolemates/utils';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Accordion } from '@fsm/ui';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import clsx from 'clsx';

import { useLayout, useStore } from '../../../../hooks';
import { fadeInFromBelowVariants } from '../../../../utils';
import { Cart } from '../../../../components/';
import routes from '../../../../routes';
import Form from './(components)/Form';
import { getFormattedCartData } from '../../../../utils';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();
  const { store, setStore } = useStore();
  const router = useRouter();
  const { lg } = useWidth();

  //ref
  const checkoutRef = useRef<HTMLAnchorElement>(null);

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
    items: store?.cart || [],
    onCancel: () => ({}),
    onCheckout: () => ({}),
    showActions: false,
    showList: true,
  };

  // variables - payload
  const checkoutPayload = getFormattedCartData({
    cartItems: store?.cart || [],
  });

  return (
    <>
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
          onSubmit={(params, { setSubmitting }) => {
            axios
              .post<never, any>(`/api/generate-checkout-link`, {
                amount: checkoutPayload.totalAmount,
                email: params.receipient_email,
                callback_url:
                  process?.env?.['NEXT_PUBLIC_PURCHASE_CALLBACK_URL'],
                metadata: checkoutPayload,
              })
              .then(({ data: { url, reference } }) => {
                if (checkoutRef?.current) {
                  checkoutRef.current.href = url;
                  checkoutRef.current.click();
                  setSubmitting(false);
                }
              })
              .catch(() => {
                toast.error('Something unexpected happened. Please try again');
                setSubmitting(false);
              });
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

      <Link
        ref={checkoutRef}
        className="hidden"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        {' '}
        Google{' '}
      </Link>
    </>
  );
}
