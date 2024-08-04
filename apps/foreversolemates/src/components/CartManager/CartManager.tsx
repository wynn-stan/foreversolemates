'use client';

import React, { useState } from 'react';
import { useStore } from '../../hooks';
import { ProductModel } from '../../models';
import { useRouter } from 'next/navigation';
import routes from '../../routes';
import { toast } from 'react-toastify';
import { Button, Modal } from '@fsm/ui';

interface ProductSpecs {
  selected_size?: number;
  selected_quantity?: number;
  selected_color?: string;
  setSubmitting: (state: boolean) => void;
}

interface Props {
  children: ({
    addToCart,
  }: {
    addToCart: (params: ProductSpecs) => void;
  }) => React.ReactNode;
  details: ProductModel;
}

export default function CartManager({ details, children }: Props) {
  /**
   * Hooks
   */
  const { store, setStore } = useStore();
  const router = useRouter();

  /**
   * State
   */
  const [showModal, setShowModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    available_units: 0,
    selected_size: 0,
    new_total: 0,
    items_in_cart: 0,
  });

  /**
   * Function - move to new route
   */
  const moveToCheckout = () => {
    setTimeout(() => {
      router.push(routes.cart.index);
    }, 1500);
    toast.success('Product added to cart');
  };

  /**
   * Variables
   */
  const productHasSizes = Boolean(details.available_sizes_and_units.length);
  const onHide = () => setShowModal(false);

  /**
   * Function - process cart
   */
  const addToCart = ({
    selected_size,
    selected_color,
    selected_quantity = 0,
    setSubmitting,
  }: ProductSpecs) => {
    /**
     * Function - Add "fresh" item to cart (whether cart is empty or not)
     */
    const createNewCartItem = () => {
      setStore((store) => {
        return {
          ...store,
          cart: [
            {
              ...details,
              selected_size: selected_size || undefined,
              selected_quantity: selected_quantity,
              selected_color: selected_color,
            },
            ...(store?.cart || []),
          ],
        };
      });
    };

    // If no item in cart
    if (!store?.cart) {
      createNewCartItem();
      moveToCheckout();
      return;
    }

    //  find out if the cart item is already in cart
    const cartItemIndex = store?.cart?.findIndex((item, index) => {
      const condition1 = item._id === details._id;
      const condition2 = productHasSizes
        ? item.selected_size === selected_size
        : true; // if product doesn't have sizes, the condition is irrelavent so just return true.

      if (condition1 && condition2) {
        return true;
      }

      return false;
    });

    if (cartItemIndex !== -1) {
      //item is in cart
      const cartItem = store.cart[cartItemIndex as number];
      const new_total = (cartItem?.selected_quantity || 0) + selected_quantity;
      const cartItemSizeAndUnits = cartItem.available_sizes_and_units?.find(
        (item) => {
          return item.size === selected_size;
        }
      );
      const available_units = productHasSizes
        ? cartItemSizeAndUnits?.available_units || 0
        : cartItem?.total_available_units || 0;

      if (new_total > available_units) {
        setShowModal(true);
        setErrorDetails({
          available_units,
          selected_size: selected_size || 0,
          new_total,
          items_in_cart: cartItem?.selected_quantity || 0,
        });
        setSubmitting(false);
      } else {
        store.cart[cartItemIndex as number].selected_quantity = new_total;
        moveToCheckout();
      }
    } else {
      // item is not in cart;
      createNewCartItem();
      moveToCheckout();
    }
  };

  return (
    <div>
      {children({ addToCart })}
      {showModal && (
        <Modal
          header="Maximum Quantity Exceeded"
          show={showModal}
          onHide={onHide}
          size="sm"
        >
          <div className="space-y-12">
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="font-medium">Product Name:</div>
                <div>{`${details.product_name} ${
                  productHasSizes ? `(Size ${errorDetails.selected_size})` : ' '
                }`}</div>
              </div>

              <div className="flex gap-3">
                <div className="font-medium">Available stock:</div>
                <div>{errorDetails.available_units}</div>
              </div>

              <div className="flex gap-3">
                <div className="font-medium">Total items in your cart:</div>
                <div>{errorDetails.items_in_cart}</div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline-black" onClick={onHide}>
                Close
              </Button>
              {/* <Button onClick={() => router.push(routes.cart.index)}>
                View Cart
              </Button> */}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
