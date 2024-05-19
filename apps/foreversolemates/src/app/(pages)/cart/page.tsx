'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import clsx from 'clsx';

import { fadeInFromBelowVariants } from '../../../utils';
import { useLayout, useStore } from '../../../hooks';
import { Cart } from '../../../components/';
import { CartItem } from '../../../models';
import routes from '../../../routes';
import { toast } from 'react-toastify';

export default function Page() {
  //hooks
  const { layout, setLayout } = useLayout();
  const { store, setStore } = useStore();
  const router = useRouter();

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

  return (
    <motion.div
      variants={fadeInFromBelowVariants}
      initial="hidden"
      animate="visible"
      className={clsx(
        'py-12 px-6 flex gap-6 justify-center',
        'flex-col-reverse md:flex-row'
      )}
    >
      <Cart.Details
        onDelete={(index) => {
          setStore((store) => {
            const filteredCart =
              store.cart?.filter((cartItem) => cartItem?._id !== index) || [];
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
            <Cart.Summary
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
  );
}
