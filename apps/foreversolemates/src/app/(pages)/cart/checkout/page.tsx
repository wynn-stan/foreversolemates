'use client';

import { useEffect, useRef, useState } from 'react';
import { useWidth } from '@foreversolemates/utils';
import { useRouter } from 'next/navigation';
import { Accordion, Order } from '@fsm/ui';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Link from 'next/link';
import axios from 'axios';
import clsx from 'clsx';

import {
  fadeInFromBelowVariants,
  generateID,
  getFormattedCartData,
} from '../../../../utils';
import { useLayout, useStore } from '../../../../hooks';
import { UserModel } from '../../../../models';
import { Cart } from '../../../../components/';
import routes from '../../../../routes';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();
  const { store, setStore } = useStore();
  const router = useRouter();
  const { lg } = useWidth();

  //state
  const [shippingCost, setShippingCost] = useState(0);
  const [useUserDetails, setUseUserDetails] = useState(false);

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

  // variables - payload
  const checkoutPayload = getFormattedCartData({
    cartItems: store?.cart || [],
    shipping_cost: shippingCost,
  });

  /**
   * Variables - cart props
   */
  const cartSummaryProps = {
    subtotal: checkoutPayload.subtotal,
    tax_amount: checkoutPayload.tax_amount,
    total: checkoutPayload.total,
    shipping_cost: shippingCost,
    items: store?.cart || [],
    onCancel: () => ({}),
    onCheckout: () => ({}),
    showActions: false,
    showList: true,
  };

  /**
   * User
   */
  const user = store?.user;
  const delivery_details = store?.user?.delivery_details;

  return (
    <>
      <motion.div
        variants={fadeInFromBelowVariants}
        initial="hidden"
        animate="visible"
        className={clsx(
          'py-12 px-4 flex gap-6 justify-center',
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

        <Order.DeliveryForm
          //on login
          {...(store?.user?.email
            ? {}
            : {
                onLogin: () => {
                  router.push(routes.login);
                },
              })}
          //on zone selection
          onZoneSelect={(cost) => {
            setShippingCost(cost);
          }}
          // using user details
          onUseDetails={
            user?.email ? () => setUseUserDetails(!useUserDetails) : undefined
          }
          isUsingUserDetails={useUserDetails}
          //default values
          defaultValues={
            useUserDetails
              ? {
                  country: delivery_details?.country,
                  recipient_address: delivery_details?.recipient_address,
                  recipient_city: delivery_details?.recipient_city,
                  recipient_email: user?.email,
                  recipient_first_name: user?.firstName,
                  recipient_last_name: user?.firstName,
                  recipient_phone: user?.mobileNo,
                  recipient_postal_code: '',
                }
              : {}
          }
          // on submit
          onSubmit={(params, { setSubmitting }) => {
            const order_reference = generateID();

            axios
              .post<never, any>(`/api/generate-checkout-link`, {
                amount: checkoutPayload.total,
                email: store?.user?.email || params.recipient_email,
                callback_url:
                  process?.env?.['NEXT_PUBLIC_PURCHASE_CALLBACK_URL'],
                metadata: {
                  ...checkoutPayload,
                  delivery_details: params,
                  email: store?.user?.email || params.recipient_email,
                  order_reference,
                },
              })
              .then(({ data: { url, reference } }) => {
                setStore((store) => ({
                  ...store,
                  user: {
                    ...store?.user,
                    order_reference,
                  },
                }));
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
            <div className="max-w-[350px] w-full mx-auto">
              <Order.OrderSummary {...cartSummaryProps} />
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
